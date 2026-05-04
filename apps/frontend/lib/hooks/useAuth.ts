import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export function useLogin() {
    const router = useRouter();
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            api('/auth/login', 'POST', { email, password }),
        onSuccess: (data) => {
            localStorage.setItem('token', data.access_token);
            router.push('/dashboard');
        },
    });
}

export function useRegister() {
    const router = useRouter();
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            api('/auth/register', 'POST', { email, password }),
        onSuccess: () => {
            router.push('/login');
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: ({ email }: { email: string }) =>
            api('/auth/forgot-password', 'POST', { email }),
    });
}

export function useResetPassword() {
    const router = useRouter();
    return useMutation({
        mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
            api('/auth/reset-password', 'POST', { token, newPassword }),
        onSuccess: () => {
            router.push('/login');
        },
    });
}
