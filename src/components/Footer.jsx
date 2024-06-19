import { Text } from "./generals/Text";
export const Footer = () => {
  return (
    <footer className="h-[90px] w-full">
      <Text
        className={
          "text-center  h-full flex flex-col justify-center items-center"
        }
        variant={"description"}
      >
        <span className="font-light text-sm">Powered by: </span>
        <strong>Juan Cristobal Dev</strong>
        <p className="text-sm">juancristobaldeveloper@gmail.com</p>
      </Text>
    </footer>
  );
};
