import { CursorMode } from "@/types/type";
import { useCallback } from "react";

const usePointerLeave = (setCursorState: any, updateMyPresence: any) => {
  return useCallback(() => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);
};

export default usePointerLeave;
