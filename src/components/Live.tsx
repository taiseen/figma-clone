import { useOthers } from "../../liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";

const Live = () => {

    // useOthers returns the list of other users in the room.
  // useOthers: https://liveblocks.io/docs/api-reference/liveblocks-react#useOthers
  const others = useOthers();

  return (
    <div>
      {/* Show the live cursors of other users */}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
