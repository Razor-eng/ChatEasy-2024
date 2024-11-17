"use client"

import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Spinner from '@/components/shared/Spinner'
import Request from './_components/Request'
import Suggest from './_components/Suggest'

const FriendsPage = () => {
    const requests = useQuery(api.requests.get);
    const suggestions = useQuery(api.suggests.get);

    return (
        <>
            <ItemList title='Friends' action={<AddFriendDialog />}>
                {
                    requests ? (
                        requests.length === 0 ? (
                            suggestions?.length === 0 ?
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className='text-muted-foreground text-sm'>No friend requests found</p>
                                </div>
                                :
                                <div className="flex flex-col gap-2">
                                    <h2 className="">Suggested Users</h2>
                                    {suggestions?.map((suggest, id) => id < 3 && (
                                        <Suggest key={id}
                                            email={suggest.email}
                                            username={suggest.username}
                                            imageUrl={suggest.imageUrl}
                                        />
                                    ))}
                                </div>
                        ) : (
                            requests.map((request, id) => (
                                <Request
                                    key={id}
                                    id={request.request._id}
                                    email={request.sender.email}
                                    username={request.sender.username}
                                    imageUrl={request.sender.imageUrl}
                                />
                            ))
                        )
                    )
                        :
                        <Spinner />
                }
            </ItemList>
            <ConversationFallback />
        </>
    )
}

export default FriendsPage