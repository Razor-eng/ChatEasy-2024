"use client"

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useConversation } from '@/hooks/useConversation';
import { cn } from '@/lib/utils';
import React from 'react'

type Props = React.PropsWithChildren<{
    title: string;
    action?: React.ReactNode;
}>

const ItemList = ({ title, action: Action, children }: Props) => {
    const { isActive } = useConversation();
    return (
        <Card className={cn('hidden h-full w-full lg:flex lg:flex-col lg:max-w-80 p-2', {
            "block": !isActive,
            "lg:block": isActive
        })}>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-700 dark:text-zinc-100">
                    {title}
                </h1>
                {Action ? Action : null}
            </div>
            <Separator className='mb-2' />
            <div className="flex-1 flex flex-col justify-start gap-2">
                {children}
            </div>
        </Card>
    )
}

export default ItemList