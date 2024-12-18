import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId: Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const LeaveGroupDialog = ({ conversationId, open, setOpen }: Props) => {
    const { mutate: leaveGroup, pending } = useMutationState(api.conversation.leaveGroup);

    const handleLeaveGroup = async () => {
        leaveGroup({ conversationId }).then(() => {
            toast.success("Group Left");
        }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will not be able to see any previous messages or send new messages to this group.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleLeaveGroup} disabled={pending} className='bg-destructive hover:bg-destructive/85'>
                        Leave
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LeaveGroupDialog