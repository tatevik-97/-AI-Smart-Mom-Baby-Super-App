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

export function useUploadBabyPhoto() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, file }: { id: number; file: File }) => {
            const token = localStorage.getItem('token');
            const form = new FormData();
            form.append('file', file);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/babies/${id}/photo`, {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: form,
            });
            if (!res.ok) throw new Error('Upload failed');
            return res.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['babies'] }),
    });
}
