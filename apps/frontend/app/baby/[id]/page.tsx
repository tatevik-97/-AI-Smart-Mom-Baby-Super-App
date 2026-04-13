'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogs, useCreateLog, type Log } from '@/lib/hooks/useLogs';
import { useAuthGuard } from '@/lib/useAuthGuard';

const LOG_TYPES = [
    { value: 'sleep',   label: 'Sleep',   icon: '😴', color: '#8057d8', bg: '#f5f0ff', border: '#d9cbff' },
    { value: 'feeding', label: 'Feeding', icon: '🍼', color: '#f7306a', bg: '#fff1f5', border: '#ffc0d5' },
    { value: 'diaper',  label: 'Diaper',  icon: '🌸', color: '#ff9044', bg: '#fff7f0', border: '#ffd8b5' },
] as const;

function timeAgo(date: string) {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function BabyLogs({ params }: any) {
    useAuthGuard();

    const { id } = use(params);
    const babyId = Number(id);

    const { data: logs = [], isLoading, isError } = useLogs(babyId);
    const createLog = useCreateLog(babyId);

    const [type, setType] = useState<'sleep' | 'feeding' | 'diaper'>('sleep');
    const [value, setValue] = useState('');
    const router = useRouter();

    const addLog = async () => {
        if (!value.trim()) return;
        await createLog.mutateAsync({ type, value: value.trim(), babyId });
        setValue('');
    };

    const selected = LOG_TYPES.find(t => t.value === type)!;

    const grouped = logs.reduce<Record<string, Log[]>>((acc, log) => {
        const day = new Date(log.createdAt).toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
        });
        if (!acc[day]) acc[day] = [];
        acc[day].push(log);
        return acc;
    }, {});

    return (
        <main className="min-h-screen px-4 pb-40"
            style={{ background: 'linear-gradient(160deg, #fff1f5 0%, #f5f0ff 60%, #fff7f0 100%)' }}>

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
            </div>

            {/* Header */}
            <header className="relative max-w-lg mx-auto flex items-center justify-between py-6">
                <button onClick={() => router.push('/dashboard')}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.8)', color: '#8057d8', border: '1px solid #d9cbff' }}>
                    ←
                </button>
                <div className="text-center">
                    <h1 className="text-base font-bold"
                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Baby Logs
                    </h1>
                    <p className="text-xs" style={{ color: '#9b7fa8' }}>{logs.length} entries total</p>
                </div>
                <div className="w-9 h-9" />
            </header>

            <div className="relative max-w-lg mx-auto">

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {LOG_TYPES.map(t => {
                        const count = logs.filter(l => l.type === t.value).length;
                        return (
                            <div key={t.value} className="rounded-2xl p-3 text-center"
                                style={{ background: t.bg, border: `1px solid ${t.border}` }}>
                                <div className="text-xl mb-0.5">{t.icon}</div>
                                <div className="text-lg font-bold" style={{ color: t.color }}>{count}</div>
                                <div className="text-xs" style={{ color: t.color, opacity: 0.7 }}>{t.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Error state */}
                {isError && (
                    <div className="text-center py-8 rounded-3xl mb-4"
                        style={{ background: '#fff1f5', border: '1px solid #ffc0d5' }}>
                        <p className="text-sm" style={{ color: '#e0155a' }}>Failed to load logs. Please refresh.</p>
                    </div>
                )}

                {/* Log list */}
                {isLoading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 rounded-2xl animate-pulse"
                                style={{ background: 'rgba(255,255,255,0.6)' }} />
                        ))}
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-3">📋</div>
                        <p className="font-medium" style={{ color: '#c49ab5' }}>No logs yet</p>
                        <p className="text-sm mt-1" style={{ color: '#d9b8cc' }}>Add your first log below</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {Object.entries(grouped).map(([day, dayLogs]) => (
                            <div key={day}>
                                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                                    style={{ color: '#c4a0b8' }}>
                                    {day}
                                </p>
                                <div className="flex flex-col gap-2">
                                    {dayLogs.map(log => {
                                        const meta = LOG_TYPES.find(t => t.value === log.type)!;
                                        return (
                                            <div key={log.id}
                                                className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm"
                                                style={{ background: 'rgba(255,255,255,0.85)', border: `1px solid ${meta.border}` }}>
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                                                    style={{ background: meta.bg }}>
                                                    {meta.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold" style={{ color: '#3d1f2e' }}>
                                                        {log.value}
                                                    </p>
                                                    <p className="text-xs mt-0.5" style={{ color: meta.color }}>{meta.label}</p>
                                                </div>
                                                <span className="text-xs flex-shrink-0" style={{ color: '#c4a0b8' }}>
                                                    {timeAgo(log.createdAt)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add log — fixed bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3"
                style={{ background: 'rgba(255,249,251,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,193,213,0.4)' }}>
                <div className="max-w-lg mx-auto flex flex-col gap-3">

                    {createLog.isError && (
                        <p className="text-xs text-center" style={{ color: '#e0155a' }}>
                            Failed to save log. Please try again.
                        </p>
                    )}

                    {/* Type selector */}
                    <div className="flex gap-2">
                        {LOG_TYPES.map(t => (
                            <button key={t.value}
                                onClick={() => setType(t.value)}
                                className="flex-1 py-2 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
                                style={{
                                    background: type === t.value ? t.bg : 'rgba(255,255,255,0.6)',
                                    color: type === t.value ? t.color : '#c4a0b8',
                                    border: `2px solid ${type === t.value ? t.border : 'transparent'}`,
                                }}>
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Input row */}
                    <div className="flex gap-2">
                        <input
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addLog()}
                            placeholder={
                                type === 'sleep' ? 'e.g. 2 hours' :
                                type === 'feeding' ? 'e.g. 150ml' : 'e.g. wet'
                            }
                            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
                            style={{ background: 'white', border: `2px solid ${selected.border}`, color: '#3d1f2e' }}
                            onFocus={e => (e.target.style.borderColor = selected.color)}
                            onBlur={e => (e.target.style.borderColor = selected.border)}
                        />
                        <button onClick={addLog}
                            disabled={createLog.isPending || !value.trim()}
                            className="px-5 py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-50"
                            style={{ background: `linear-gradient(135deg, ${selected.color}, #8057d8)`, boxShadow: `0 4px 16px ${selected.color}44` }}>
                            {createLog.isPending ? '...' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
