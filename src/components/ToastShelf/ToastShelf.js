import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ items }) {
  return (
    <ol className={styles.wrapper}>
      {items.map(({ variant, message, id }) => (
        <li className={styles.toastWrapper}>
          <Toast variant={variant} id={id}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
