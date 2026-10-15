import { COLORS, type Color } from "../types";
import styles from "./ColorPicker.module.css";

type Props = {
  selected: Color;
  onChange: (color: Color) => void;
};

export function ColorPicker({ selected, onChange }: Props) {
  return (
    <div className={styles.picker}>
      {COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`${styles.swatch} ${selected === c ? styles.selected : ""}`}
          style={{ background: c }}
          aria-label={`Select color ${c}`}
        />
      ))}
    </div>
  );
}
