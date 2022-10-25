import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteimg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

function Quiz() {
    const [answerState, setAnswerState] = useState("");
    const [userAnswer, setuserAnswer] = useState([]);

    const activeQuestionIndex =
        answerState === "" ? userAnswer.length : userAnswer.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ) {
        setAnswerState("answered");
        setuserAnswer((prevUSerAnswers) => {
            return [...prevUSerAnswers, selectedAnswer];
        });
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }
            setTimeout(() => {
                setAnswerState("");
            }, 2000);
        }, 1000);
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
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswer[userAnswer.length - 1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
export default Quiz;
