"use client";
import ErrorState from "@/components/error-state";
import GeneratedAvatar from "@/components/generated-avatar";
import LoadingState from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import AgentIdHeadeer from "../agent-id-header";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import UpdateAgentDialog from "../update-agent-dialog";

interface AgentIdViewProps {
  agentId: string;
}
function AgentIdView({ agentId }: AgentIdViewProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openEdit,setOpenEdit]=useState(false)
  const removeAgnts = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        // TODO:invalidae upgrade
        router.push('/agents');
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }),
  );
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );
  return (
    <>
      <UpdateAgentDialog open={openEdit} onOpenChange={setOpenEdit} initialValues={data} />
      <div className="flex flex-col px-4 py-4 md:px-8">
        <AgentIdHeadeer
          agentId={data.id}
          agentName={data.name}
          onEdit={()=>{setOpenEdit(true)}}
          onRemove={() => removeAgnts.mutate({ id: data.id })}
        />
        <div className="flex flex-col gap-y-4 rounded-lg border bg-white p-4">
          <div className="flex items-center gap-x-4">
            <GeneratedAvatar
              className="size-9"
              variant="bottsNeutral"
              seed={data.name}
            />
            <span className="text-md font-medium"> {data.name}</span>
          </div>
          <div className="">
            <Badge
              variant={"outline"}
              className="flex items-center justify-center gap-1 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-400" />
              {data.mettings}
              {data.mettings === 1 ? "metting" : "mettings"}
            </Badge>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-xl font-medium">Instructions</span>
            <span>{data.instruction}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentIdView;

export const AgentsIdViewLoadingState = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Thsi may take a few seconds"
    />
  );
};

export const AgentsIdViewErrorState = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};
