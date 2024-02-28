/* eslint-disable @next/next/no-img-element */
import axios from "axios";

const NewsDetail = ({ post }) => {
  return (
    <div className="p-4 min-h-screen max-w-screen-sm mx-auto flex flex-col gap-5">
      <h1 className="font-bold text-[16px]">{post.title}</h1>
      <img
        src={`https://picsum.photos/200?random=${post.id + 2}`}
        alt="News image"
        className="w-full rounded max-h-60 object-cover"
      />
      <div className="border rounded p-4">{post.body}</div>
    </div>
  );
};

export default NewsDetail;

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;
    const paths = posts.map((news) => ({
      params: { id: news.id.toString() },
    }));
    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const post = res.data;

    return {
      props: {
        post,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 5,
      notFound: true,
    };
  }
}
