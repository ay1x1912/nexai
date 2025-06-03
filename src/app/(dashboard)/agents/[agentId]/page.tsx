import { auth } from "@/lib/auth";
import AgentIdView, { AgentsIdViewErrorState, AgentsIdViewLoadingState } from "@/module/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface PageProps {
  params: Promise<{ agentId: string }>;
}
async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-im");
  }
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return( <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<AgentsIdViewLoadingState/>}>
      <ErrorBoundary fallback={<AgentsIdViewErrorState/>}></ErrorBoundary>
      <AgentIdView agentId={agentId} />
    </Suspense>
  </HydrationBoundary>)
}

export default Page;
