import { useState } from "react";

import QUESTIONS from "../questions";

function Quiz() {
    const [userAnswer, setuserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length;
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    function handleSelectAnswer(selectedAnswer) {
        setuserAnswer((prevUSerAnswers) => {
            return [...prevUSerAnswers, selectedAnswer];
        });
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Quiz;
