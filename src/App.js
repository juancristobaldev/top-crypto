import "./App.css";
import { useEffect, useState } from "react";
import { Text } from "./components/generals/Text";
import { Footer } from "./components/Footer";
import { FaArrowRotateRight } from "react-icons/fa6";
import Loading from "react-loading";
import { Table } from "./components/generals/TableCrypto";

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

  const changeFilter = (value) => {
    setFilter({
      value,
      order: filter.order == "desc" ? "asc" : "desc",
    });
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

  const LoadingScreen = () => {
    return (
      <div className="w-full h-screen absolute top-0 left-0 flex flex-col justify-center items-center">
        <Loading type="spin" />
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

  if (loading /* && !topCrypto.arr.length */) return <LoadingScreen />;
  return (
    <>
      <div className="py-5 px-5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
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
          height: "calc(100vh - 100px - 90px)",
        }}
      >
        <Table
          topCrypto={topCrypto}
          filter={filter}
          changeFilter={changeFilter}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
