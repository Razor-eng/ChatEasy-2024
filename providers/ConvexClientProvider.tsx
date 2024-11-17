"use client"

import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react'
import LoadingLogo from '@/components/shared/LoadingLogo'

type Props = {
    children: React.ReactNode;
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "")

const ConvexClientProvider = ({ children }: Props) => {
    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated>
                {children}
            </Authenticated>
            <AuthLoading>
                <LoadingLogo />
            </AuthLoading>
        </ConvexProviderWithClerk>
    )
}

export default ConvexClientProvider