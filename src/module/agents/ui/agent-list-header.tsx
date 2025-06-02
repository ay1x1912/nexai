"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './new-agent-dialog';

function AgentListHeader() {
    const [open,setOpen]=useState(false)
    return (
        <>
            <NewAgentDialog open={open} onOpenChange={setOpen} />
        <div className="felx flex-col gap-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium">My Agents</h2>
            <Button onClick={()=>setOpen(true)}>
              <PlusIcon /> New Agent
            </Button>
          </div>
        </div>
      </>
    );
}

export default AgentListHeader
