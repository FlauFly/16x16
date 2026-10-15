import { SQUARES_PER_BOARD, type BoardState } from "../types";
import styles from "./Board.module.css";

type Props = {
  boardId: number;
  cells: BoardState;
  onCellClick: (boardId: number, squareId: number) => void;
};

export function Board({ boardId, cells, onCellClick }: Props) {
  return (
    <div>
      <h3>Board {boardId + 1}</h3>
      <div className={styles.grid}>
        {Array.from({ length: SQUARES_PER_BOARD }, (_, squareId) => (
          <button
            key={squareId}
            onClick={() => onCellClick(boardId, squareId)}
            className={styles.cell}
            style={{ background: cells[squareId] ?? "#FFF1E8" }}
            aria-label={`Board ${boardId + 1}, square ${squareId + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
