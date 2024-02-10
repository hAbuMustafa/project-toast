import React from "react";

import ToastPlayground from "../ToastPlayground";
import Footer from "../Footer";
import ToastShelf from "../ToastShelf";
import ToastProvider from "../ToastProvider";

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <Footer />
      <ToastShelf />
    </ToastProvider>
  );
}

export default App;
