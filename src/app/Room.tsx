"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "../../liveblocks.config";
import { ReactNode } from "react";

export function Room({ children }: { children: ReactNode }) {
  const loading = (
    <div className="text-center text-5xl h-screen w-full grid place-items-center text-orange-400">
      Loading…
    </div>
  );

  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      <ClientSideSuspense fallback={loading}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
