import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Ignore a rota /chatbot junto com outras rotas e arquivos estáticos
    '/((?!_next|chatbot|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre execute rotas de API
    '/(api|trpc)(.*)',
  ],
};
