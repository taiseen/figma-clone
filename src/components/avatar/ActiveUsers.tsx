"use client";

import { useOthers, useSelf } from "../../../liveblocks.config";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";
import Avatar from "./Avatar";

const ActiveUsers = () => {
  // useOthers returns the list of other users in the room.
  // https://liveblocks.io/docs/api-reference/liveblocks-react#useOthers
  const others = useOthers();

  // useSelf returns the current user details in the room
  // https://liveblocks.io/docs/api-reference/liveblocks-react#useSelf
  const currentUser = useSelf();

  // memoize the result of this function so that it doesn't change on every render
  // but only when there are new users joining the room
  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className="flex items-center justify-center gap-1">
        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] border-primary-green" />
        )}

        {
          // slice user
          others.slice(0, 2).map(({ connectionId }) => (
            <Avatar
              key={connectionId}
              otherStyles="-ml-3"
              name={generateRandomName()}
            />
          ))
        }

        {hasMoreUsers && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
            +{others.length - 2}
          </div>
        )}
      </div>
    );
  }, [others.length]);

  return memoizedUsers;
};

export default ActiveUsers;
