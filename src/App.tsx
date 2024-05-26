import { useEffect, useRef, useState } from "react";
import clipboardIcon from "./assets/fa-regular_copy.svg";
import arrowLeft from "./assets/arrow-left.svg";
import { calculatePasswordStrength, generatePassword } from "./utils";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const resultRef = useRef<HTMLSpanElement>(null);
  const characterLengthRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const uppercaseRef = useRef<HTMLInputElement>(null);
  const lowercaseRef = useRef<HTMLInputElement>(null);
  const numbersRef = useRef<HTMLInputElement>(null);
  const symbolsRef = useRef<HTMLInputElement>(null);
  const generateRef = useRef<HTMLButtonElement>(null);
  const clipboardRef = useRef<HTMLButtonElement>(null);
  const strengthRef = useRef<HTMLSpanElement>(null);
  const strengthBar1Ref = useRef<HTMLDivElement>(null);
  const strengthBar2Ref = useRef<HTMLDivElement>(null);
  const strengthBar3Ref = useRef<HTMLDivElement>(null);
  const strengthBar4Ref = useRef<HTMLDivElement>(null);

  const [uppercase, setUppercase] = useState("unchecked");
  const [lowercase, setLowercase] = useState("unchecked");
  const [numbers, setNumbers] = useState("unchecked");
  const [symbols, setSymbols] = useState("unchecked");

  useEffect(() => {
    sliderRef.current?.addEventListener("input", () => {
      if (!sliderRef.current || !characterLengthRef.current) return;

      characterLengthRef.current.textContent =
        sliderRef.current.value.toString();

      progressRef.current!.style.width = `${
        ((Number(sliderRef.current.value) - 8) * 100) / 12
      }%`;
    });

    generateRef.current?.addEventListener("click", () => {
      console.log(resultRef.current?.innerText);
      if (
        !sliderRef.current ||
        !lowercaseRef.current ||
        !uppercaseRef.current ||
        !numbersRef.current ||
        !symbolsRef.current
      )
        return;

      const length = sliderRef.current.value;
      const hasLower = lowercaseRef.current.checked || false;
      const hasUpper = uppercaseRef.current.checked;
      const hasNumber = numbersRef.current.checked;
      const hasSymbol = symbolsRef.current.checked;

      if (!resultRef.current) return;
      resultRef.current.innerText = generatePassword(
        hasLower ? 1 : 0,
        hasUpper ? 1 : 0,
        hasNumber ? 1 : 0,
        hasSymbol ? 1 : 0,
        Number(length) // Convert length to a number
      );

      const strength = calculatePasswordStrength(resultRef.current.innerText);

      switch (strength) {
        case "Too Weak":
          if (
            !strengthBar1Ref.current ||
            !strengthBar2Ref.current ||
            !strengthBar3Ref.current ||
            !strengthBar4Ref.current
          )
            return;
          strengthBar1Ref.current.style.background = "#f64a4a";

          strengthBar2Ref.current.style.background = "transparent";
          strengthBar3Ref.current.style.background = "transparent";
          strengthBar4Ref.current.style.background = "transparent";
          break;
        case "Weak":
          if (
            !strengthBar1Ref.current ||
            !strengthBar2Ref.current ||
            !strengthBar3Ref.current ||
            !strengthBar4Ref.current
          )
            return;
          strengthBar1Ref.current.style.background = "#f87c58";
          strengthBar2Ref.current.style.background = "#f87c58";

          strengthBar3Ref.current.style.background = "transparent";
          strengthBar4Ref.current.style.background = "transparent";
          break;
        case "Medium":
          if (
            !strengthBar1Ref.current ||
            !strengthBar2Ref.current ||
            !strengthBar3Ref.current ||
            !strengthBar4Ref.current
          )
            return;

          strengthBar1Ref.current.style.background = "#f8cd65";
          strengthBar2Ref.current.style.background = "#f8cd65";
          strengthBar3Ref.current.style.background = "#f8cd65";

          strengthBar4Ref.current.style.background = "transparent";
          break;
        case "Strong":
          if (
            !strengthBar1Ref.current ||
            !strengthBar2Ref.current ||
            !strengthBar3Ref.current ||
            !strengthBar4Ref.current
          )
            return;

          strengthBar1Ref.current.style.background = "#a4ffaf";
          strengthBar2Ref.current.style.background = "#a4ffaf";
          strengthBar3Ref.current.style.background = "#a4ffaf";
          strengthBar4Ref.current.style.background = "#a4ffaf";
          break;
      }

      if (!strengthRef.current) return;

      strengthRef.current.textContent = strength;
    });

    const handleClipboard = () => {
      if (!resultRef.current?.innerText) return;

      navigator.clipboard.writeText(resultRef.current.innerText).then(() => {
        toast.success("Password copied to clipboard!");
      });
    };

    clipboardRef.current?.addEventListener("click", handleClipboard);

    // Disable clipboard button when there is no password
    const observer = new MutationObserver(() => {
      if (!clipboardRef.current || !resultRef.current) return;
      clipboardRef.current.disabled = resultRef.current.innerText === "";
    });

    if (resultRef.current) {
      observer.observe(resultRef.current, { childList: true });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clipboardRef.current?.removeEventListener("click", handleClipboard);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid place-items-center h-screen bg-dark overflow-y-auto">
      <div className="max-md:w-full">
        <h3 className="text-lightgray text-[24px] font-bold text-center mb-6">
          Password Generator
        </h3>
        <div className="w-[540px] h-[80px] flex items-center justify-between bg-darkgray px-8 mb-6 max-md:w-[90%] max-md:mx-auto">
          <span
            ref={resultRef}
            className="text-[32px] font-bold text-almost-white max-md:text-sm"
          ></span>
          <button ref={clipboardRef} type="button" className="cursor-pointer">
            <img
              src={clipboardIcon}
              alt="Clipboard Icon"
              className="w-[21px] h-[24px]"
            />
          </button>
        </div>

        <div className="w-[540px] bg-darkgray p-8 max-md:w-[90%] max-md:mx-auto">
          <div className="flex items-center justify-between">
            <h5 className="text-[18px] text-almost-white font-bold">
              Character Length
            </h5>
            <span
              ref={characterLengthRef}
              className="text-green text-[32px] font-bold"
            >
              20
            </span>
          </div>

          <div className="relative w-full h-[8px] my-10">
            <input
              ref={sliderRef}
              type="range"
              min="8"
              max="20"
              className="absolute w-full h-full bg-dark outline-none border-none"
            />
            <div
              ref={progressRef}
              className="absolute left-0 top-0 w-full h-full bg-green"
            ></div>
          </div>

          <div className="flex flex-col gap-6">
            <label className="main flex items-center gap-6 relative cursor-pointer">
              <input
                ref={uppercaseRef}
                type="checkbox"
                className="checkbox"
                onClick={() => {
                  setUppercase(
                    uppercase === "checked" ? "unchecked" : "checked"
                  );
                }}
              />
              <span className="checkbox-container absolute top-0 left-0 size-[25px] bg-transparent border-2 border-almost-white flex items-center justify-center"></span>
              <span className="text-[18px] text-almost-white font-bold max-md:text-sm">
                Include Uppercase Letters
              </span>
            </label>

            <label className="main flex items-center gap-6 relative cursor-pointer">
              <input
                ref={lowercaseRef}
                type="checkbox"
                className="checkbox"
                onClick={() => {
                  setLowercase(
                    lowercase === "checked" ? "unchecked" : "checked"
                  );
                }}
              />
              <span className="checkbox-container absolute top-0 left-0 size-[25px] bg-transparent border-2 border-almost-white flex items-center justify-center"></span>
              <span className="text-[18px] text-almost-white font-bold max-md:text-sm">
                Include Lowercase Letters
              </span>
            </label>

            <label className="main flex items-center gap-6 relative cursor-pointer">
              <input
                ref={numbersRef}
                type="checkbox"
                className="checkbox"
                onClick={() => {
                  setNumbers(numbers === "checked" ? "unchecked" : "checked");
                }}
              />
              <span className="checkbox-container absolute top-0 left-0 size-[25px] bg-transparent border-2 border-almost-white flex items-center justify-center"></span>
              <span className="text-[18px] text-almost-white font-bold max-md:text-sm">
                Include Numbers
              </span>
            </label>

            <label className="main flex items-center gap-6 relative cursor-pointer">
              <input
                ref={symbolsRef}
                type="checkbox"
                className="checkbox"
                onClick={() => {
                  setSymbols(symbols === "checked" ? "unchecked" : "checked");
                }}
              />
              <span className="checkbox-container absolute top-0 left-0 size-[25px] bg-transparent border-2 border-almost-white flex items-center justify-center"></span>
              <span className="text-[18px] text-almost-white font-bold max-md:text-sm">
                Include Symbols
              </span>
            </label>
          </div>

          <div className="w-full h-[72px] bg-dark my-7 flex items-center justify-between px-8">
            <span className="uppercase text-[18px] font-bold text-lightgray max-md:text-sm">
              Strength
            </span>

            <div className="flex items-center gap-4">
              <span
                ref={strengthRef}
                className="uppercase text-almost-white text-[24px] font-bold max-md:text-sm"
              ></span>
              <div className="flex items-center gap-2">
                <div
                  ref={strengthBar1Ref}
                  className="w-[10px] h-[28px] border border-lightgray"
                ></div>
                <div
                  ref={strengthBar2Ref}
                  className="w-[10px] h-[28px] border border-lightgray"
                ></div>
                <div
                  ref={strengthBar3Ref}
                  className="w-[10px] h-[28px] border border-lightgray"
                ></div>
                <div
                  ref={strengthBar4Ref}
                  className="w-[10px] h-[28px] border border-lightgray"
                ></div>
              </div>
            </div>
          </div>

          <button
            ref={generateRef}
            type="button"
            disabled={
              uppercase === "unchecked" &&
              lowercase === "unchecked" &&
              numbers === "unchecked" &&
              symbols === "unchecked"
            }
            className="w-full h-[65px] bg-green text-darkgray text-[18px] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-auto disabled:opacity-50"
          >
            Generate
            <img
              src={arrowLeft}
              alt="Arrow Left"
              className="w-[11.105px] h-[12px]"
            />
          </button>
        </div>
      </div>

      <Toaster />
    </main>
  );
}

export default App;
