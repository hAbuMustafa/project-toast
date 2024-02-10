import React, { useEffect } from "react";

export default function useEscape(callback) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key !== "Escape") return;

      callback();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
}
