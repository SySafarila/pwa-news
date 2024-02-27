import { useEffect, useState } from "react";

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(undefined);
  useEffect(() => {
    // setIsOnline(true);
    window.addEventListener("online", () => {
      setIsOnline(true);
      // console.log("online hook: true");
    });
    window.addEventListener("offline", () => {
      setIsOnline(false);
      // console.log("online hook: false");
    });
    return () => {
      removeEventListener("online", null);
      removeEventListener("offline", null);
    };
  }, []);

  return isOnline;
};

export default useOnline;
