import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Baby {
    id: number;
    name: string;
    birthDate: string;
    photoUrl?: string;
}

export interface CreateBabyInput {
    name: string;
    birthDate: string;
    photoUrl?: string;
}

export function useBabies() {
    return useQuery<Baby[]>({
        queryKey: ['babies'],
        queryFn: () => api('/babies'),
    });
}

export function useCreateBaby() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBabyInput) => api('/babies', 'POST', data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['babies'] }),
    });
}

export function useDeleteBaby() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => api(`/babies/${id}`, 'DELETE'),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['babies'] }),
    });
}
