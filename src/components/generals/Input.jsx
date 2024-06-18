import { useEffect, useRef, useState } from "react";

export const Input = ({
  setErrors,
  max,
  min,
  childrenInput,
  type = "text",
  label,
  onChange,
  value,
  error,
  placeholder,
  LeftIcon,
  RightIcon,

  button,
  errorCascade,
  styleLabel,
  styleInput,
  options,
  accept = undefined,
  multiple = undefined,
  disabled = false,
  children,
  ariaDescribedby,
  clickOutside = false,
  autocomplete = true,
  ref,
  key,
  hidden,
  container = false,
  classNameLabel,
  classNameContainer,
  classNameInput,
}) => {
  const refOne = useRef(null);

  const [touched, setTouched] = useState(false);

  const handleClickOutside = async (e) => {
    if (refOne.current && refOne.current.contains(e.target)) {
      await setTouched(true);
    } else if (refOne.current && !refOne.current.contains(e.target)) {
      console.log("fuera");
      await setTouched(false);
    }
  };

  useEffect(() => {
    console.log("clickOutside", clickOutside);
    if (clickOutside) {
      document.addEventListener("click", handleClickOutside);
    }
  }, []);

  /*
  
  {
      display: "flex",
      flexDirection: "column",
      justifyContent: justifyContent,
      gap: 10,
    },
    input: {
      border: 0,
      width: width ? width : "100%",
      background: "transparent",
      fontSize: fontSize,
      paddingLeft: 10,
      "&::placeholder": {
        color: theme?.theme.colorFontSecondary
          ? theme?.theme.colorFontSecondary
          : "#8B8B8B",
        fontSize: mediumFont,
      },
      "&:focus": {
        outline: "none",
      },
    }
  */

  return (
    <label
      className={`flex flex-col gap-3 ${classNameLabel}`}
      htmlFor={key}
      aria-describedby={ariaDescribedby}
    >
      {label && (
        <p className="max-md:text-sm font-semibold" style={styleLabel}>
          {label}
        </p>
      )}
      <div
        className={
          classNameContainer
            ? classNameContainer
            : `flex ${
                type !== "number" ? "p-1.5" : "px-1"
              } gap-x-3 border rounded-md`
        }
        ref={refOne}
      >
        {touched && childrenInput}
        {LeftIcon && (
          <LeftIcon
            weight={"fill"}
            style={{ alignSelf: "center" }}
            color={error ? "red" : "#8B8B8B"}
          />
        )}
        {container ? (
          <p>{value}</p>
        ) : type !== "select" && type !== "textarea" && type !== "number" ? (
          <>
            <input
              className={
                "max-md:text-sm text-base w-full focus:outline-none w-full " +
                classNameInput
              }
              id={key}
              hidden={hidden}
              ref={ref}
              autoComplete={autocomplete}
              disabled={disabled}
              value={value}
              onChange={(event) => {
                onChange(event);
                if (setErrors) {
                  setErrors({});
                }
              }}
              type={type}
              placeholder={placeholder}
              accept={accept}
              multiple={multiple}
              max={max}
              min={min}
            />
          </>
        ) : type === "select" ? (
          <select
            className={
              "max-md:text-sm text-base focus:outline-none w-full " +
              classNameInput
            }
            hidden={hidden}
            id={key}
            value={value}
            onChange={(event) => {
              onChange(event);
              if (setErrors) {
                setErrors({});
              }
            }}
            style={styleInput}
            placeholder={placeholder}
          >
            {options &&
              options.map((option, index) => (
                <option
                  selected={option.selected}
                  disabled={option.selected}
                  key={index}
                  value={option.value}
                >
                  {option.text ? option.text : option.value}
                </option>
              ))}
          </select>
        ) : type === "number" ? (
          <input
            className={
              "max-md:text-sm text-base focus:outline-none w-full " +
              classNameInput
            }
            id={key}
            ref={ref}
            autoComplete={autocomplete}
            disabled={disabled}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (setErrors) {
                setErrors({});
              }
            }}
            style={styleInput}
            type={type}
            placeholder={placeholder}
            max={max}
            min={min}
            onKeyDown={(evt) => evt.preventDefault()}
          />
        ) : (
          <textarea
            className={
              "max-md:text-sm text-base focus:outline-none w-full " +
              classNameInput
            }
            id={key}
            onChange={(e) => {
              onChange(e);
              if (setErrors) {
                setErrors({});
              }
            }}
            aria-multiline
            value={value}
            placeholder={placeholder}
            style={{
              resize: "none",
            }}
          />
        )}
        {RightIcon && (
          <RightIcon style={{ marginRight: "10px" }} color="#8B8B8B" />
        )}
        {children}
      </div>
      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
      {errorCascade && !error && (
        <div
          style={{
            height: 12,
          }}
        ></div>
      )}
      {button && button}
    </label>
  );
};
