'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Notification {
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
}

function getUserIdFromToken(): number | null {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub ?? payload.id ?? null;
    } catch {
        return null;
    }
}

export function useNotifications() {
    const [live, setLive] = useState<Notification[]>([]);

    const { data: stored = [], refetch } = useQuery<Notification[]>({
        queryKey: ['notifications'],
        queryFn: () => api('/notification'),
    });

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL!.replace('/api', ''), {
            transports: ['websocket'],
        });

        socket.on(`user-${userId}`, (payload: { message: string }) => {
            const notif: Notification = {
                id: Date.now(),
                message: payload.message,
                isRead: false,
                createdAt: new Date().toISOString(),
            };
            setLive(prev => [notif, ...prev]);
            void refetch();
        });

        return () => { socket.disconnect(); };
    }, [refetch]);

    const all = [...live.filter(l => !stored.find(s => s.message === l.message && s.isRead === false)), ...stored];
    const unreadCount = all.filter(n => !n.isRead).length + live.length;

    return { notifications: all, unreadCount };
}
