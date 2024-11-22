import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Question from "./components/pages/question";
import Layout from "./components/layout/layout";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Question />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
