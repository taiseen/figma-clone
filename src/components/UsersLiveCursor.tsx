"use client";

import { useMyPresence, useOthers } from "../../liveblocks.config";
import { CursorMode, CursorState } from "@/types/type";
import { useState } from "react";

import useKeyboardEvent from "@/hooks/useKeyboardEvent";
import usePointerLeave from "@/hooks/usePointerLeave";
import usePointerMove from "@/hooks/usePointerMove";
import usePointerDown from "@/hooks/usePointerDown";
import LiveCursors from "./cursor/LiveCursors";

const UsersLiveCursor = () => {
  // useOthers returns the list of other users in the room.
  // useOthers: https://liveblocks.io/docs/api-reference/liveblocks-react#useOthers
  const others = useOthers();

  // useMyPresence returns the presence of the current user in the room.
  // It also returns a function to update the presence of the current user.
  // useMyPresence: https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  // track the state of the cursor (hidden, chat, reaction, reaction selector)
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  // Listen to keyboard events to change the cursor state
  useKeyboardEvent(setCursorState, updateMyPresence);

  // Listen to mouse events to change the cursor state
  const handlePointerMove = usePointerMove(updateMyPresence);

  // Hide the cursor when the mouse leaves the canvas
  const handlePointerLeave = usePointerLeave(setCursorState, updateMyPresence);

  // Show the cursor when the mouse enters the canvas
  const handlePointerDown = usePointerDown(
    updateMyPresence,
    setCursorState,
    cursorState
  );

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="h-screen border border-green-400"
    >
      <h2 className="text-4xl text-white leading-relaxed">Testing</h2>

      {/* Show the live cursors of other users */}
      <LiveCursors others={others} />
    </div>
  );
};

export default UsersLiveCursor;
