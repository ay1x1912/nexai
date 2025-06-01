"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/authClient'
import { useRouter } from 'next/navigation'

import React from 'react'

function SignOutButton() {
    const router=useRouter()
    return (
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess:()=>router.push("/sign-in")
            }
        })}>SignOut</Button>
    )
}

export default SignOutButton
