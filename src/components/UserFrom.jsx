import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState("")
  const { setName } = useContext(UserContext)

  function handleSubmit(e) {
    e.preventDefault()
    setName(inputName)
    window.history.pushState({}, '', '/quiz')
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  return (
    <>
        <h2>What's your name?</h2>
        <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        required
      />
      <button type="submit">Start Quiz</button>
    </form>
    </>
  );
}