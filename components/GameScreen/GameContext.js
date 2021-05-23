import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createContext } from 'react';

const getState = (ROW_SIZE = 3) => ({
  ROW_SIZE,
  VICTORY_CONDITIONS: (() => {
    const VICTORY_CONDITIONS = [];
    // horizontals
    [...new Array(ROW_SIZE)].forEach((_, index) => {
      const victodyCondition = [];
      for (let i = ROW_SIZE * index; i < ROW_SIZE * index + ROW_SIZE; i++) {
        victodyCondition.push(i);
      }
      VICTORY_CONDITIONS.push(victodyCondition);
    });
    // verticals
    [...new Array(ROW_SIZE)].forEach((_, index) => {
      const victodyCondition = [];
      for (let i = index; i < ROW_SIZE * ROW_SIZE + index; i += ROW_SIZE) {
        victodyCondition.push(i);
      }
      VICTORY_CONDITIONS.push(victodyCondition);
    });
    return VICTORY_CONDITIONS;
  })(),
  FIGURE_SIZE: 300 / ROW_SIZE,
  STROKE_WIDTH: 24 / ROW_SIZE,
  FIGURE_PADDING: 60 / ROW_SIZE,
});

export const GameContext = createContext(getState(3));

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(getState(3));
  const callbackRef = useRef(() => {});

  const handleChangeRowSize = useCallback(
    (rowSize = 3, callback = () => {}) => {
      callbackRef.current = callback;
      setState(getState(rowSize));
    },
    [],
  );

  useEffect(() => {
    callbackRef.current();
  }, [state]);

  return (
    <GameContext.Provider
      value={{ ...state, onChangeRowSize: handleChangeRowSize }}>
      {children}
    </GameContext.Provider>
  );
};
