import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import { User, UserRoundPlus } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    imageUrl: string;
    username: string;
    email: string;
}

const Suggest = ({ email, imageUrl, username }: Props) => {
    const { mutate: createRequest, pending } = useMutationState(api.request.create);

    const handleSubmit = async () => {
        await createRequest({ email: email }).then(() => {
            toast.success("Friend request sent!");
        }).catch(error => {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
        })
    };

    return (
        <Card className='w-full p-2 flex flow-row items-center justify-between gap-2'>
            <div className="w-full flex items-center justify-between">
                <div className='flex items-center gap-4 truncate'>
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
                <Button
                    size={'icon'}
                    disabled={pending}
                    onClick={handleSubmit}
                >
                    <UserRoundPlus />
                </Button>
            </div>
        </Card>
    )
}

export default Suggest