import { useEffect } from "react";

export const useFocus = (element) => {
  useEffect(() => {
    if (element && element.current) element.current.focus();
  }, [element]);
};
