'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BotIcon } from '@/icons/bot-icon';
import { BotWindow } from './window';
import { useChatBot } from '@/hooks/chatbot/use-chatbot';

type Props = {};

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot();

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <div
          className="fixed bottom-0 right-0 w-full md:w-[450px] max-w-[calc(100vw-1rem)] h-full md:h-[670px] max-h-[80vh] overflow-y-auto flex flex-col rounded-t-xl md:rounded-xl"
          style={{ top: botOpened ? 'auto' : 'calc(100% - 5rem)' }}
        >
          <BotWindow
            errors={errors}
            setChat={setOnChats}
            realtimeMode={onRealTime}
            helpdesk={currentBot?.helpdesk!}
            domainName={currentBot?.name!}
            ref={messageWindowRef}
            help={currentBot?.chatBot?.helpdesk}
            theme={currentBot?.chatBot?.background}
            textColor={currentBot?.chatBot?.textColor}
            chats={onChats}
            register={register}
            onChat={onStartChatting}
            onResponding={onAiTyping}
          />
        </div>
      )}

      <div
        className={cn(
          'rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-blue',
          loading ? 'invisible' : 'visible'
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
  );
};

export default AiChatBot;
