import { userState } from "@/utilities/recoil";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const Time = () => {
  const user = useRecoilValue(userState);
  const [result, setResult] = useState(0);
  const input = useRef(null);
  const option = useRef(null);
  const router = useRouter();

  const handleChange = () => {
    calculate(option.current.value, input.current.value);
  };

  const calculate = (opt, input) => {
    switch (opt) {
      case "detik-menit":
        setResult(input / 60);
        break;

      case "menit-detik":
        setResult(input * 60);
        break;

      default:
        setResult(0);
        break;
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      calculate(option.current.value, input.current.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="p-4 min-h-screen max-w-screen-sm mx-auto">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-center">Konversi Waktu</h1>
          <form className="flex flex-col gap-2 w-full mt-[40px]">
            <div className="flex flex-col relative gap-1">
              <label htmlFor="option">Pilih Waktu</label>
              <select
                id="option"
                className="border p-2 rounded"
                defaultValue={"detik-menit"}
                onChange={handleChange}
                ref={option}
              >
                <option value="detik-menit">Detik Ke Menit</option>
                <option value="menit-detik">Menit Ke Detik</option>
              </select>
            </div>
            <div className="flex flex-col relative gap-1">
              <label htmlFor="input">Input</label>
              <input
                type="number"
                placeholder=""
                className="border p-2 rounded"
                id="input"
                onChange={handleChange}
                ref={input}
                defaultValue={5}
                required
              />
            </div>
            <div className="flex flex-col relative gap-1">
              <label htmlFor="result">Hasil</label>
              <h1 className="text-3xl text-center font-bold">{result}</h1>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default Time;
