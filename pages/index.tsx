import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";

interface Props {
  posts: [Post];
}
export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto ">
      <Head>
        <title>LeadAfrique Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative">
        <img
          className="md:h-[600px] w-full object-cover "
          src="/pexels-helena-lopes-711009-min.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <h1 className="absolute top-[40%] left-[5%] text-white font-font md:text-7xl font-bold text-4xl">
          Inspiring you to <br />{" "}
          <span className="text-purple-500">Greatness</span>
        </h1>
        <h3 className="absolute top-[75%] left-[5%] text-white font-font md:text-2xl text-sm">
          Transformed Africa through creative and responsive leaders.
        </h3>
      </div>
      {/* posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />

              <div className=" flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-semibold font-font">
                    {post.title}
                  </p>
                  <p className="text-sm font-font">
                    {post.description} by{" "}
                    <span className="text-purple-500 font-font">
                      {post.author.name}
                    </span>
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
