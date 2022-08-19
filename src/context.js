import { useState, useContext, createContext } from 'react'

export const useQuizContext = () => useContext(allQuizContext)
export const allQuizContext = createContext({})

export const QuizContextProvider = ({ children }) => {
    const [input, setInput] = useState('fsdf')

    const allQuizValues = {
        input,
        setInput,
    }

    return (
        <allQuizContext.Provider value={allQuizValues}>{children}</allQuizContext.Provider>
    )
}