import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Question from "./components/pages/question";
import Layout from "./components/layout/layout";
import Answer from "./components/pages/answer";
import Source from "./components/pages/source";
import Dashboard from "./components/pages/dashboard";
import User from "./components/pages/user";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
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
          <Route
            path="/user"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
