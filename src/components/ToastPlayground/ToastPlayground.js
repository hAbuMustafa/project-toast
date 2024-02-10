import React, { useContext, useRef, useState } from "react";

import Button from "../Button";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

function ToastPlayground() {
  const { addToast, VARIANT_OPTIONS, getRandomToast } =
    useContext(ToastContext);

  const [message, setMessage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);

  const inputRef = useRef();

  function pushToast() {
    addToast(message, selectedVariant);
    setSelectedVariant(VARIANT_OPTIONS[0]);
    setMessage("");
    inputRef.current.focus();
  }

  return (
    <div className={styles.wrapper}>
      <Header />

      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (!(e.key === "Enter" && e.ctrlKey)) return;
          pushToast();
        }}
      >
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
              ref={inputRef}
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
            <Button onClick={pushToast}>Pop Toast!</Button>
            <Button onClick={getRandomToast}>Add Random Toast!</Button>
          </div>
        </div>
      </form>
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

export default ToastPlayground;
