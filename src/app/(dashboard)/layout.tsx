import { onLoginUser } from '@/actions/auth';
import { checkAndUpdateSubscription } from '@/actions/stripe';
import SideBar from '@/components/sidebar';
import { ChatProvider } from '@/context/use-chat-context';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) {
    console.log('Usuário não autenticado');
    return null;
  }

  await checkAndUpdateSubscription();

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domain} />
        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
