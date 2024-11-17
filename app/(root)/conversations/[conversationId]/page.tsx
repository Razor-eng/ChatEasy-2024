"use client"

import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import Spinner from '@/components/shared/Spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog'
import DeleteGroupDialog from './_components/dialogs/DeleteGroupDialog'
import LeaveGroupDialog from './_components/dialogs/LeaveGroupDialog'

type Props = {
    params: {
        conversationId: Id<"conversations">;
    }
}

const ConversationPage = ({ params: { conversationId } }: Props) => {
    const conversation = useQuery(api.conversation.get, { id: conversationId });

    const [removeFriend, setRemoveFriend] = useState(false);
    const [deleteGroup, setDeleteGroup] = useState(false);
    const [leaveGroup, setLeaveGroup] = useState(false);
    const [callType, setCallType] = useState(null);

    return (
        conversation === undefined ? (
            <Spinner />
        ) : (
            conversation === null ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p className='text-muted-foreground text-sm'>No Conversations found</p>
                </div>
            ) : (
                <ConversationContainer>
                    <RemoveFriendDialog conversationId={conversationId} open={removeFriend} setOpen={setRemoveFriend} />
                    <DeleteGroupDialog conversationId={conversationId} open={deleteGroup} setOpen={setDeleteGroup} />
                    <LeaveGroupDialog conversationId={conversationId} open={leaveGroup} setOpen={setLeaveGroup} />
                    <Header
                        name={(conversation.isGroup ? conversation.name : conversation.otherMember?.username) || ""}
                        imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
                        options={conversation.isGroup ? [
                            {
                                label: "Leave group",
                                destructive: false,
                                onClick: () => setLeaveGroup(true)
                            },
                            {
                                label: "Delete group",
                                destructive: true,
                                onClick: () => setDeleteGroup(true)
                            }
                        ] : [
                            {
                                label: "Remove Friend",
                                destructive: true,
                                onClick: () => setRemoveFriend(true)
                            }
                        ]}
                    />
                    <Body
                        members={
                            conversation.isGroup
                                ? conversation.otherMembers ?
                                    conversation.otherMembers : []
                                : conversation.otherMember ?
                                    [conversation.otherMember] : []
                        }
                    />
                    <ChatInput />
                </ConversationContainer>
            )
        )
    )
}

export default ConversationPage