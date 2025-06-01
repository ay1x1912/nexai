import React from 'react'
import { createAvatar } from "@dicebear/core";
import { initials,botttsNeutral} from '@dicebear/collection';
import { Avatar, AvatarImage } from './ui/avatar';
interface GeneratedAvatarProps{
    variant: "initials" | "bottsNeutral",
    seed: string,
    className?:string
}
function GeneratedAvatar({variant,seed,className}:GeneratedAvatarProps) {
  
let avatar
    if (variant==="bottsNeutral") {
         avatar = createAvatar(botttsNeutral, {
          seed
        });
   }
    else {
        avatar=createAvatar(initials,{seed})
    }
    const dataUri = avatar.toDataUri(); 
    return (
        <Avatar className={className}>
            <AvatarImage src={dataUri} alt='avatar'/>
        </Avatar>
    )
}

export default GeneratedAvatar
