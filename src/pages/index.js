/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";

const Headline = (post) => {
  return (
    <Link
      href={`/news/${post.post.id}`}
      className="bg-[#D9D9D9] rounded overflow-hidden"
    >
      <img
        src="https://picsum.photos/500?random=0"
        alt="headline image"
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold line-clamp-2">{post.post.title ?? "-"}</h2>
      </div>
    </Link>
  );
};

export default function Home({ posts }) {
  return (
    <div className="p-4 min-h-screen max-w-screen-sm mx-auto flex flex-col gap-5">
      <div>
        <h1 className="font-bold text-4xl">News App</h1>
        <p>Kumpulan berita harian di Indonesia</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post, key) =>
          key > 0 ? (
            <Link
              href={`/news/${post.id}`}
              className="flex gap-3 border rounded p-4"
              key={post.id}
            >
              <img
                src={`https://picsum.photos/200?random=${key + 2}`}
                alt="thumbnail"
                className="w-20 h-20 object-cover flex-shrink-0"
              />
              <div>
                <h2 className="line-clamp-2">{post.title}</h2>
              </div>
            </Link>
          ) : (
            <Headline post={post} key={key} />
          )
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;

    return {
      props: {
        posts,
      },
      revalidate: 60,
    };
  } catch (error) {
    const posts = [];
    return {
      props: {
        posts,
      },
      revalidate: 60,
    };
  }
}
