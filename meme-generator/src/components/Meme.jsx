import { useEffect, useState } from "react";

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

  const [allMemeData, setAllMemeData] = useState([]);

  function handleGetMemeClick() {
    var randomIndex = getRandomInt(0, allMemeData.length);
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: allMemeData[randomIndex].url
    }))
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeData(data.data.memes))
  }, [])

  return (
    <div className="meme">
      <div className="meme--inputs">
        <input
          type="input"
          name="topText"
          placeholder="Enter the top text."
          onChange={handleChange}
          value={meme.topText} />
        <input
          type="input"
          name="bottomText"
          placeholder="Enter the bottom text."
          onChange={handleChange}
          value={meme.bottomText} />
      </div>
      <button onClick={handleGetMemeClick}>Get a new meme image</button>
      <div className="meme--container">
        <img className="meme--image" src={meme.randomImage} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  )
}