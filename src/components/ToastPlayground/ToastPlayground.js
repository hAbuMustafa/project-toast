import React, { createContext, useId, useRef, useState } from "react";
import { generate } from "random-words";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

export const DismissContext = createContext();

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);

  const { toasts, addToast, dismissToast } = useToasts([]);

  return (
    <div className={styles.wrapper}>
      <Header />

      <DismissContext.Provider value={dismissToast}>
        <ToastShelf items={toasts} />
      </DismissContext.Provider>

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`variant-${variant}`} key={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variant === selectedVariant}
                  onChange={(e) => {
                    setSelectedVariant(e.target.value);
                  }}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button
              onClick={() => {
                addToast(message, selectedVariant);
                setSelectedVariant(VARIANT_OPTIONS[0]);
                setMessage("");
              }}
            >
              Pop Toast!
            </Button>
            <Button
              onClick={() => {
                const message = generate({ exactly: 5, minLength: 5 }).join(
                  " "
                );

                const variant =
                  VARIANT_OPTIONS[
                    Math.floor(Math.random() * VARIANT_OPTIONS.length)
                  ];

                addToast(message, variant);
              }}
            >
              Add Random Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <img alt="Cute toast mascot" src="/toast.png" />
      <h1>Toast Playground</h1>
    </header>
  );
}

function useToggle(defaultState) {
  const [value, setValue] = useState(defaultState);

  function toggleState() {
    setValue((currentValue) => !currentValue);
  }

  return [value, toggleState];
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

  return { toasts, addToast, dismissToast };
}

export default ToastPlayground;
