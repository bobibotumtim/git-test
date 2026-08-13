import { useEffect, useState } from "react";

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

function WindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="window-size" aria-live="polite">
      <div>
        <span>Width</span>
        <strong>{windowSize.width}px</strong>
      </div>
      <span className="window-size__separator">×</span>
      <div>
        <span>Height</span>
        <strong>{windowSize.height}px</strong>
      </div>
    </div>
  );
}

export default WindowSize;
