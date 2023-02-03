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
      <div className="flex justify-between items-center bg-purple-400 border-y border-black py-10 lg:py-0">
        <div className="">
          <h1 className="text-7xl font-serif p-5 sm:p-10">
            <span className="underline">Inspiring</span> you to Greatness
          </h1>
          <h2 className="text-2xl p-5 sm:p-10">
            Transformed Africa through creative and responsive leaders.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-full"
          src="/pexels-tima-miroshnichenko-6549853-removebg-preview.png"
          alt=""
        />
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
