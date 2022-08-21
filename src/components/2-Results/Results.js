import './results.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function Results() {
    const navigate = useNavigate()
    const currentResults = JSON.parse(localStorage.getItem('currentResults'))
    const answers = currentResults.answers
    const correctAnswers = answers.filter(item => item.isCorrect).length
    const passing = answers.length - correctAnswers < answers.length / 2

    function handleSubmit() {
        localStorage.removeItem('currentResults')
        navigate('/')
    }

    function handleGoHome() {
        if (passing) {
            localStorage.removeItem('currentResults')
            navigate('/')
        } else {
            let pastQuizzes = JSON.parse(localStorage.getItem('savedQuizzes'))
            let newQuizzes = pastQuizzes.filter(quiz => quiz.id !== currentResults.id)
            localStorage.setItem('savedQuizzes', JSON.stringify(newQuizzes))
            localStorage.removeItem('currentResults')
            navigate('/')
        }
    }

    function handleRetry() {
        let pastQuizzes = JSON.parse(localStorage.getItem('savedQuizzes'))
        let newQuizzes = pastQuizzes.filter(quiz => quiz.id !== currentResults.id)
        localStorage.setItem('savedQuizzes', JSON.stringify(newQuizzes))
        localStorage.removeItem('currentResults')
        navigate('/questionnaire')
    }

    return (
        <div className="results-container">
            <div className="results-wrapper">
                <div className="results-top-box">
                    <div className="results-top-text">
                        <div className="results-top-header">
                            <h1 id="return-home-type">{currentResults.type}</h1>
                            <div className="return-home-wrapper">
                                <HomeIcon id="returnHomeIcon" onClick={() => handleGoHome()} />
                            </div>
                        </div>
                        {passing ? <h1 id='results-message'>Congratulations you passed!</h1> : <h1 id='results-message'>Try Again, Quiz Failed</h1>}
                        <h2>YOUR SCORE</h2>
                        <h4><span style={passing ? null : {color: '#BE342A'}}>{correctAnswers}</span><span>/</span>{answers.length}</h4>
                    </div>
                    <div className="results-top-buttons">
                        <button disabled={!passing} style={passing ? null : {cursor: 'not-allowed'}} onClick={() => handleSubmit()}>SUBMIT</button>
                        <button onClick={() => handleRetry()}>RE-TRY</button>
                    </div>
                </div>
                <div className="results-bottom-box">
                    {answers.map(result => (
                        <ResultItem key={result.index} result={result}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ResultItem({result}) {
    const [open, setOpen] = useState(false)

    const handleStyleChoice = (idx) => {
        if (idx === result.correct || idx === result.choice) {
            return idx === result.correct ? {color: '#51AC56'} : {color: '#BE342A'}
        }
    }

    return (
        <div className="result-item">
            <div className="result-item-top">
                <h2>{result.question.question}</h2>
                <div className="result-item-more-wrapper" onClick={() => setOpen(!open)} style={result.isCorrect ? null : {backgroundColor: '#BE342A'}}>
                    {open ? <KeyboardArrowUpIcon id="result-item-more-icon" /> : <KeyboardArrowDownIcon id="result-item-more-icon"/>}
                </div>
            </div>
            <div className="result-item-bottom" style={!open ?  {display: "none"} : null}>
                <p style={handleStyleChoice("a")}><span>1.</span>{result.question.a}</p>
                <p style={handleStyleChoice("b")}><span>2.</span>{result.question.b}</p>
                <p style={handleStyleChoice("c")}><span>3.</span>{result.question.c}</p>
                <p style={handleStyleChoice("d")}><span>4.</span>{result.question.d}</p>
            </div>
        </div>
    )
}

export default Results