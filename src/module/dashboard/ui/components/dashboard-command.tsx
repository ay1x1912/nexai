import React from 'react'
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog,
    
  } from "@/components/ui/command"

  
interface DashBoardCommandProps{
    open: boolean,
    setOpen:(oepn:boolean)=>void
}
function DashBoardCommand({ open, setOpen }: DashBoardCommandProps) {
    return (
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a metting or a agent" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Test</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandResponsiveDialog>
    );
}
export default DashBoardCommand
