import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

import "../../index.css";
import { ColumnTitle } from "../ColumnTitle";
import { ItemCrypto } from "../ItemCrypto";

export const TableCrypto = ({ topCrypto, filter, changeFilter }) => {
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
