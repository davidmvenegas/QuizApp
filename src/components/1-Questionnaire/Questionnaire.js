import { useQuizContext } from '../../context'
import './questionnaire.css'

function Questionnaire() {
    const { input } = useQuizContext()

    console.log(input)

    return (
        <div className='quest-container'>

            <div className="nav-container">
                <div className="nav-text">
                    <h1>Question 1 of 8</h1>
                </div>
                <div className="nav-progress"></div>
            </div>


            <div className="question-box">
                <div className="question-top">
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
                </div>
                <div className="question-bottom">
                    <div className="question-bottom-text">
                        <h1>Choose the correct term</h1>
                    </div>
                    <div className="question-bottom-box">
                        <div className="question-wrapper" id="question-one">
                            <h2>QUESTION ONE</h2>
                        </div>
                        <div className="question-wrapper" id="question-two">
                            <h2>QUESTION TWO</h2>
                        </div>
                        <div className="question-wrapper" id="question-three">
                            <h2>QUESTION THREE</h2>
                        </div>
                        <div className="question-wrapper" id="question-four">
                            <h2>QUESTION FOUR</h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Questionnaire