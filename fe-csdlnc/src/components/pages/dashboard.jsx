import React, { memo, useState, useEffect } from "react";
import axios from "../../config/configAxios";
import { Button } from "flowbite-react";
import jsPDF from "jspdf";
const Dashboard = memo(() => {
  const [questions, setQuestions] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [questionSelection, setQuestionSelection] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/getAllQuestionsAndAnswers");
        setQuestions(res.data);
      } catch (err) {
        console.log(err);
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, []);
  const handlePrint = () => {
    window.print();
  };
  const back = () => {
    setShowTest(false);
    setQuestionSelection([]);
  };
  return (
    <div className="flex flex-col ">
      <div className="flex text-2xl font-bold mt-4 mb-10 mx-auto !important">
        Tổng hợp
      </div>
      <div className="w-full flex justify-end space-x-4 pr-4 ">
        {!showTest && (
          <Button onClick={() => setShowTest(true)}>Xem đề mẫu</Button>
        )}
        {showTest && <Button onClick={handlePrint}>In đề</Button>}
        {showTest && <Button onClick={back}>Trở về </Button>}
      </div>
      <ol style={{ marginLeft: "50px" }}>
        {showTest ? (
          <CreateTest
            questions={questions}
            questionSelection={questionSelection}
            setQuestionSelection={setQuestionSelection}
          />
        ) : (
          <PrinttableQuestion questions={questions} />
        )}
      </ol>
    </div>
  );
});
const PrinttableQuestion = memo(({ questions }) => {
  return questions?.map((question, index) => (
    <li key={question.id} style={{ margin: "10px 0" }}>
      <p>
        {index + 1}.{question.question}
      </p>
      <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
        {question.answers.map((answer, idx) => (
          <li key={idx} style={{ margin: "5px 0" }}>
            <label
              style={{
                textDecoration: answer.correct === "1" ? "underline" : "none",
                fontWeight: answer.correct === "1" ? "bold" : "normal",
              }}
            >
              {String.fromCharCode(65 + idx)}. {answer.answer}
            </label>
          </li>
        ))}
      </ul>
    </li>
  ));
});
const CreateTest = memo(
  ({ questions, questionSelection, setQuestionSelection }) => {
    useEffect(() => {
      const selectQuestions = () => {
        let selectedQuestions = [...questionSelection];

        while (selectedQuestions.length < 40) {
          const random = Math.floor(Math.random() * questions.length);
          if (!selectedQuestions.includes(questions[random])) {
            selectedQuestions.push(questions[random]);
          }
        }

        setQuestionSelection(selectedQuestions);
      };
      selectQuestions();
    }, [questions]);
    return questionSelection?.map((question, index) => (
      <li key={question.id} style={{ margin: "10px 0" }}>
        <p>
          {index + 1}.{question.question}
        </p>
        <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
          {question.answers.map((answer, idx) => (
            <li key={idx} style={{ margin: "5px 0" }}>
              <label
                style={{
                  textDecoration: answer.correct === "1" ? "underline" : "none",
                  fontWeight: answer.correct === "1" ? "bold" : "normal",
                }}
              >
                {String.fromCharCode(65 + idx)}. {answer.answer}
              </label>
            </li>
          ))}
        </ul>
      </li>
    ));
  }
);
export default Dashboard;
