'use client';

import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '@/lib/hooks/useNotifications';

export function NotificationBell() {
    const { notifications, unreadCount } = useNotifications();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid #ffc0d5' }}
            >
                <span className="text-lg">🔔</span>
                {unreadCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)' }}
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div
                    className="absolute right-0 top-12 w-80 rounded-3xl shadow-2xl z-50 overflow-hidden"
                    style={{ background: '#fff9fb', border: '1px solid rgba(255,193,213,0.5)' }}
                >
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,193,213,0.3)' }}>
                        <p className="font-semibold text-sm" style={{ color: '#3d1f2e' }}>Notifications</p>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-10 text-center">
                                <div className="text-3xl mb-2">🔕</div>
                                <p className="text-sm" style={{ color: '#c4a0b8' }}>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n, i) => (
                                <div
                                    key={n.id ?? i}
                                    className="px-4 py-3 flex gap-3 items-start"
                                    style={{
                                        background: n.isRead ? 'transparent' : 'rgba(247,48,106,0.04)',
                                        borderBottom: '1px solid rgba(255,193,213,0.2)',
                                    }}
                                >
                                    <span className="text-base mt-0.5">🍼</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm" style={{ color: '#3d1f2e' }}>{n.message}</p>
                                        <p className="text-xs mt-0.5" style={{ color: '#c4a0b8' }}>
                                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    {!n.isRead && (
                                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#f7306a' }} />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
