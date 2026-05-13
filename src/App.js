import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./page/Main.js";
import HomePage from "./page/Home.js";
import DataPage from "./page/Data.js";
import ModelPage from "./page/Model.js";
import PredictPage from "./page/Predict.js";
import HistoryPage from "./page/History.js";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </Fragment>
    )
  }
}

export default App;
