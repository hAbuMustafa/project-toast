import React, { useState } from "react";

import Button from "../Button";
import Toast from "../Toast";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [toastVisible, toggleToastVisibility] = useToggle(false);
  const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);

  return (
    <div className={styles.wrapper}>
      <Header />

      {toastVisible && (
        <Toast
          variant={selectedVariant}
          message={message}
          dismiss={toggleToastVisibility}
        />
      )}

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

            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={toggleToastVisibility}>Pop Toast!</Button>
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

export default ToastPlayground;
