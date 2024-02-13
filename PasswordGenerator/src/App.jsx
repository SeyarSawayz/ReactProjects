import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);
  const copyPassToClip = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-y m-8  bg-gray-800 border-[1px] border-white">
        <h1 className="text-4xl font-bold text-center text-white mb-4 mt-3">
          password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 ml-2 rounded-l-lg"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 mr-2 rounded-r-lg hover:bg-blue-500 hover:text-black"
            onClick={copyPassToClip}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-orange-400 mb-3 px-3 text-md">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Lenght: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-orange-400 mb-3 px-1 text-md">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex gap-x-1 text center text-orange-400 mb-3 px-3 text-md">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charAllowed"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Char Allowed</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
