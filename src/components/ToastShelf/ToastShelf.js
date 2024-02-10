import React, { memo, useContext } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { toasts } = useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ variant, message, id }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} id={id}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default memo(ToastShelf);
