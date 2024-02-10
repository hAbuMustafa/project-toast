import React, { useState, createContext, useEffect } from "react";
import { generate } from "random-words";
import useEscape from "../../hooks/useEscape";

export const ToastContext = createContext();

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastProvider({ children }) {
  const { toasts, addToast, dismissToast, setToasts, getRandomToast } =
    useToasts([]);

  useEscape(() => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        dismissToast,
        getRandomToast,
        VARIANT_OPTIONS,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState([]);

  function addToast(message = "", variant = VARIANT_OPTIONS[0]) {
    const generatedId = crypto.randomUUID();

    setToasts([...toasts, { message, variant, id: generatedId }]);
  }

  function dismissToast(id) {
    setToasts([...toasts.filter((item) => item.id !== id)]);
  }

  function getRandomToast() {
    const message = generate({ exactly: 5, minLength: 5 }).join(" ");

    const variant =
      VARIANT_OPTIONS[Math.floor(Math.random() * VARIANT_OPTIONS.length)];

    addToast(message, variant);
  }

  return { toasts, addToast, dismissToast, setToasts, getRandomToast };
}

export default ToastProvider;
