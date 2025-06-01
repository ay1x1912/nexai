"use client"
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function HomeView() {
    const trpc = useTRPC();
    const {data,error,isPending} = useQuery(
        trpc.hello.queryOptions({text:"hello world"})
    )
    if (!!error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }
    if (isPending) {
        return <div>
            Loading....
        </div>
    }
    return (
        <div>
        {JSON.stringify(data?.greeting)}
        </div>
    )
}

export default HomeView
