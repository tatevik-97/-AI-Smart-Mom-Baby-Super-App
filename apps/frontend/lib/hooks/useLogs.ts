import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Log {
    id: number;
    type: 'sleep' | 'feeding' | 'diaper';
    value: string;
    createdAt: string;
}

export interface CreateLogInput {
    type: 'sleep' | 'feeding' | 'diaper';
    value: string;
    babyId: number;
}

export function useLogs(babyId: number) {
    return useQuery<Log[]>({
        queryKey: ['logs', babyId],
        queryFn: () => api(`/logs/${babyId}`),
    });
}

export function useCreateLog(babyId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateLogInput) => api('/logs', 'POST', data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['logs', babyId] }),
    });
}
