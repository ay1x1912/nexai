import ResponsiveDialog from "@/module/dashboard/responsive-dialog";
import React from "react";
import AgentForm from "./agent-form";
import { AgentGetOne } from "../agentTypes";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues:AgentGetOne
}
function UpdateAgentDialog({ open, onOpenChange ,initialValues}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      descriptiom="Edit the agaent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
              initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}

export default UpdateAgentDialog;
