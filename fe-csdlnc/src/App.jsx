import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Question from "./components/pages/question";
import Layout from "./components/layout/layout";
import Answer from "./components/pages/answer";
import Source from "./components/pages/source";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/question"
            element={
              <Layout>
                <Question />
              </Layout>
            }
          />
          <Route
            path="/answer"
            element={
              <Layout>
                <Answer />
              </Layout>
            }
          />
          <Route
            path="/source"
            element={
              <Layout>
                <Source />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
