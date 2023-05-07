import { shuffleArray } from "./Utils";

export type Question = {
    category : string ;
    correct_answer : string
    difficulty : string
    incorrect_answers : string[]
    question : string;
    type : string
}


export enum Difficulty{
    EASY  = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type QuestionState = Question & {answers : string[]}
// creating a new type from the Question and adding a new property answers

export const fetchQuizQuestions = async(amount : number , difficulty : Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    console.log('data : ' , data)
    if(data!==undefined){
        return data?.results.map((question : Question) => (
            {
                ...question,
                answers : shuffleArray([...question.incorrect_answers , question.correct_answer])
                // spread the correct answer and incorrect answer and shuffle it 
    
            }
        ))
    }

}