import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface GrowthEntry {
    id: number;
    weight: number;
    height: number;
    date: string;
}

export interface CreateGrowthInput {
    weight: number;
    height: number;
    date: string;
}

export function useGrowth(babyId: number) {
    return useQuery<GrowthEntry[]>({
        queryKey: ['growth', babyId],
        queryFn: () => api(`/growth/${babyId}`),
    });
}

export function useCreateGrowth(babyId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateGrowthInput) => api(`/growth/${babyId}`, 'POST', data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['growth', babyId] }),
    });
}
