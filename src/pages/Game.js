import React, { useState, useEffect, useCallback } from "react";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }) {
    const [score, setScore] = useState(1);
    const MAX_SECONDS = 50;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const [currentCharacter, setCurrentCharacter] = useState('');

    const [ms, setMs] = useState(0);
    const [seconds, setSeconds] = useState(MAX_SECONDS);

    useEffect(() => {
        setRandomCharacter();
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => clearInterval(interval);
    }, []);

    const updateTime = startTime => {
        const endTime = new Date();
        const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
        const formattedMSStr = ("0000" + msPassedStr).slice(-5);
        // 00000 = first 2 nums are the seconds, last 3 are the ms that have passed

        const updatedSeconds =
        MAX_SECONDS - parseInt(formattedMSStr.substring(0, 2)) - 1;
        const updatedMS =
        1000 - parseInt(formattedMSStr.substring(formattedMSStr.length - 3));

        setSeconds(addLeadingZeros(updatedSeconds, 2));

        setMs(addLeadingZeros(updatedMS, 3));
    };

    const addLeadingZeros = (num, length) => {
        let zeros = "";
        for (let i = 0; i < length; i++) {
        zeros += "0";
        }
        return (zeros + num).slice(-length);
    };

    useEffect(() => {
        if (seconds <= -1) {
        history.push("/gameOver");
        }
    }, [seconds, ms, history]);


    const keyUpHandler = useCallback((e) => {
        console.log(e.key, currentCharacter);
        if(e.key === currentCharacter) {
            setScore((prevScore) => prevScore + 1)
        }
        else {
            if(score > 0){
                setScore((prevScore) => prevScore - 1);
            }
        }
        setRandomCharacter();
    }, [currentCharacter]);

    useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
        document.removeEventListener("keyup", keyUpHandler);
    };
    }, [keyUpHandler]);

    const setRandomCharacter = () => {
        const randomInt = Math.floor(Math.random() * 36);
        setCurrentCharacter(characters[randomInt]);
    }

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
