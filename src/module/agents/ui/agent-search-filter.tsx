import React from "react";
import { useAgentFilters } from "../hooks/use-agents-filte";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

function AgentSearchFilter() {
  const [filters, setFilters] = useAgentFilters();
  return (
    <div className="relative">
      <Input
        value={filters.search}
        placeholder="Filter by name"
        onChange={(e) => setFilters({ search: e.target.value })}
        className="h-9 w-[200px] bg-white pl-7"
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
}

export default AgentSearchFilter;
