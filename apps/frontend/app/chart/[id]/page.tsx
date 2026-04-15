'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from 'recharts';
import { useAuthGuard } from '@/lib/useAuthGuard';
import { useGrowth, useCreateGrowth, type GrowthEntry } from '@/lib/hooks/useGrowth';

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function GrowthChartPage({ params }: { params: Promise<{ id: string }> }) {
    useAuthGuard();

    const { id } = use(params);
    const babyId = Number(id);
    const router = useRouter();

    const { data: entries = [], isLoading, isError } = useGrowth(babyId);
    const createGrowth = useCreateGrowth(babyId);

    const [form, setForm] = useState({ weight: '', height: '', date: '' });

    const chartData = entries.map((e: GrowthEntry) => ({
        date: formatDate(e.date),
        weight: e.weight,
        height: e.height,
    }));

    const latest = entries[entries.length - 1];

    const handleAdd = async () => {
        if (!form.weight || !form.height || !form.date) return;
        await createGrowth.mutateAsync({
            weight: Number(form.weight),
            height: Number(form.height),
            date: form.date,
        });
        setForm({ weight: '', height: '', date: '' });
    };

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
                        Growth Chart
                    </h1>
                    <p className="text-xs" style={{ color: '#9b7fa8' }}>{entries.length} entries recorded</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'linear-gradient(135deg, #ff91b3, #bea6ff)' }}>
                    📈
                </div>
            </header>

            <div className="relative max-w-lg mx-auto">

                {/* Latest stats strip */}
                {latest && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="rounded-2xl p-4 text-center"
                            style={{ background: '#fff1f5', border: '1px solid #ffc0d5' }}>
                            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#f7306a', opacity: 0.7 }}>Weight</p>
                            <p className="text-2xl font-bold" style={{ color: '#f7306a' }}>{latest.weight}<span className="text-sm font-normal"> kg</span></p>
                        </div>
                        <div className="rounded-2xl p-4 text-center"
                            style={{ background: '#f5f0ff', border: '1px solid #d9cbff' }}>
                            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#8057d8', opacity: 0.7 }}>Height</p>
                            <p className="text-2xl font-bold" style={{ color: '#8057d8' }}>{latest.height}<span className="text-sm font-normal"> cm</span></p>
                        </div>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="text-center py-8 rounded-3xl mb-4"
                        style={{ background: '#fff1f5', border: '1px solid #ffc0d5' }}>
                        <p className="text-sm" style={{ color: '#e0155a' }}>Failed to load growth data. Please refresh.</p>
                    </div>
                )}

                {/* Chart */}
                {isLoading ? (
                    <div className="h-64 rounded-3xl animate-pulse mb-6"
                        style={{ background: 'rgba(255,255,255,0.6)' }} />
                ) : entries.length === 0 ? (
                    <div className="text-center py-16 mb-6">
                        <div className="text-5xl mb-3">📏</div>
                        <p className="font-medium" style={{ color: '#c49ab5' }}>No growth data yet</p>
                        <p className="text-sm mt-1" style={{ color: '#d9b8cc' }}>Add your first entry below</p>
                    </div>
                ) : (
                    <div className="rounded-3xl p-4 mb-6 shadow-sm"
                        style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,193,213,0.4)' }}>

                        {/* Weight chart */}
                        <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: '#c4a0b8' }}>
                            Weight (kg)
                        </p>
                        <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(217,203,255,0.4)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#c4a0b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: '#c4a0b8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ background: '#fff9fb', border: '1px solid #ffc0d5', borderRadius: 12, fontSize: 12 }}
                                    labelStyle={{ color: '#3d1f2e', fontWeight: 600 }}
                                />
                                <Line type="monotone" dataKey="weight" stroke="#f7306a" strokeWidth={2.5}
                                    dot={{ fill: '#f7306a', r: 4, strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#f7306a' }} />
                            </LineChart>
                        </ResponsiveContainer>

                        {/* Height chart */}
                        <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1 mt-5" style={{ color: '#c4a0b8' }}>
                            Height (cm)
                        </p>
                        <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(217,203,255,0.4)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#c4a0b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: '#c4a0b8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ background: '#fff9fb', border: '1px solid #d9cbff', borderRadius: 12, fontSize: 12 }}
                                    labelStyle={{ color: '#3d1f2e', fontWeight: 600 }}
                                />
                                <Line type="monotone" dataKey="height" stroke="#8057d8" strokeWidth={2.5}
                                    dot={{ fill: '#8057d8', r: 4, strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#8057d8' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Add entry — fixed bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3"
                style={{ background: 'rgba(255,249,251,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,193,213,0.4)' }}>
                <div className="max-w-lg mx-auto flex flex-col gap-3">

                    {createGrowth.isError && (
                        <p className="text-xs text-center" style={{ color: '#e0155a' }}>Failed to save. Please try again.</p>
                    )}

                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={form.weight}
                            onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                            className="flex-1 px-3 py-3 rounded-2xl text-sm outline-none"
                            style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                            onFocus={e => (e.target.style.borderColor = '#f7306a')}
                            onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                        />
                        <input
                            type="number"
                            placeholder="Height (cm)"
                            value={form.height}
                            onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
                            className="flex-1 px-3 py-3 rounded-2xl text-sm outline-none"
                            style={{ background: 'white', border: '2px solid #d9cbff', color: '#3d1f2e' }}
                            onFocus={e => (e.target.style.borderColor = '#8057d8')}
                            onBlur={e => (e.target.style.borderColor = '#d9cbff')}
                        />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={form.date}
                            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            className="flex-1 px-3 py-3 rounded-2xl text-sm outline-none"
                            style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                            onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                            onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                        />
                        <button
                            onClick={handleAdd}
                            disabled={createGrowth.isPending || !form.weight || !form.height || !form.date}
                            className="px-5 py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 16px rgba(247,48,106,0.25)' }}>
                            {createGrowth.isPending ? '...' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
