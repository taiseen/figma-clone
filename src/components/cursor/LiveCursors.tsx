import { LiveCursorProps } from "@/types/type";
import { COLORS } from "@/constants";
import Cursor from "./Cursor";

// display all other live cursors
const LiveCursors = ({ others }: LiveCursorProps) => {
  
  // map all other users, to showing a cursor for each new user...
  return others.map(({ connectionId, presence }) => {
    if (presence == null || !presence?.cursor) return null;

    return (
      <Cursor
        key={connectionId}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
        color={
          // get a radom color, based on connection id
          COLORS[Number(connectionId) % COLORS.length]
        }
      />
    );
  });
};

export default LiveCursors;
