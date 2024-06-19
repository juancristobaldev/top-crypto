import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { Text } from "./generals/Text";

export const ItemCrypto = ({ item }) => {
  const {
    image,
    index,
    name,
    current_price,
    market_cap_change_percentage_24h,
    market_cap,
    symbol,
  } = item;

  if (item)
    return (
      <tr
        className="h-full w-full cursor-pointer hover:bg-zinc-900 "
        key={index}
      >
        <td className="h-14 flex items-center gap-2 pl-3">
          <img width={25} height={25} src={image} />
          <Text
            className={"hidden text-white sm:block"}
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
            className={"text-center text-white max-md:text-sm"}
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
            {market_cap_change_percentage_24h.toFixed(2)}%
          </Text>
        </td>
        <td>
          <Text
            weight={"font-light"}
            variant={"description"}
            className={"text-center  text-white max-md:text-sm"}
          >
            ${market_cap} USD
          </Text>
        </td>
      </tr>
    );
};
