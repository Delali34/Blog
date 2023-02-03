import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
import { url } from "inspector";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <main>
      <Header />

      <img
        className="w-full h-80 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3 font-font">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-purple-500">{post.author.name} </span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10 ">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}/
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-purple-500" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-purple-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h1 className="text-sm text-purple-500">Enjoyed this article?</h1>
          <h1 className="text-3xl font-bold">Leave a comment below!</h1>
          <hr className="py-3 mt-2 " />
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700 font-font ">Name</span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-purple-500 outline-none focus:ring"
              placeholder="Ernest Delali"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700 font-font ">Email</span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-purple-500 outline-none focus:ring"
              placeholder="ernestdelalianyomitse752@gmail.com"
              type="email"
            />
          </label>
          <label className="block mb-5 font-font">
            <span className="text-gray-700 font-font">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-purple-500 outline-none focus:ring font-font"
              placeholder="Ernest Delali"
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5 font-font">
            {errors.name && (
              <span className="text-red-500">
                {" "}
                - The name field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                {" "}
                - The comment field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                {" "}
                - The email field is required
              </span>
            )}
          </div>
          <input
            type="submit"
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer font-font"
          />
        </form>
      )}
      <div className="flex flex-col p-10 max-w-2xl mx-auto shadow-purple-500 shadow space-y-2 mb-5">
        <h3 className="text-4xl font-font">Comments</h3>
        <hr className="pb-2 font-font" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-purple-500 font-font">
                {comment.name}:{" "}
              </span>
              <span className="text-xl font-font">{comment.comment}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title, 
        author->{
            name,
            image
          },
          'comments': *[
            _type == "comment" && 
            post._ref == ^._id && 
            approved == true],
          description,
          mainImage,
          slug,
          body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      revalidate: 60,
    },
  };
};
