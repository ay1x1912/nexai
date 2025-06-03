import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AgentIdHeadeerProps {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}
function AgentIdHeadeer({
  onEdit,
  onRemove,
  agentId,
  agentName ,
}: AgentIdHeadeerProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-xl font-medium"
                asChild
                href="/agents"
              >
                <Link href="/agents"> My Agents</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-foreground text-xl font-medium"
                asChild
                href="/agents"
              >
                <Link href={`/agents/${agentId}`}>{agentName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* withouit modal false makes the website stuck unclikiable */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <PencilIcon className="size-4 text-black" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
              <TrashIcon className="size-4 text-black" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default AgentIdHeadeer;
