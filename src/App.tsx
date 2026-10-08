import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import { Board } from "./components/Board";
import { ColorPicker } from "./components/ColorPicker";
import { COLORS, BOARD_COUNT, type Color, type BoardsState } from "./types";

export default function App() {
  const [boards, setBoards] = useState<BoardsState>({});
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    let active = true;

    async function loadInitial() {
      const PAGE = 1000;
      const all: { board_id: number; square_id: number; color: string }[] = [];

      for (let from = 0; ; from += PAGE) {
        const { data, error } = await supabase
          .from("grid_squares")
          .select("board_id, square_id, color")
          .order("board_id", { ascending: true })
          .order("square_id", { ascending: true })
          .range(from, from + PAGE - 1);

        if (error) {
          console.error("Fetch error:", error);
          return;
        }
        if (!data || data.length === 0) break;
        all.push(...data);
        if (data.length < PAGE) break;
      }

      if (!active) return;

      const grouped: BoardsState = {};
      for (const row of all) {
        if (!grouped[row.board_id]) grouped[row.board_id] = {};
        grouped[row.board_id][row.square_id] = row.color;
      }
      setBoards(grouped);
      setLoading(false);
    }

    loadInitial();

    // Realtime subscription
    const channel = supabase
      .channel("grid-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "grid_squares" },
        (payload) => {
          console.log("Realtime:", payload.new);
          const row = payload.new as {
            board_id: number;
            square_id: number;
            color: string;
          };
          setBoards((prev) => ({
            ...prev,
            [row.board_id]: {
              ...prev[row.board_id],
              [row.square_id]: row.color,
            },
          }));
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleSquareClick(boardId: number, squareId: number) {
    const previousColor = boards[boardId]?.[squareId];

    setBoards((prev) => ({
      ...prev,
      [boardId]: { ...prev[boardId], [squareId]: selectedColor },
    }));

    const { error } = await supabase
      .from("grid_squares")
      .update({ color: selectedColor, updated_at: new Date().toISOString() })
      .eq("board_id", boardId)
      .eq("square_id", squareId);

    if (error) {
      console.error("Update failed:", error);
      setBoards((prev) => ({
        ...prev,
        [boardId]: { ...prev[boardId], [squareId]: previousColor },
      }));
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading boards...</p>;

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Shared Boards</h1>

      <ColorPicker selected={selectedColor} onChange={setSelectedColor} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {Array.from({ length: BOARD_COUNT }, (_, boardId) => (
          <Board
            key={boardId}
            boardId={boardId}
            cells={boards[boardId] ?? {}}
            onCellClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  );
}
