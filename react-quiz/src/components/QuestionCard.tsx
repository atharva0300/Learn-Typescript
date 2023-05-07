import React from 'react';

// types 
import { AnswerObject } from '../App';

// creating props 
type Props = {
    question : string;
    answers: string[]   // array of strings
    callback : (e : React.MouseEvent<HTMLButtonElement>) => void ; // data type can be anything -> we are not returning anything     -> so void 
    userAnswer : AnswerObject | undefined 
    questionNumber : number
    totalQuestions : number
}

const QuestionCard: React.FC<Props> = ({question , answers , callback , userAnswer , questionNumber , totalQuestions}) => {
    // React.FC => React functional component
    // Adding the Props field as the data in the props field takes the shape of the type Props which  is created above 

    console.log('answers : ' , answers)


    return(
        <div>
            <p className='number'>
                Question : {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html : question }}></p>
            <div>
                {answers.map((answer) => (
                    <div key = {answer} >
                        <button disabled = {userAnswer ? true :false } value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html : answer}}></span>
                        </button>
                    
                    </div>
                ))}
            </div>
        </div>
    )
}


export default QuestionCard