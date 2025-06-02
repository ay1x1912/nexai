"use client"
import ErrorState from '@/components/error-state'
import LoadingState from '@/components/loading-state'
import { useTRPC } from '@/trpc/client'
import {  useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

function AgentView() {
    const trpc = useTRPC()
    const {data}= useSuspenseQuery(
        trpc.agents.getMany.queryOptions()
    )
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default AgentView

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