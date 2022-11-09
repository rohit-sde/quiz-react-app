import quizCompleteimg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );

    const skippedAnswerShare = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    );
    const correctAnswersShare = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    );
    const wrongAnswersShare = 100 - skippedAnswerShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizCompleteimg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswerShare}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((userAnswer, index) => {
                    let cssclass = "user-answer";

                    if (userAnswer === null) {
                        cssclass += " skipped";
                    } else if (userAnswer === QUESTIONS[index].answers[0]) {
                        cssclass += " correct";
                    } else {
                        cssclass += " wrong";
                    }

                    return (
                        <li key={userAnswer + index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssclass}>{userAnswer}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default Summary;
