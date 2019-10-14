import React, { /* useState */ } from 'react'

const GuessForm = ({ artists, submitGuess }) => {
  const generateButtons = (artists) => {
    return artists.map((artist) => {
      return (
        <button key={artist} onClick={() => submitGuess(artist)}>
          {artist}
        </button>
      )
    })
  }

  return (
    <div className="user-guess-form">
      {generateButtons(artists)}
    </div>
  )
}

export default GuessForm
