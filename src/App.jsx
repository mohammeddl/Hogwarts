import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import UserFrom from './components/UserFrom'
import Question from './components/Question'
import Results from './components/Results'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './components/UserContext'
import { useEffect } from 'react'
import UserForm from './components/UserFrom'


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

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  function fetchArtwork(keyword) {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.total > 0) {
          const firstArtworkId = data.objectIDs[0];
          return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${firstArtworkId}`);
        }
        throw new Error("No artwork found");
      })
      .then((response) => response.json())
      .then((artworkData) => setArtwork(artworkData))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);
  return (
    <>
     <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
    </>
  )
}

export default App
