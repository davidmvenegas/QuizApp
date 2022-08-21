import { useState, useContext, createContext } from 'react'
import { generalData, medicalData, programmingData } from './data'

export const useQuizContext = () => useContext(allQuizContext)
export const allQuizContext = createContext({})

export const QuizContextProvider = ({ children }) => {
    const [data, setData] = useState(generalData)
    const [currentQuizAnswers, setCurrentQuizAnswers] = useState([])
    const [currentQuizType, setCurrentQuizType] = useState('General Quiz')

    const allQuizValues = {
        generalData,
        medicalData,
        programmingData,
        data,
        setData,
        currentQuizAnswers,
        setCurrentQuizAnswers,
        currentQuizType,
        setCurrentQuizType,
    }

    return (
        <allQuizContext.Provider value={allQuizValues}>{children}</allQuizContext.Provider>
    )
}