import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface AiChatResponse {
    reply: string;
}

export function useAiChat() {
    return useMutation<AiChatResponse, Error, string>({
        mutationFn: (message: string) => api('/ai/chat', 'POST', { message }),
    });
}
