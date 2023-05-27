import React, { useState, createContext, useRef, useEffect } from "react";
import "./App.css";
import sunIcon from "./sun.svg";
import moonIcon from "./moon.svg";
import Tile from "./Tile";
import data from "./data.json";
import itachiImage from "./pfp.jpg"; // Import the image

const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const titleRef = useRef(null);
  const [imageSize, setImageSize] = useState(0);
  const [areTilesVisible, setAreTilesVisible] = useState(true);

  useEffect(() => {
    if (titleRef.current) {
      const titleHeight = titleRef.current.offsetHeight;
      setImageSize(titleHeight);
    }
  }, []);

  const handleTitleClick = () => {
    setAreTilesVisible(false); // Hide the tiles
    setTimeout(() => setAreTilesVisible(true), 600); // Show the tiles after 2 seconds
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const imageStyle = {
    height: `${imageSize}px`,
    width: `${imageSize}px`,
    marginRight: "10px", // Add margin to create space between image and text
  };

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={`App ${isDarkMode ? "dark" : "light"}`}>
        <header className="header">
          <div className="title">
            <img className="portrait" src={itachiImage} alt="Portrait" style={imageStyle} />
            <span ref={titleRef} onClick={handleTitleClick}>Tejas Kothari</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            <img src={isDarkMode ? moonIcon : sunIcon} alt="Theme toggle" />
          </button>
        </header>
        <div className={`tile-container ${areTilesVisible ? "" : "fade-out"}`}>
          {data.tiles.map((tile, index) => (
            <Tile
              key={index}
              tileName={tile.tileName}
              content={tile.content}
              isSquare={tile.isSquare}
              color={tile.color}
            />
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
export { ThemeContext };
