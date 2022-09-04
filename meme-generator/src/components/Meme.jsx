import { useState } from "react";
import memeData from "../assets/memeData"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function Meme() {

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: ""
  })

  const [allMemeData, setAllMemeData] = useState(memeData);

  function handleGetMemeClick() {
    var randomIndex = getRandomInt(0, allMemeData.data.memes.length);
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: allMemeData.data.memes[randomIndex].url
    }))
  }

  return (
    <div className="meme">
      <div className="meme--inputs">
        <input type="input" name="topText" placeholder="Enter the top text." />
        <input type="input" name="bottomText" placeholder="Enter the bottom text." />
      </div>
      <button onClick={handleGetMemeClick}>Get a new meme image</button>
      <img className="meme--image" src={meme.randomImage} />
    </div>
  )
}