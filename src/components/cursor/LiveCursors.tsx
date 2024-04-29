import { LiveCursorProps } from "@/types/type";
import { COLORS } from "@/constants";
import Cursor from "./Cursor";

// display all other live cursors
const LiveCursors = ({ others }: LiveCursorProps) => {

  return others.map(({ connectionId, presence }) => {
    
    if (presence == null || !presence?.cursor) {
      return null;
    }

    return (
      <Cursor
        key={connectionId}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
        color={COLORS[Number(connectionId) % COLORS.length]}
      />
    );
  });
};

export default LiveCursors;
