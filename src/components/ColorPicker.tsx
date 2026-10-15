import { COLORS, type Color } from "../types";

type Props = {
  selected: Color;
  onChange: (color: Color) => void;
};

export function ColorPicker({ selected, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20,
      }}
    >
      {COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={{
            width: 40,
            height: 40,
            background: c,
            border: selected === c ? "3px solid #ccc" : "2px solid #000",
            borderRadius: 8,
            cursor: "pointer",
          }}
          aria-label={`Select color ${c}`}
        />
      ))}
    </div>
  );
}
