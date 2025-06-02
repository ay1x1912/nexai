import { auth } from "@/lib/auth";
import AgentView from "@/module/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AgentView />
    </HydrationBoundary>
  );
}

export default Home;
