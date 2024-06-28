import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef(); // to manage some values which will not change if the component function does not execute again
     // if shuffledAnswers is undefined
     if (!shuffledAnswers.current) {
        // comes after the quizIsComplete
        shuffledAnswers.current = [...answers]; // we're creating a new array as for the one below, we do not want to shuffle the answers and want to keep the answers in the top
        shuffledAnswers.current.sort(() => Math.random() - 0.5); // gives us a value of negative or positive, helping us to shuffle the answers
    }

    return (
        <ul id='answers'>
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer; // this is written in order to access the last answer that was selected by the user
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if (
                    (answerState === 'correct' || answerState === 'incorrect') &&
                isSelected
                ) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className='answer'>
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClass}
                            disabled={answerState !== ''} // make sure that we can only press it once
                        >
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}