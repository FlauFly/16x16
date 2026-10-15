import { SQUARES_PER_BOARD, type BoardState } from "../types";

type Props = {
  boardId: number;
  cells: BoardState;
};

export function Picture({ boardId, cells }: Props) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(16, 4px)",
          gridTemplateRows: "repeat(16, 4px)",
        }}
      >
        {Array.from({ length: SQUARES_PER_BOARD }, (_, squareId) => (
          <span
            key={squareId}
            style={{
              background: cells[squareId] ?? "#FFF1E8",
              width: "4px",
              height: "4px",
            }}
            aria-label={`Board ${boardId + 1}, square ${squareId + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
