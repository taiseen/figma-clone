import { CursorMode } from "@/types/type";
import { useEffect } from "react";

const useKeyboardEvent = (
  setCursorState: any,
  updateMyPresence: any
) => {

  useEffect(() => {
    
    const onKeyUp = (e: KeyboardEvent) => {
      const keyPress = e.key;

      if (keyPress === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (keyPress === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (keyPress === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);
};

export default useKeyboardEvent;
