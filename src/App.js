import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./components/0-Landing/Landing"
import Questionnaire from "./components/1-Questionnaire/Questionnaire"
import Results from "./components/2-Results/Results"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App