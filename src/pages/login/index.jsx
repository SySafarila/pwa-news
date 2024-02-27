import { userState } from "@/utilities/recoil";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import visibilityOff from "../../../public/icons/visibility-off.svg";
import visibilityOn from "../../../public/icons/visibility-on.svg";
import appLogo from "../../../public/vercel-logo.png";
import sp1 from "../../../public/images/spongebob-1.png";
import sp2 from "../../../public/images/spongebob-2.png";

export default function Login() {
  const [user, setUser] = useRecoilState(userState);
  const [isSend, setIsSend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Info",
        text: "Kamu telah berhasil login sebelumnya!",
        icon: "info",
        confirmButtonColor: "rgb(31 41 55 / 1)",
      }).then(() => {
        router.push("/");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendForm = async (data) => {
    if (isSend == true) {
      return;
    }
    setIsSend(true);
    const { username, password } = data;
    try {
      await axios.post("/api/login", {
        username: username,
        password: password,
      });
      setUser({ username, password });
      router.replace("/");
    } catch (error) {
      setIsSend(false);
      Swal.fire({
        title: "Gagal",
        text: "Pastikan username dan password benar!",
        icon: "error",
        confirmButtonColor: "rgb(31 41 55 / 1)",
      });
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-4 max-w-screen-sm mx-auto">
      <div className="relative w-56 overflow-hidden">
        <Image
          src={sp1}
          alt="sp1"
          className={`absolute ${
            showPassword ? "" : "translate-y-[3rem]"
          } z-10 transition-transform transform`}
          priority={true}
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transform bg-[#18191E] size-[7rem]"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-8 bottom-0 z-20 bg-white"></div>
        <Image src={sp2} alt="sp2" className="z-20 relative" priority={true} />
      </div>
      <div>
        <h1 className="uppercase w-full text-center font-bold text-3xl">
          React PWA
        </h1>
        <p className="w-full text-center">
          Masuk sistem atau{" "}
          <Link href="/register" className="font-bold hover:underline">
            Buat Akun
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(sendForm)}
        className="flex flex-col gap-2 w-full"
      >
        <div className="flex flex-col relative gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder=""
            className="border p-2 rounded"
            id="username"
            required
          />
        </div>
        <div className="flex flex-col relative gap-1">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder=""
            className="border p-2 rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-2 h-[42px] bottom-0 flex items-center"
          >
            {showPassword ? (
              <Image src={visibilityOff} alt="password off" />
            ) : (
              <Image src={visibilityOn} alt="password on" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="border p-2 bg-gray-800 hover:bg-gray-950 text-white rounded transition-colors mt-2"
        >
          {isSend ? "Loading..." : "Masuk"}
        </button>
        <div className="flex justify-center">
          <Link href="/forgot-password" className="hover:underline">
            Lupa Password
          </Link>
        </div>
      </form>
    </div>
  );
}
