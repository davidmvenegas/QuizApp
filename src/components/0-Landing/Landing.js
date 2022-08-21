import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useQuizContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './landing.css'

function Landing() {
    let navigate = useNavigate()
    const { setData, setCurrentQuizType, generalData, medicalData, programmingData } = useQuizContext()
    const [quizChosen, setQuizChosen] = useState(false)
    const [pastQuizzes, setPastQuizzes] = useState()
    const [trigger, setTrigger] = useState()
    
    useEffect(() => {
        const pastQuizData = JSON.parse(localStorage.getItem('savedQuizzes'))
        setPastQuizzes(pastQuizData)
    }, [trigger])

    function handleSelection(e) {
    switch (e.target.selectedIndex) {
        case 1:
            setData(generalData)
            setCurrentQuizType('General Quiz')
            setQuizChosen(true)
            break;
        case 2:
            setData(medicalData)
            setCurrentQuizType('Medical Quiz')
            setQuizChosen(true)
            break;
        case 3:
            setData(programmingData)
            setCurrentQuizType('Programming Quiz')
            setQuizChosen(true)
            break;
        default:
            break;
        }
    }

    function handleRemoveAllQuizzes() {
        localStorage.removeItem('savedQuizzes')
        setTrigger(Math.random())
    }

    return (
        <div className="landing-container">
            <div className="backgroundSquare"></div>
            <div className="backgroundCircle"></div>
            <div className="landing-wrapper">
                <h1>Quiz App</h1>
                <div className="landing-options-container">
                    <select defaultValue={"choose"} className="landing-select-box" onChange={handleSelection}>
                        <option value="choose" disabled defaultValue hidden>Choose Quiz</option>
                        <option value="general">General</option>
                        <option value="medical">Medical</option>
                        <option value="programming">Programming</option>
                    </select>
                    <button className="landing-start-btn" onClick={() => navigate('/questionnaire')} disabled={!quizChosen} style={quizChosen ? null : {cursor: 'not-allowed'}}>Start</button>
                </div>
                <div className="landing-results-container">
                    <div className="landing-results-top">
                        <h1>Past Results</h1>
                        {pastQuizzes?.length > 0 ? <h3 className="removeAll" onClick={() => handleRemoveAllQuizzes()}>Clear All</h3> : null}
                    </div>
                    <div className="landing-results-main">
                        {pastQuizzes?.length > 0
                            ?
                            pastQuizzes.map(thisQuiz => (
                                <Result key={thisQuiz.id} thisQuiz={thisQuiz} setTrigger={setTrigger}/>
                            ))
                            :
                        <div className="noPastQuizzes">No Past Quizzes</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Result({thisQuiz, setTrigger}) {
    let navigate = useNavigate()
    const correctAnswers = thisQuiz.answers.filter(answer => answer.isCorrect === true).length

    function handleRemoveSingleQuiz(currentQuizId) {
        let pastQuizzes = JSON.parse(localStorage.getItem('savedQuizzes'))
        let newQuizzes = pastQuizzes.filter(quiz => quiz.id !== currentQuizId)
        localStorage.setItem('savedQuizzes', JSON.stringify(newQuizzes))
        setTrigger(Math.random())
    }

    function navigateToPastQuiz() {
        localStorage.setItem('currentResults', JSON.stringify(thisQuiz))
        navigate('/results')
    }

    return (
        <div className="landing-result">
            <div className="landing-result-left">
                <DeleteForeverIcon id="deleteResultId" onClick={() => handleRemoveSingleQuiz(thisQuiz.id)} />
                <h2>{thisQuiz.id}. {thisQuiz.type}</h2>
            </div>
            <div className="landing-result-right">
                <h4>Score: <span>{correctAnswers}<span>/</span>{thisQuiz.answers.length}</span></h4>
                <button onClick={() => navigateToPastQuiz()}>Review</button>
            </div>
        </div>
    )
}

export default Landing