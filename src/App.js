import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  FaArrowRotateRight,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa6";

import { Input } from "./components/generals/Input";

function App() {
  const [loading, setLoading] = useState(false);
  const [topCrypto, setTopCrypto] = useState({
    arr: [],
    default: [],
    date: false,
  });

  const sortArr = (orderBy = "desc", arr, field) => {
    if (orderBy === "desc") return arr.sort((a, b) => b[field] - a[field]);
    else return arr.sort((a, b) => a[field] - b[field]);
  };

  const getTopCrypto = async () => {
    try {
      if (!loading) {
        await setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10"
        )
          .then((data) => data.json())
          .catch((error) => {
            console.log(error);
          });

        console.log(response);
        if (response) {
          let now = new Date();
          let options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Formato de 24 horas
            timeZone: "America/New_York", // Zona horaria de Estados Unidos (ejemplo)
          };

          let formattedDateTime = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(now);

          let arr = response;
          if (filter.order || filter.value) {
            arr = sortArr(filter.order, arr, filter.value);
          }

          setTopCrypto({
            arr: response,
            default: response,
            date: formattedDateTime,
          });
        }
        await setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      getTopCrypto();
    }
  }, []);

  const Text = ({ variant, children, weight, className, style }) => {
    switch (variant) {
      case "title":
        return (
          <h1
            style={style}
            className={`text-white text-3xl font-semibold ${weight} ${className}`}
          >
            {children}
          </h1>
        );
      case "description":
        return (
          <p style={style} className={`text-white  ${weight} ${className}`}>
            {children}
          </p>
        );
    }
  };

  const LoadingScreen = () => {
    return (
      <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
        <Text variant={"title"} className="text-xl font-semibold">
          Cargando...
        </Text>
      </div>
    );
  };

  const [filter, setFilter] = useState({
    value: undefined,
    order: undefined,
  });

  const { value, order } = filter;

  useEffect(() => {
    let newArr = [...topCrypto.default];

    if (order !== undefined) {
      const sortedArr = sortArr(order, newArr, value);

      setTopCrypto({ ...topCrypto, arr: sortedArr });
    }
  }, [order]);

  useEffect(() => {
    getTopCrypto(); // Realizar la solicitud inicial al montar el componente

    const interval = setInterval(() => {
      getTopCrypto();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const changeFilter = (value) => {
    setFilter({
      value,
      order: filter.order == "desc" ? "asc" : "desc",
    });
  };

  if (true /* && !topCrypto.arr.length */) return <LoadingScreen />;
  return (
    <>
      <div className="py-5 px-5 flex items-center justify-between">
        <div>
          <Text variant={"title"} className="font-light max-sm:text-2xl">
            Top 10 Cryptocurrencies
          </Text>
          <Text
            variant={"description"}
            weight={"font-light"}
            className="text-sm "
          >
            Last update time: {topCrypto.date}
          </Text>
        </div>
        <div className="flex gap-3">
          <FaArrowRotateRight
            onClick={!loading ? () => getTopCrypto() : null}
            size={20}
            className={`cursor-pointer ${
              !loading ? "text-white" : "text-zinc700"
            }`}
          />
        </div>
      </div>
      <div
        style={{
          width: "92.5%",
          margin: "0px auto",
        }}
      >
        <table className="w-full">
          <thead>
            <tr className="h-14 border-zinc-700 border-b border-t">
              <th className="w-2/5">
                <Text
                  weight={"font-semibold"}
                  variant={"description"}
                  className={"text-start"}
                >
                  {"Assets"}
                </Text>
              </th>
              <th className="w-1/5">
                <button
                  onClick={() => changeFilter("current_price")}
                  className="hover:bg-zinc-700 w-full h-10 rounded-md flex justify-center items-center gap-2"
                >
                  <Text weight={"font-semibold"} variant={"description"}>
                    {"Price"}
                  </Text>
                  {filter.order === "desc" ? (
                    <FaChevronUp
                      className={
                        filter.value === "current_price"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  ) : (
                    <FaChevronDown
                      className={
                        filter.value === "current_price"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  )}
                </button>
              </th>
              <th className="w-1/5">
                <button
                  onClick={() =>
                    changeFilter("market_cap_change_percentage_24h")
                  }
                  className="hover:bg-zinc-700 w-full h-10 rounded-md flex justify-center items-center gap-2"
                >
                  <Text weight={"font-semibold"} variant={"description"}>
                    {"24H"}
                  </Text>
                  {filter.order === "desc" ? (
                    <FaChevronUp
                      className={
                        filter.value === "market_cap_change_percentage_24h"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  ) : (
                    <FaChevronDown
                      className={
                        filter.value === "market_cap_change_percentage_24h"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  )}
                </button>
              </th>
              <th className="w-1/5">
                <button
                  onClick={() => changeFilter("market_cap")}
                  className="hover:bg-zinc-700 w-full h-10 rounded-md flex justify-center items-center gap-2"
                >
                  <Text weight={"font-semibold"} variant={"description"}>
                    {"Market cap"}
                  </Text>
                  {filter.order === "desc" ? (
                    <FaChevronUp
                      className={
                        filter.value === "market_cap"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  ) : (
                    <FaChevronDown
                      className={
                        filter.value === "market_cap"
                          ? "text-white"
                          : "text-zinc-600"
                      }
                    />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {topCrypto.arr.map(
              (
                {
                  name,
                  image,
                  symbol,
                  market_cap,
                  current_price,
                  market_cap_change_percentage_24h,
                },
                index
              ) => (
                <tr className="h-full w-full hover:bg-zinc-900 " key={index}>
                  <td className="h-14 flex items-center gap-2 pl-3">
                    <img width={25} height={25} src={image} />
                    <Text
                      className={"hidden sm:block"}
                      weight={"font-semibold"}
                      variant={"description"}
                    >
                      {name}
                    </Text>
                    <Text
                      variant={"description"}
                      weight="font-light"
                      className={"text-gray-400"}
                    >
                      {symbol.toUpperCase()}
                    </Text>
                  </td>
                  <td>
                    <Text
                      weight={"font-light"}
                      variant={"description"}
                      className={"text-center max-md:text-sm"}
                    >
                      $
                      {current_price >= 1000
                        ? current_price.toLocaleString("en-US")
                        : current_price.toFixed(2)}
                    </Text>
                  </td>
                  <td className="flex justify-center items-center gap-1">
                    {market_cap_change_percentage_24h.toString()[0] === "-" ? (
                      <FaSortDown className="text-red-600" />
                    ) : (
                      <FaSortUp className="text-green-500" />
                    )}
                    <Text
                      weight={"font-light"}
                      variant={"description"}
                      className={`max-md:text-sm text-center flex justify-center items-center h-10 ${
                        market_cap_change_percentage_24h.toString()[0] === "-"
                          ? "text-red-600"
                          : "text-green-500"
                      }`}
                    >
                      {market_cap_change_percentage_24h.toFixed(2)}
                    </Text>
                  </td>
                  <td>
                    <Text
                      weight={"font-light"}
                      variant={"description"}
                      className={"text-center max-md:text-sm"}
                    >
                      ${market_cap} USD
                    </Text>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <footer className="h-[90px] items-center flex justify-center items-center w-full">
        <p className="text-white text-center">
          <span className="font-light">Powered by: </span>
          <br />
          <strong>Juan Cristobal Dev</strong>
        </p>
      </footer>
    </>
  );
}

export default App;
