import { useEffect, useState } from "react";
import "./TextTypingBox.scss";

export interface TextTypingBoxProps {
  text: string;
}

const TextTypingBox = (props: TextTypingBoxProps) => {
  const [typingResult, setTypingResult] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingResult(props.text.substring(0, typingIndex));
      setTypingIndex(typingIndex + 1);

      if (typingIndex === props.text.length + 1) {
        setTypingResult("");
        setTypingIndex(0);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  });

  return (
    <div className="typing_area">
      <span className="typing_result">{typingResult}</span>
      <span className="typing_cursor">|</span>
    </div>
  );
};

export default TextTypingBox;
