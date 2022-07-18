import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updateQuestions = questions.filter((quiz) =>quiz.id !== id);
        setQuestions(updateQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
      .then((response) => response.json())
      .then((updateQuestion) => {
        const updateQuestions = questions.map((quiz) => {
          if (quiz.id === updateQuestion.id) return updateQuestion;
          return quiz;
        });
        setQuestions(updateQuestions);
      });
  }

const questionItems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;

