"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentDialog from "./new-agent-dialog";
import { useAgentFilters } from "../hooks/use-agents-filte";
import AgentSearchFilter from "./agent-search-filter";

function AgentListHeader() {
  const [open, setOpen] = useState(false);
  const [filter, setFilters] = useAgentFilters();
  const isFilterModified = !!filter.search;
  const onClearFilter = () => {
    setFilters({
      search: "",
      page: 1,
    });
  };
  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="felx flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">My Agents</h2>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon /> New Agent
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-x-2">
          <AgentSearchFilter />
          {isFilterModified  && <Button variant={"outline"} onClick={onClearFilter}>
            <XCircleIcon />
            Clear
          </Button>}
        </div>
      </div>
    </>
  );
}

export default AgentListHeader;
