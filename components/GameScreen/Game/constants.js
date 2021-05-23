export const CIRCLE = 'O';
export const CROSS = 'X';
export const EMPTY = '-';
export const DRAW = 'draw';
export const USER_FIGURE = CIRCLE;
export const AI_FIGURE = CROSS;

export const ROW_SIZE = 5;

export const VICTORY_CONDITIONS = [];
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

export const FIGURE_SIZE = 300 / ROW_SIZE;
export const STROKE_WIDTH = 24 / ROW_SIZE;
export const FIGURE_PADDING = 60 / ROW_SIZE;
