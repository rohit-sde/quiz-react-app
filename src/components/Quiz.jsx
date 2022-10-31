import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteimg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

function Quiz() {
    const [userAnswer, setuserAnswer] = useState([]);

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
        return (
            <div id="summary">
                <img src={quizCompleteimg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
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
