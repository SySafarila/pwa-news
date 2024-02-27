import useOnline from "@/hooks/useOnline";
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  const [checkConnection, setCheckConnection] = useState(false);
  const router = useRouter();
  const isOnline = useOnline();

  const pingConnection = async () => {
    setCheckConnection(true);
    try {
      await axios.get("/api/ping");
      if (router.route == "/_offline") {
        router.push("/");
      }
    } catch (error) {
      if (router.route != "/_offline") {
        router.push("/_offline");
      }
    }
  };

  useEffect(() => {
    if (!checkConnection) {
      pingConnection();
    }
    if (isOnline == false && router.route != "/_offline") {
      router.push("/_offline");
    }
    if (isOnline == true) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
