import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T> | null,
  cb: (event: Event) => void,
) {
  useEffect(() => {
    const element = ref?.current;

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        cb(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
