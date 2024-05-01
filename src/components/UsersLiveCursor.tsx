"use client";

import { useMyPresence, useOthers } from "../../liveblocks.config";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import { useCallback, useState } from "react";

import useRemoveReactions from "@/hooks/interval/useRemoveReactions";
import useBroadcastListen from "@/hooks/interval/useBroadcastListen";
import ReactionSelector from "./reaction/ReactionButton";
import useBroadcast from "@/hooks/interval/useBroadcast";
import useKeyboardEvent from "@/hooks/useKeyboardEvent";
import FlyingReaction from "./reaction/FlyingReaction";
import usePointerLeave from "@/hooks/usePointerLeave";
import usePointerMove from "@/hooks/usePointerMove";
import usePointerDown from "@/hooks/usePointerDown";
import usePointerUp from "@/hooks/usePointerUp";
import LiveCursors from "./cursor/LiveCursors";
import CursorChat from "./cursor/CursorChat";

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

  // store the reactions created on mouse click
  const [reactions, setReactions] = useState<Reaction[]>([]);

  // set the reaction of the cursor
  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Listen to keyboard events to change the cursor state
  useKeyboardEvent(setCursorState, updateMyPresence);

  // 📡 Broadcast the reaction to other users (every 100ms)
  useBroadcast(cursor, cursorState, setReactions);

  // 👂 This hook is to listen || received the events by broadcasted from other users.
  useBroadcastListen(setReactions);

  // Remove reactions that are not visible anymore (every 1 sec)
  useRemoveReactions(setReactions);

  // Listen to mouse events to change the cursor state
  const handlePointerMove = usePointerMove(cursor, cursorState, updateMyPresence);

  // Hide the cursor when the mouse leaves the canvas
  const handlePointerLeave = usePointerLeave(setCursorState, updateMyPresence);

  // Show the cursor when the mouse enters the canvas
  const handlePointerDown = usePointerDown(updateMyPresence, cursorState, setCursorState);

  // hide the cursor when the mouse is up
  const handlePointerUp = usePointerUp(cursorState, setCursorState);

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="h-screen border border-green-400"
    >
      <h2 className="text-4xl text-white leading-relaxed">Testing</h2>

      {
        // 🔃❄️🔃 Render the reaction animations...
        reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            timestamp={reaction.timestamp}
            value={reaction.value}
            x={reaction.point.x}
            y={reaction.point.y}
          />
        ))
      }

      {
        // 🗨️🗨️🗨️ If cursor is in chat mode,
        // show the chat cursor
        cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )
      }

      {
        // 🤩😯🤩 If cursor is in reaction selector mode,
        // show the reaction selector
        cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector setReaction={(reaction) => setReaction(reaction)} />
        )
      }

      {/* Show the live cursors of other users */}
      <LiveCursors others={others} />
    </div>
  );
};

export default UsersLiveCursor;
