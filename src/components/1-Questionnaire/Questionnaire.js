import { useEffect, useState } from 'react'
import { useQuizContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import './questionnaire.css'

function Questionnaire() {
    const navigate = useNavigate()
    const { data, setCurrentQuizAnswers, currentQuizType } = useQuizContext()
    const [currentQuestion, setCurrentQuestion] = useState(data[0])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [transition, setTransition] = useState(false)
    const [restrained, setRestrained] = useState(false)
    const [trigger, setTrigger] = useState()
    const percentage = (100 * currentIndex) / data.length

    function saveAnswer(choice) {
        let pastAnswers = JSON.parse(localStorage.getItem('currentQuizAnswers'))
        let nextAnswer = {
            index: currentIndex + 1,
            question: currentQuestion,
            choice: choice,
            correct: currentQuestion.correct,
            isCorrect: choice === currentQuestion.correct,
        }
        if (pastAnswers !== null) {
            localStorage.setItem('currentQuizAnswers', JSON.stringify([...pastAnswers, nextAnswer]))
        } else {
            localStorage.setItem('currentQuizAnswers', JSON.stringify([nextAnswer]))
        }
        localStorage.setItem('currentIndex', JSON.stringify(currentIndex + 1))
        setTrigger(Math.random())
    }

    function saveQuiz() {
        let pastQuizzes = JSON.parse(localStorage.getItem('savedQuizzes'))
        let quizAnswers = JSON.parse(localStorage.getItem('currentQuizAnswers'))
        let nextQuizId = pastQuizzes !== null ? pastQuizzes.length + 1 : 1
        let nextQuiz = {
            id: nextQuizId,
            type: currentQuizType,
            answers: quizAnswers
        }
        if (pastQuizzes !== null) {
            localStorage.setItem('savedQuizzes', JSON.stringify([...pastQuizzes, nextQuiz]))
        } else {
            localStorage.setItem('savedQuizzes', JSON.stringify([nextQuiz]))
        }
        localStorage.setItem('currentResults', JSON.stringify(nextQuiz))
    }

    useEffect(() => {
        if (currentIndex < data.length) setCurrentQuestion(data[currentIndex])
    }, [data, currentIndex])

    useEffect(() => {
        const quizAnswers = localStorage.getItem('currentQuizAnswers')
        if (quizAnswers !== null) setCurrentQuizAnswers(JSON.parse(quizAnswers))
    }, [setCurrentQuizAnswers, currentIndex])

    useEffect(() => {
        const index = localStorage.getItem('currentIndex')
        if (index !== null) setCurrentIndex(JSON.parse(index))
    }, [trigger])

    useEffect(() => {
        if (currentIndex === data.length) {
            setRestrained(true)
            saveQuiz()
            localStorage.removeItem('currentIndex')
            localStorage.removeItem('currentQuizAnswers')
            setTimeout(() => setTransition(true), 500) 
            setTimeout(() => navigate('/results'), 1000)
        }
    // eslint-disable-next-line
    }, [currentIndex])

    return (
        <div className="quest-container">
            <div className="quest-wrapper" style={transition ? {marginRight: '100vw', opacity: '0'} : null}>
                <div className="nav-container">
                    <div className="nav-text">
                        <h1>Question {(currentIndex < data.length ? currentIndex + 1 : data.length)} of {data.length}</h1>
                    </div>
                    <div className="nav-progress" style={{width: `${percentage}%`}}></div>
                </div>
                <div className="question-box">
                    <div className="question-top">
                        <h1>{currentQuestion?.question}</h1>
                    </div>
                    <div className="question-bottom">
                        <div className="question-bottom-text">
                            <h1>Choose the answer:</h1>
                        </div>
                        <div className="question-bottom-box" style={restrained ? {cursor: 'not-allowed'} : null}>
                            <div className="question-wrapper" id="question-one" onClick={() => saveAnswer('a')} style={restrained ? {pointerEvents: 'none'} : null}>
                                <h4>1</h4>
                                <h2>{currentQuestion?.a}</h2>
                            </div>
                            <div className="question-wrapper" id="question-two" onClick={() => saveAnswer('b')} style={restrained ? {pointerEvents: 'none'} : null}>
                                <h4>2</h4>
                                <h2>{currentQuestion?.b}</h2>
                            </div>
                            <div className="question-wrapper" id="question-three" onClick={() => saveAnswer('c')} style={restrained ? {pointerEvents: 'none'} : null}>
                                <h4>3</h4>
                                <h2>{currentQuestion?.c}</h2>
                            </div>
                            <div className="question-wrapper" id="question-four" onClick={() => saveAnswer('d')} style={restrained ? {pointerEvents: 'none'} : null}>
                                <h4>4</h4>
                                <h2>{currentQuestion?.d}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questionnaire