import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    id: Id<"requests">;
    imageUrl: string;
    username: string;
    email: string;
}

const Request = ({ email, id, imageUrl, username }: Props) => {
    const { mutate: removeRequest, pending: removePending } = useMutationState(api.request.remove);
    const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.accept);

    return (
        <Card className='w-full p-2 flex flow-row items-center justify-between gap-2'>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4 truncate">
                    <Avatar>
                        <AvatarImage src={imageUrl} />
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col truncate">
                        <h4 className="truncate">{username}</h4>
                        <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size={'icon'}
                        disabled={acceptPending || removePending}
                        onClick={() => {
                            acceptRequest({ id }).then(() => {
                                toast.success("Friend request accepted")
                            }).catch((error) => {
                                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred")
                            })
                        }}
                    >
                        <Check />
                    </Button>
                    <Button
                        size={'icon'}
                        disabled={acceptPending || removePending}
                        variant={'destructive'}
                        onClick={() => {
                            removeRequest({ id }).then(() => {
                                toast.success("Friend request removed")
                            }).catch((error) => {
                                toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred")
                            })
                        }}
                    >
                        <X />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default Request