"use client";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

;
import { columns } from "@/module/agents/ui/column";
import { DataTable } from "@/module/agents/ui/data-table";
import EmptyState from "@/components/empty-state";

function AgentView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div className="md-px-8 flex flex-1 flex-col gap-y-4 px-4 pb-4">
      <DataTable columns={columns} data={data} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create a agent to join your mettings , each agent will will follow you instructions and can interact with participant during the call"
        />
      )}
    </div>
  );
}

export default AgentView;

export const AgentsViewLoadingState = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Thsi may take a few seconds"
    />
  );
};

export const AgentsViewErrorState = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};




