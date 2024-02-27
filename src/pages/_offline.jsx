import useOnline from "@/hooks/useOnline";
import { userState } from "@/utilities/recoil";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Offline = () => {
  const isOnline = useOnline();
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (isOnline == true) {
      setTimeout(() => {
        if (user) {
          router.push("/");
        } else {
          router.push("/login");
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return (
    <div className="p-4 min-h-screen w-full max-w-screen-sm mx-auto items-center justify-center flex">
      {isOnline == true ? (
        <div className="flex flex-col items-center">
          <p className="text-center block">
            Your connection is back, redirecting to homepage in{" "}
            <RedirectCountDown seconds="3" /> seconds
          </p>
          <p>
            <Link href="/" className="underline">
              Click Here
            </Link>
            <span> If you are not redirected</span>
          </p>
        </div>
      ) : (
        <p>You are in offline mode</p>
      )}
    </div>
  );
};
export default Offline;

const RedirectCountDown = ({ seconds }) => {
  const [s, setS] = useState(seconds);
  useEffect(() => {
    let interval;
    if (s > 0) {
      interval = setInterval(() => {
        setS((current) => current - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  });
  return s;
};
