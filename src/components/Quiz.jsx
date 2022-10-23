import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions";
import quizCompleteimg from "../assets/quiz-complete.png";

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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected =
                            userAnswer[userAnswer.length - 1] === answer;
                        let cssClasses = "";
                        if (answerState === "answered" && isSelected) {
                            cssClasses = "selected";
                        }
                        if (
                            (answerState === "correct" ||
                                answerState === "wrong") &&
                            isSelected
                        ) {
                            cssClasses = answer;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button
                                    onClick={() => handleSelectAnswer(answer)}
                                    className={cssClasses}
                                >
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
export default Quiz;
