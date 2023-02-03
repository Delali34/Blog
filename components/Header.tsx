import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-14 object-contain cursor-pointer"
            src="/image 1.png"
            alt=""
          />
        </Link>
        {/* <div className="hidden md:inline-flex space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="bg-purple-400 py-1 rounded-full px-4 text-white">
            Follow
          </h3>
        </div> */}
      </div>
      <div className="flex items-center space-x-5 ">
        <Link href="https://www.youtube.com/@leadafriquetv7715" target="_blank">
          <h3 className="border px-4 py-1 rounded-full border-red-600 text-red-600 font-font hover:bg-red-500 hover:text-black">
            YouTube
          </h3>
        </Link>
        <Link href="https://twitter.com/LeadAfrique" target="_blank">
          <h3 className="border px-4 py-1 rounded-full border-blue-500 text-blue-500 font-font hover:bg-blue-500 hover:text-black">
            Twitter
          </h3>
        </Link>
      </div>
    </header>
  );
}

export default Header;
