import { useState } from "react";
import { InputBox } from "./components";
import userCurrencyInfo from "./hooks/userCurrencyInfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = userCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const coverted = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2020/03/18/20/01/frankfurt-4945405_1280.jpg')`,
      }}
    >
      <h1 className="font-bold bg-cyan-800 md:text-3xl text-xl p-4 rounded-md text-white hover:text-black cursor-pointer mb-0 ">
        Currency Converter تبدیل اسعار
      </h1>

      <div className="w-full flex justify-center items-center  ">
        <div className=" flex items-center justify-center  gap-x-12  ">
          <div className=" max-w-md">
            <img
              src="https://cdn.pixabay.com/photo/2018/12/21/10/00/india-3887568_1280.jpg"
              className="w-[700px] rounded-xl my-4 shadow-lg bg-cover bg-no-repeat "
              alt=""
            />
          </div>
          <div className="w-full max-w-md  border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                coverted();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setAmount(amount)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white  bg-blue-600 text-white px-2 py-0.5 rounded-full"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  amountDisable
                  selectCurrency={to}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toLocaleUpperCase()} to {to.toLocaleUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
