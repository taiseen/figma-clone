import { CursorMode, CursorState } from "@/types/type";
import { useCallback } from "react";

const usePointerDown = (
  updateMyPresence: any,
  setCursorState: any,
  cursorState: any
) => {

  return useCallback(
    (event: React.PointerEvent) => {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });

      // if cursor is in reaction mode, set isPressed to true
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },

    [cursorState.mode, setCursorState]
  );
};

export default usePointerDown;
