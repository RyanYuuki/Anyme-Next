import { useState } from "react";

// Predefined color array
const colorsArray = [
  '#fff',
  "#ffbade",
  "#86e3ce",
  "#d8b2ab",
  "#abccd8",
  "#ccabda",
];

const useGenerateRandomColor = () => {
  const [lastColor, setLastColor] = useState(null);

  const generateColor = () => {
    let newColor;
    do {
      newColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
    } while (newColor === lastColor);

    // Update the last color
    setLastColor(newColor);

    return newColor;
  };

  return { generateColor };
};

export default useGenerateRandomColor;
