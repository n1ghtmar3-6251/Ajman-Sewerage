import React, { useState } from "react";

const ArabicTextToSpeech: React.FC = () => {
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-IR";
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Speak</button>
    </div>
  );
};

export default ArabicTextToSpeech;
