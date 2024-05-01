import { useEventListener } from "../../../liveblocks.config";
import { ReactionEvent } from "@/types/type";

const useBroadcastListen = (setReactions: any) => {

  // useEventListener:- is used to listen to events broadcasted by other users.
  // https://liveblocks.io/docs/api-reference/liveblocks-react#useEventListener
  return useEventListener((eventData) => {

    const event = eventData.event as ReactionEvent;

    setReactions((reactions: any) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });
};

export default useBroadcastListen;
