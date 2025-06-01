"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashBoardCommand from "./dashboard-command";

function DashBoardNavBar() {
  const { open, toggleSidebar } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false);
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setCommandOpen((open) => !open);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);
  return (
      <>
          <DashBoardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="bg-muted flex h-20 gap-4 border-b border-gray-400 py-6 px-4">
        <Button variant={"outline"} onClick={toggleSidebar}>
          {open ? <PanelLeftCloseIcon /> : <PanelLeftIcon />}
        </Button>
        <Button
          onClick={() => {
            setCommandOpen((open) => !open);
          }}
          className="text-muted-foreground hover:text-muted-foreground h-9 w-[240px] justify-start font-normal"
          variant={"outline"}
          size={"sm"}
        >
          <div className="flex items-center justify-center gap-1">
            <SearchIcon />
            <h2>search</h2>
          </div>
          <kbd className="bg-mutedm text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}

export default DashBoardNavBar;
