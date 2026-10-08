export const COLORS = [
  "#000000",
  "#1D2B53",
  "#7E2553",
  "#008751",
  "#AB5236",
  "#5F574F",
  "#C2C3C7",
  "#FFF1E8",
  "#FF004D",
  "#FFA300",
  "#FFEC27",
  "#00E436",
  "#29ADFF",
  "#83769C",
  "#FF77A8",
  "#FFCCAA",
];

export const BOARD_COUNT = 16;
export const SQUARES_PER_BOARD = 256;

export type Color = (typeof COLORS)[number];
export type BoardState = Record<number, string>; // { squareId: color }
export type BoardsState = Record<number, BoardState>; // { boardId: { squareId: color } }
