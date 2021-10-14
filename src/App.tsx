import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Header, Hero, HowTo, Footer } from "components";
import store from "./store/index";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Provider store={store}>
          <Header/>
          <Hero/>
          <HowTo/>
          <Footer/>
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
