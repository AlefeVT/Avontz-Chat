'use client';

import React from 'react';
import TabsMenu from '../tabs';
import { TABS_MENU } from '@/constants/menu';
import { TabsContent } from '../ui/tabs';
import { Loader } from '../loader';
import { CardDescription } from '../ui/card';
import { Separator } from '../ui/separator';
import { useConversation } from '@/hooks/conversation/use-conversation';
import ConversationSearch from './search';
import ChatCard from './chat-card';

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation();

  return (
    <div className="py-3 px-0 w-7/12">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="não lidos">
          <ConversationSearch domains={domains} register={register} />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription>
                  Nenhum bate-papo para seu domínio
                </CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        {/* <TabsContent value="todos">
          <Separator orientation="horizontal" className="mt-5" />
          todos
        </TabsContent>
        <TabsContent value="expirados">
          <Separator orientation="horizontal" className="mt-5" />
          expirado
        </TabsContent>
        <TabsContent value="favoritos">
          <Separator orientation="horizontal" className="mt-5" />
          favoritado
        </TabsContent> */}
      </TabsMenu>
    </div>
  );
};

export default ConversationMenu;
