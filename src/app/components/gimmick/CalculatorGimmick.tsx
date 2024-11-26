import React, { useState } from "react";

const CalculatorGimmick = () => {
  const [result, setResult] = useState<string>("");

  const handleClick = (value: string) => {
    setResult((prevResult) => prevResult + value);
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch {
      alert("Error: Invalid expression");
      setResult("");
    }
  };

  const clear = () => {
    setResult("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      calculate();
    }
  };

  return (
    <div
      className="max-w-[350px] rounded-lg bg-black p-4 shadow-md"
      onKeyDown={handleKeyPress}
    >
      <input
        type="text"
        value={result}
        readOnly
        className="mb-4 w-full rounded bg-gray-600 p-2 text-right text-lg font-bold"
      />
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => handleClick("7")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          7
        </button>
        <button
          onClick={() => handleClick("8")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          8
        </button>
        <button
          onClick={() => handleClick("9")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          9
        </button>
        <button
          onClick={() => handleClick("+")}
          className="rounded bg-orange-500 p-2 text-white hover:bg-orange-600"
        >
          +
        </button>
        <button
          onClick={() => handleClick("4")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          4
        </button>
        <button
          onClick={() => handleClick("5")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          5
        </button>
        <button
          onClick={() => handleClick("6")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          6
        </button>
        <button
          onClick={() => handleClick("-")}
          className="rounded bg-orange-500 p-2 text-white hover:bg-orange-600"
        >
          -
        </button>
        <button
          onClick={() => handleClick("1")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          1
        </button>
        <button
          onClick={() => handleClick("2")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          2
        </button>
        <button
          onClick={() => handleClick("3")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          3
        </button>
        <button
          onClick={() => handleClick("*")}
          className="rounded bg-orange-500 p-2 text-white hover:bg-orange-600"
        >
          *
        </button>
        <button
          onClick={() => handleClick("0")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          0
        </button>
        <button
          onClick={() => handleClick(".")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          .
        </button>
        <button
          onClick={calculate}
          className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          =
        </button>
        <button
          onClick={() => handleClick("/")}
          className="rounded bg-orange-500 p-2 text-white hover:bg-orange-600"
        >
          /
        </button>
        <button
          onClick={clear}
          className="col-span-4 rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          C
        </button>
      </div>
    </div>
  );
};

export default CalculatorGimmick;
