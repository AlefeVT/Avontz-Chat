import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Ignore os componentes internos do Next.js e todos os arquivos estáticos, a menos que sejam encontrados nos parâmetros de pesquisa
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre execute rotas de API
    '/(api|trpc)(.*)',
  ],
};