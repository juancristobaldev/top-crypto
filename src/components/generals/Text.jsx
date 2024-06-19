export const Text = ({ variant, children, weight, className, style }) => {
  switch (variant) {
    case "title":
      return (
        <h1
          style={style}
          className={`${
            !className && "text-white"
          } text-3xl font-semibold ${weight} ${className}`}
        >
          {children}
        </h1>
      );
    case "description":
      return (
        <p
          style={style}
          className={`${!className && "text-white"} ${weight} ${className}`}
        >
          {children}
        </p>
      );
  }
};
