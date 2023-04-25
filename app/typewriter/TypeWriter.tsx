'use client'

import React, {useState, useEffect, useRef} from 'react'

interface TypeWriterProps{
    text: string | null,
    interKeyStrokeDurationInMs: number
}

const TypeWriter: React.FC<TypeWriterProps> = ({
    text,
    interKeyStrokeDurationInMs
}) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const currentPositionRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval");
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;
      if (currentPositionRef.current > text!.length) {
        clearInterval(intervalId);
      }
    }, interKeyStrokeDurationInMs);
    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [interKeyStrokeDurationInMs, text]);

  return (
    <p>{text!.substring(0, currentPosition)}</p>  
  );

}
export default TypeWriter;