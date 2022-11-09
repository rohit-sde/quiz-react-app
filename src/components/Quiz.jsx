import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const dummyAnswers = [
    "A library to build user interfaces with help of declarative code.",
    "Creating responsive layouts in React applications.",
    "A JavaScript library for building dynamic user interfaces.",
    'By using the "new" keyword followed by the component name.',
    "A library for managing global state in React applications.",
    null,
    "Using the #if template syntax.",
];

function Quiz() {
    const [userAnswer, setuserAnswer] = useState([]);
    console.log(userAnswer);
    const activeQuestionIndex = userAnswer.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ) {
        setuserAnswer((prevUSerAnswers) => {
            return [...prevUSerAnswers, selectedAnswer];
        });
    },
    []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswer} />;
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
export default Quiz;
