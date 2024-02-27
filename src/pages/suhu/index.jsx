import { userState } from "@/utilities/recoil";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const Suhu = () => {
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
      case "celsius-reamur":
        setResult(input * (4 / 5));
        break;

      case "celsius-fahrenheit":
        setResult(input * (9 / 5) + 32);
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
          <h1 className="text-3xl font-bold text-center">Konversi Suhu</h1>
          <form className="flex flex-col gap-2 w-full mt-[40px]">
            <div className="flex flex-col relative gap-1">
              <label htmlFor="option">Pilih Suhu</label>
              <select
                id="option"
                className="border p-2 rounded"
                defaultValue={"celsius-reamur"}
                onChange={handleChange}
                ref={option}
              >
                <option value="celsius-reamur">Celsius Ke Reamur</option>
                <option value="celsius-fahrenheit">
                  Celsius Ke Fahrenheit
                </option>
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

export default Suhu;
