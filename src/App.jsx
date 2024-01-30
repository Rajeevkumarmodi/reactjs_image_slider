import { useEffect, useState } from "react";
import "./App.css";
import imgData from "./imageData";
import right_arrow from "./assets/right_arrow.png";
import left_arrow from "./assets/left_arrow.png";

function App() {
  const [currentVal, setCurrentVal] = useState(0);
  const [slideTime, setSlideTime] = useState(3000);

  useEffect(() => {
    const intervalId = setInterval(() => handelCarousel(-1), slideTime);
    // clear interval
    return () => clearInterval(intervalId);
  }, [currentVal, slideTime]);

  function handelCarousel(val) {
    if (val == -1) {
      if (currentVal / 100 >= imgData.length - 1) {
        setCurrentVal(0);
      } else {
        setCurrentVal(currentVal + 100);
      }
    } else {
      if (currentVal / 100 <= 0) {
        setCurrentVal((imgData.length - 1) * 100);
      } else {
        setCurrentVal(currentVal - 100);
      }
    }
  }

  return (
    <div>
      <div>
        <h3 className="hading">Image Slider</h3>
        <div className="slideTime">
          <h3>Set slide time</h3>
          <input
            onChange={(e) => setSlideTime(e.target.value)}
            type="range"
            name=""
            max={10000}
            min={1000}
            value={slideTime}
            id=""
          />
        </div>
      </div>
      <div className="imageBox">
        <div className="arrows">
          <img
            onClick={() => handelCarousel(1)}
            className="leftArrow"
            src={left_arrow}
            alt="left arrow"
          />
          <img
            onClick={() => handelCarousel(-1)}
            className="rightArrow"
            src={right_arrow}
            alt="right arrow"
          />
        </div>
        <div
          className="images"
          style={{
            transform: `translateX(-${currentVal}%`,
          }}
        >
          {imgData.map((img, index) => {
            return (
              <img className="slideImage" key={index} src={img} alt={img} />
            );
          })}
        </div>
        <div className="dots">
          {imgData.map((_, i) => (
            <div
              key={i}
              className={`${currentVal / 100 === i && "activeDot"}`}
              onClick={() => setCurrentVal(i * 100)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
