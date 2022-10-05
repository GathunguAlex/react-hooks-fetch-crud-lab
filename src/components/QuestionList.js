import React,{ useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  //GET request
  useEffect( () => {
    fetch('http://localhost:4000/questions')
    .then( (r) => r.json())
    .then( (question) => setQuestions(question))
  },[])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {/* {questions.map((question) => (
          <li key={question.id}>
           <p>{question.prompt}</p><br/><br/>
           <p>{question.answers}</p><br/>
           <p>{question.correctIndex}</p>
          </li>
      ))} */}
      {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;