/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect } from "react";

const NewsDetail = ({ post }) => {
  const sharedDataSample = {
    title: "Some text title",
    text: "More text",
    url: "A url we want to share",
  };

  const canBrowserShareData = (data) => {
    if (!navigator.share || !navigator.canShare) {
      return false;
    }
    return navigator.canShare(data);
  };

  const shareData = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.body,
        url: window.location.href,
      });
      console.log("share success");
    } catch (error) {
      // console.error(error);
      alert("Gabisa di share bang");
    }
  };

  useEffect(() => {
    if (canBrowserShareData(sharedDataSample)) {
      // renderAppSharingUI();
      console.log("can share action");
    } else {
      console.log("cannot share action");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 min-h-screen max-w-screen-sm mx-auto flex flex-col gap-5">
      <h1 className="font-bold text-xl capitalize">{post.title}</h1>
      <img
        src={`https://picsum.photos/200?random=${post.id + 2}`}
        alt="News image"
        className="w-full rounded max-h-60 object-cover"
      />
      <div className="border rounded p-4">{post.body}</div>
      <div className="flex justify-end">
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={shareData}>
          SHARE
        </button>
      </div>
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
