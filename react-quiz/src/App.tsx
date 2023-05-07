import React, { useState } from 'react';

// importing components
import QuestionCard from './components/QuestionCard';

import { fetchQuizQuestions } from './API';

// types 
import { QuestionState , Difficulty } from './API';


const TOTAL_QUESTIONS = 10
export type AnswerObject = {
  question : string
  answer : string 
  correct : boolean
  correctAnswer : string
}

function App() {

  const [Loading , setLoading] = useState(false)
  const [questions , setQuestions] = useState<QuestionState[]>([]) // an empty array type QuestionState
  const [number , setNumber] = useState(0)  // the number of the question the user if on
  const [userAnswers , setUserAnswers] = useState<AnswerObject[]>([]) // an empty array of tytype AnswerObject 
  const [score , setScore] = useState(0)
  const [gameOver , setGameOver] = useState(true) // the game over toogle value 

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS , Difficulty.EASY ))


  const startTrivia = async () => {
    setLoading(true)  // performing the loading tasks below, so we set hte oading to true
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0) // initial score to 0
    setUserAnswers([])  // set the answers to an empty arrayyyyy
    setLoading(false) // the loading tasks are done above, so we set it to false
  }

  const checkAnswer = (e:  React.MouseEvent<HTMLButtonElement>) => {
    // defining the type of the event when getting the paramter
    if(!gameOver){
      // Users answers 
      const answer = e.currentTarget.value 
      // check the answer against the correctct answer
      const correct=  questions[number].correct_answer === answer
      // add the score if the answer is correct 
      if(correct){
        setScore(prev => prev + 1)
      } 

      //save the answer in the array for user answers 
      const answerObject = {
        question : questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer
      }

      setUserAnswers(prev => [...prev , answerObject])
      // add the currenct User Object Ansswer to the previous answers 

    }


  }

  const nextQuestion  = () => {
    // move on to the next question if not the last questoin
    const nextQuestion = number + 1
    if(nextQuestion===TOTAL_QUESTIONS){
      // if is the last question 
      setGameOver(true)
    }else{
      // not on the last question 
      setNumber(nextQuestion)
    }

  }


  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length===TOTAL_QUESTIONS ? (
        <button onClick = {startTrivia} className='start' >Start</button> ) : null }
        {!gameOver ? <p className='score'>Score : {score} </p> :  null } 
        { Loading ? <p>Loading Questions...</p> : null } 
      {!Loading && !gameOver ? (
      <QuestionCard 
          questionNumber = {number + 1} 
          totalQuestions = {TOTAL_QUESTIONS} 
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined}  // the correct answer
          callback = {checkAnswer}

       />
      ) : null }
      {!gameOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <button className='next' onClick={nextQuestion}>Next Question</button>
      ) : null }

    </div>
  );
}

export default App;
