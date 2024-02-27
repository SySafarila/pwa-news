import { userState } from "@/utilities/recoil";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import celcius from "../../public/images/celsius.png";
import distance from "../../public/images/distance.png";
import mass from "../../public/images/mass.png";
import time from "../../public/images/time.png";

export default function Home() {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="p-4 min-h-screen max-w-screen-sm mx-auto">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-center">Menu Konversi</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-[40px]">
            <Link href="/suhu">
              <Image
                src={celcius}
                alt="Celcius image"
                className="w-32 mx-auto mb-1 object-contain"
                priority={true}
              />
              <span className="block text-center">Suhu</span>
            </Link>
            <Link href="/jarak">
              <Image
                src={distance}
                alt="Distance image"
                className="w-32 mx-auto mb-1 object-contain"
                priority={true}
              />
              <span className="block text-center">Jarak</span>
            </Link>
            <Link href="/massa">
              <Image
                src={mass}
                alt="Mass image"
                className="w-32 mx-auto mb-1 object-contain"
                priority={true}
              />
              <span className="block text-center">Massa</span>
            </Link>
            <Link href="/waktu">
              <Image
                src={time}
                alt="Time image"
                className="w-32 mx-auto mb-1 object-contain"
                priority={true}
              />
              <span className="block text-center">Waktu</span>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
