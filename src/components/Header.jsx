import logoQuiz from "../assets/Quiz.png";

function Header() {
    return (
        <header>
            <img src={logoQuiz} alt="Quiz logo" />
            <h1>ReactQuiz</h1>
        </header>
    );
}
export default Header;
