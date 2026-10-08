import { SQUARES_PER_BOARD, type BoardState } from "../types";

type Props = {
  boardId: number;
  cells: BoardState;
  onCellClick: (boardId: number, squareId: number) => void;
};

export function Board({ boardId, cells, onCellClick }: Props) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px" }}>Board {boardId + 1}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(16, 20px)",
          gridTemplateRows: "repeat(16, 20px)",
        }}
      >
        {Array.from({ length: SQUARES_PER_BOARD }, (_, squareId) => (
          <button
            key={squareId}
            onClick={() => onCellClick(boardId, squareId)}
            style={{
              background: cells[squareId] ?? "#FFF1E8",
              border: "1px solid #999",
              borderRadius: 6,
              cursor: "pointer",
            }}
            aria-label={`Board ${boardId + 1}, square ${squareId + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
