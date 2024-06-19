import { Text } from "./generals/Text";

export const ColumnTitle = ({ text, button, className }) => {
  return (
    <th className={className}>
      {!button && text && (
        <Text
          weight={"font-semibold"}
          variant={"description"}
          className={"text-start text-white"}
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
