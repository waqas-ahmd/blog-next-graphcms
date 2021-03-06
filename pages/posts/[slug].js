import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3tq88yfbzkz01z1g5ewe030/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      slug
      title
      content {
        html
      }
      datePublished
      coverPhoto {
        url
      }
      author {
        id
        name
        avatar {
          url
        }
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { post } = await graphcms.request(QUERY, { slug });
  return {
    props: { post },
    revalidate: 10,
  };
}

export default function Home({ post }) {
  return (
    <div>
      <Head>
        <title>Blog App with GraphCMS Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>{post.title}</h3>
      </main>
    </div>
  );
}
