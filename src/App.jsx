import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import UserFrom from './components/UserFrom'
import Question from './components/Question'

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
];
const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};
const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  // Continue mapping all your possible options to a keyword
};
function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);
  return (
    <>
    <Header />
    <UserFrom />
    <Question question={questions} options={questions[0].options} onAnswer={(answer)} />
    </>
  )
}

export default App
