import { userState } from "@/utilities/recoil";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const Mass = () => {
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
      case "gram-kilogram":
        setResult(input / 1000);
        break;

      case "kilogram-gram":
        setResult(input * 1000);
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
          <h1 className="text-3xl font-bold text-center">Konversi Massa</h1>
          <form className="flex flex-col gap-2 w-full mt-[40px]">
            <div className="flex flex-col relative gap-1">
              <label htmlFor="option">Pilih Massa</label>
              <select
                id="option"
                className="border p-2 rounded"
                defaultValue={"gram-kilogram"}
                onChange={handleChange}
                ref={option}
              >
                <option value="gram-kilogram">Gram Ke Kilogram</option>
                <option value="kilogram-gram">Kilogram Ke Gram</option>
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

export default Mass;
