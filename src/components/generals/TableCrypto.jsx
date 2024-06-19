import {
  FaChevronDown,
  FaChevronUp,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa6";
import { Text } from "./Text";

export const Table = ({ topCrypto, filter, changeFilter }) => {
  const ItemCrypto = ({ item }) => {
    const {
      image,
      index,
      name,
      current_price,
      market_cap_change_percentage_24h,
      market_cap,
      symbol,
    } = item;

    return (
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
    );
  };

  const ColumnTitle = ({ text, button, className }) => {
    return (
      <th className={className}>
        {!button && text && (
          <Text
            weight={"font-semibold"}
            variant={"description"}
            className={"text-start"}
          >
            {text}
          </Text>
        )}
        {button && (
          <button
            onClick={() => button.onClick()}
            className="hover:bg-zinc-700 w-full h-10 rounded-md flex justify-center items-center gap-2"
          >
            <Text weight={"font-semibold"} variant={"description"}>
              {button.text}
            </Text>
            {button.icon}
          </button>
        )}
      </th>
    );
  };

  const columnsTitle = [
    { className: "w-2/5", text: "Assets" },
    {
      className: "w-1/5",
      button: {
        onClick: () => changeFilter("current_price"),
        text: "Price",
        icon:
          filter.order === "desc" ? (
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
          ),
      },
    },
    {
      className: "w-1/5",
      button: {
        onClick: () => changeFilter("market_cap_change_percentage_24h"),
        text: "24H",
        icon:
          filter.order === "desc" ? (
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
          ),
      },
    },
    {
      className: "w-1/5",
      button: {
        onClick: () => changeFilter("market_cap"),
        text: "Market cap",
        icon:
          filter.order === "desc" ? (
            <FaChevronUp
              className={
                filter.value === "market_cap" ? "text-white" : "text-zinc-600"
              }
            />
          ) : (
            <FaChevronDown
              className={
                filter.value === "market_cap" ? "text-white" : "text-zinc-600"
              }
            />
          ),
      },
    },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="h-14 border-zinc-700 border-b border-t">
          {columnsTitle.map(({ text, button, className }, index) => (
            <ColumnTitle
              key={index}
              text={text}
              className={className}
              button={button}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {topCrypto.arr.length &&
          topCrypto.arr.map((item, index) => (
            <ItemCrypto key={index} item={item} />
          ))}
      </tbody>
    </table>
  );
};
