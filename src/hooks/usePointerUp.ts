import { CursorMode, CursorState } from "@/types/type";
import { useCallback } from "react";

const usePointerUp = (cursorState: any, setCursorState: any) => {

  return useCallback(() => {
    setCursorState((previousValue: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ? { ...previousValue, isPressed: false }
        : previousValue
    );
    
  }, [cursorState.mode, setCursorState]);
};

export default usePointerUp;
