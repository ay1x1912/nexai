"use client";

import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetOne } from "@/module/agents/agentTypes";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center justify-start gap-x-3">
          <GeneratedAvatar variant="bottsNeutral" seed={row.original.name} />
          <span className="text-xl font-semibold capitalize">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <CornerDownRightIcon className="text-muted-foreground size-4" />
          <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
            {row.original.instruction}
          </span>
        </div>
      </div>
    ),
  }, {
    accessorKey: "",
    header: "Mettings",
    cell: ({row}) => (
      <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4" >
        <VideoIcon className="text-blue-700" />
        <span>{row.original.mettings}</span>
        {row.original.mettings===1 ?"metting":"mettings"}
      </Badge>
    )
  }
];
