import { CursorMode } from "@/types/type";
import { useCallback } from "react";

const usePointerMove = (cursor: any, cursorState: any, updateMyPresence: any) => {
  
  return useCallback((event: React.PointerEvent) => {
    
    event.preventDefault();
    // console.log("Pointer Move");

    // if cursor is not in reaction selector mode, update the cursor position
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      
      // 🗼🗼🗼 broadcast the cursor position to other users
      updateMyPresence({ cursor: { x, y } });
    }

  }, []);
};

export default usePointerMove;
