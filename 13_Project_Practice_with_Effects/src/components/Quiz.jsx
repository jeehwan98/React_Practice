import { useState, useCallback, useRef } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
    // const [ answerState, setAnswerState ] = useState('');
    const [ userAnswers, setUserAnswers ] = useState([]);
    // since we're updating it straight in the Question component, we can just use the length
    const activeQuestionIndex = userAnswers.length;
    // const activeQuestionIndex = 
    //     answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswers = useCallback(function handleSelectAnswers(selectedAnswers) {
        // setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswers]; // making sure that we don't lose any old state
        });

        // after 1 second, we want to change the answer state if correct or incorrect
        // setTimeout(() => {
        //     if (selectedAnswers === QUESTIONS[activeQuestionIndex].answers[0]) {
        //         setAnswerState('correct');
        //     } else {
        //         setAnswerState('incorrect');
        //     }

        //     setTimeout(() => {
        //         setAnswerState('');
        //     }, 2000);
        // }, 1000);
    }, []); // activeQuestionIndex is added to the dependency array because this function has to change whenever the activeQuestionIndex value changes

    // useCallback is used so that it doesn't constantly make the function
    const handleSkipAnswers = useCallback(() => handleSelectAnswers(null), []); // useCallback needs dependency arrays

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers}/>
        )
    }
    
    return (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                // questionText={QUESTIONS[activeQuestionIndex].text}
                // answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswers}
                // selectedAnswer={userAnswers[userAnswers.length - 1]}
                // answerState={answerState}
                onSkipAnswer={handleSkipAnswers}
            />
        </div>
    )
}