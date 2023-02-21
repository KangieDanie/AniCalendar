import * as React from "react";

const useCheckTabletScreen = () => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 1400;
};

export default useCheckTabletScreen;
