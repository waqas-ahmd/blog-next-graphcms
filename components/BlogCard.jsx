/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const BlogCard = ({ post }) => {
  return (
    <div>
      <Link href={`/posts/${post.slug}`}>
        <div>
          <img src={post.coverPhoto.url} alt={post.title} />
          <div>{post.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
