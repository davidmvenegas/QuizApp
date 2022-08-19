import { useNavigate } from 'react-router-dom'
import './landing.css'

function Landing() {
    let navigate = useNavigate()

    return (
        <div className="landing-container">
            <div className="backgroundSquare"></div>
            <div className="backgroundCircle"></div>
            <div className="landing-options-container">
                <button className="landing-start-btn" onClick={() => navigate('/questionnaire')}>Start Quiz</button>
            </div>
        </div>
    )
}

export default Landing