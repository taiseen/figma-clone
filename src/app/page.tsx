"use client";

import Navbar from "@/components/Navbar";
import UsersLiveCursor from "@/components/UsersLiveCursor";

export default function Page() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />

      <section className="flex h-full flex-row">
        <UsersLiveCursor />
      </section>
    </main>
  );
}
