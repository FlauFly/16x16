import { SQUARES_PER_BOARD, type BoardState } from "../types";
import styles from "./Picture.module.css";

type Props = {
  boardId: number;
  cells: BoardState;
};

export function Picture({ boardId, cells }: Props) {
  return (
    <div>
      <div className={styles.picture}>
        {Array.from({ length: SQUARES_PER_BOARD }, (_, squareId) => (
          <span
            key={squareId}
            className={styles.cell}
            style={{ background: cells[squareId] ?? "#FFF1E8" }}
            aria-label={`Board ${boardId + 1}, square ${squareId + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
