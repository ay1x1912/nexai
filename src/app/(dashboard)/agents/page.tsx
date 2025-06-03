import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/module/agents/params";
import AgentListHeader from "@/module/agents/ui/agent-list-header";
import AgentView, {
  AgentsViewErrorState,
  AgentsViewLoadingState,
} from "@/module/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface Props{
  searchParams:Promise<SearchParams>
}
async function Home({searchParams}:Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const filters =await loadSearchParams(searchParams)

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
      pageSize:1
     
    }),
  );
  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoadingState />}>
          <ErrorBoundary fallback={<AgentsViewErrorState />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default Home;
