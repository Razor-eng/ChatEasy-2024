"use client"

import ItemList from "@/components/shared/item-list/ItemList";
import Spinner from "@/components/shared/Spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import DMConversationItem from "./_components/DMConversationItem";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";

type Props = React.PropsWithChildren<{}>

export default function ConversationsLayout({ children }: Props) {
    const conversations = useQuery(api.conversations.get);

    return (
        <>
            <ItemList title='Conversations' action={<CreateGroupDialog />}>
                {conversations ? (
                    conversations.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className='text-muted-foreground text-sm'>No Conversations found</p>
                        </div>
                    ) : (
                        conversations.map((conversations, id) => (
                            conversations.conversation.isGroup ? (
                                <GroupConversationItem
                                    key={id}
                                    id={conversations.conversation._id}
                                    name={conversations.conversation?.name || ""}
                                    lastMessageContent={conversations.lastMessage?.content}
                                    lastMessageSender={conversations.lastMessage?.sender}
                                    isCurrentUser={conversations.lastMessage?.isCurrentUser}
                                    unseenCount={conversations.unseenCount}
                                />
                            ) : (
                                <DMConversationItem
                                    key={id}
                                    id={conversations.conversation._id}
                                    username={conversations.otherMember?.username || ""}
                                    imageUrl={conversations.otherMember?.imageUrl || ""}
                                    lastMessageContent={conversations.lastMessage?.content}
                                    lastMessageSender={conversations.lastMessage?.sender}
                                    isCurrentUser={conversations.lastMessage?.isCurrentUser}
                                    unseenCount={conversations.unseenCount}
                                />
                            )
                        ))
                    )
                )
                    :
                    <Spinner />}
            </ItemList>
            {children}
        </>
    );
}
