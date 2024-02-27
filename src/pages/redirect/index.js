import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setTimeout(() => {
        router.push(router.query.to);
      }, 3000);
    }
  }, [router]);

  return (
    <div className="p-4 min-h-screen w-full max-w-screen-sm mx-auto items-center justify-center flex">
      <div className="flex flex-col items-center">
        <p className="text-center block">
          redirecting to {router.query.to ?? "..."}
        </p>
      </div>
    </div>
  );
};

export default Redirect;
