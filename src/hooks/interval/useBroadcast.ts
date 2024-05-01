import { useBroadcastEvent } from "../../../liveblocks.config";
import { CursorMode } from "@/types/type";
import useInterval from "../useInterval";

// Broadcast the reaction to other users (every 100ms)
const useBroadcast = (cursor: any, cursorState: any, setReactions: any) => {

  // useBroadcastEvent is used to broadcast an event to all the other users in the room.
  // https://liveblocks.io/docs/api-reference/liveblocks-react#useBroadcastEvent

  const broadcast = useBroadcastEvent(); //📡📡📡

  return useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      
      // concat all the reactions created on mouse click
      setReactions((reactions: any) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );

      // 📡📡📡 Broadcast the reaction to other users 📡📡📡
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });

    }

  }, 50);
};

export default useBroadcast;
