import { useEffect, useState } from "react";

export default function useDebounce(changeStream, delay) {
  const [debouncedValue, setDebouncedValue] = useState(changeStream);

  useEffect(() => {
    const timeoutRef = setTimeout(() => setDebouncedValue(changeStream), delay);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [changeStream]);

  return debouncedValue;
}
