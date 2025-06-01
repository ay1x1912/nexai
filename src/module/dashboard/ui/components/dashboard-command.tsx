import React from 'react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    
  } from "@/components/ui/command"

  
interface DashBoardCommandProps{
    open: boolean,
    setOpen:(oepn:boolean)=>void
}
function DashBoardCommand({ open, setOpen }: DashBoardCommandProps) {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Find a metting or a agent" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup >
                    <CommandItem>Test</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
export default DashBoardCommand
