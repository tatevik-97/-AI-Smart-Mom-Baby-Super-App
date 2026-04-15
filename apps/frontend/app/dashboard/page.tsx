'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBabies, useCreateBaby, useDeleteBaby, type Baby } from '@/lib/hooks/useBabies';
import { useAuthGuard } from '@/lib/useAuthGuard';

function getAge(birthDate: string) {
    const birth = new Date(birthDate);
    const now = new Date();
    const months =
        (now.getFullYear() - birth.getFullYear()) * 12 +
        (now.getMonth() - birth.getMonth());
    if (months < 1) return 'Newborn 🌸';
    if (months < 12) return `${months}mo old`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years}y ${rem}mo` : `${years} year${years > 1 ? 's' : ''} old`;
}

const BABY_AVATARS = ['👶', '🍼', '🌙', '⭐', '🌸', '🐣'];

export default function Dashboard() {
    useAuthGuard();

    const { data: babies = [], isLoading, isError } = useBabies();
    const createBaby = useCreateBaby();
    const deleteBaby = useDeleteBaby();

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', birthDate: '', photoUrl: '' });
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const router = useRouter();

    const handleAdd = async () => {
        if (!form.name || !form.birthDate) return;
        await createBaby.mutateAsync({
            name: form.name,
            birthDate: form.birthDate,
            photoUrl: form.photoUrl || undefined,
        });
        setForm({ name: '', birthDate: '', photoUrl: '' });
        setShowModal(false);
    };

    const handleDelete = async (id: number) => {
        await deleteBaby.mutateAsync(id);
        setDeleteId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <main className="min-h-screen px-4 pb-16"
            style={{ background: 'linear-gradient(160deg, #fff1f5 0%, #f5f0ff 60%, #fff7f0 100%)' }}>

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
            </div>

            {/* Header */}
            <header className="relative max-w-2xl mx-auto flex items-center justify-between py-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow"
                        style={{ background: 'linear-gradient(135deg, #ff91b3, #bea6ff)' }}>
                        🍼
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none"
                            style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            MomAI
                        </h1>
                        <p className="text-xs" style={{ color: '#9b7fa8' }}>Your family dashboard</p>
                    </div>
                </div>
                <button onClick={handleLogout}
                    className="text-xs px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.8)', color: '#9b7fa8', border: '1px solid #ffc0d5' }}>
                    Sign out
                </button>
            </header>

            <div className="relative max-w-2xl mx-auto">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold" style={{ color: '#3d1f2e' }}>
                        Hello, Mama! 👋
                    </h2>
                    <p className="text-sm mt-1" style={{ color: '#9b7fa8' }}>
                        {babies.length === 0
                            ? "Let's add your little one to get started"
                            : `You're tracking ${babies.length} little one${babies.length > 1 ? 's' : ''} 💜`}
                    </p>
                </div>

                <button onClick={() => setShowModal(true)}
                    className="w-full py-4 rounded-3xl font-semibold text-sm text-white mb-6 flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 24px rgba(247,48,106,0.25)' }}>
                    <span className="text-lg">+</span> Add Baby
                </button>

                {/* Error state */}
                {isError && (
                    <div className="text-center py-8 rounded-3xl mb-4"
                        style={{ background: '#fff1f5', border: '1px solid #ffc0d5' }}>
                        <p className="text-sm" style={{ color: '#e0155a' }}>Failed to load babies. Please refresh.</p>
                    </div>
                )}

                {/* Baby cards */}
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2].map(i => (
                            <div key={i} className="h-28 rounded-3xl animate-pulse"
                                style={{ background: 'rgba(255,255,255,0.6)' }} />
                        ))}
                    </div>
                ) : babies.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🌸</div>
                        <p className="font-medium" style={{ color: '#c49ab5' }}>No babies yet</p>
                        <p className="text-sm mt-1" style={{ color: '#d9b8cc' }}>Tap "Add Baby" to begin</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {babies.map((baby: Baby, i: number) => (
                            <div key={baby.id}
                                className="rounded-3xl p-5 flex items-center gap-4 shadow-sm"
                                style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,193,213,0.4)' }}>

                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #fff1f5, #f5f0ff)' }}>
                                    {baby.photoUrl
                                        ? <img src={baby.photoUrl} alt={baby.name} className="w-full h-full object-cover" />
                                        : BABY_AVATARS[i % BABY_AVATARS.length]}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base truncate" style={{ color: '#3d1f2e' }}>
                                        {baby.name}
                                    </h3>
                                    <p className="text-xs mt-0.5" style={{ color: '#9b7fa8' }}>
                                        {getAge(baby.birthDate)}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: '#c4a0b8' }}>
                                        Born {new Date(baby.birthDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button onClick={() => router.push(`/baby/${baby.id}`)}
                                        className="px-4 py-2 rounded-2xl text-xs font-semibold text-white transition-all active:scale-95"
                                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)' }}>
                                        View logs
                                    </button>
                                    <button onClick={() => setDeleteId(baby.id)}
                                        className="px-4 py-2 rounded-2xl text-xs font-medium transition-all active:scale-95"
                                        style={{ background: '#fff1f5', color: '#f7306a', border: '1px solid #ffc0d5' }}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c4a0b8' }}>
                        Quick tips
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { icon: '🤱', label: 'Track feedings', onClick: undefined },
                            { icon: '😴', label: 'Log sleep', onClick: undefined },
                            { icon: '🧠', label: 'AI insights', onClick: () => router.push('/ai') },
                        ].map(tip => (
                            <div key={tip.label}
                                onClick={tip.onClick}
                                className={`rounded-2xl p-4 text-center ${tip.onClick ? 'cursor-pointer active:scale-95 transition-all' : ''}`}
                                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(217,203,255,0.5)' }}>
                                <div className="text-2xl mb-1">{tip.icon}</div>
                                <p className="text-xs font-medium" style={{ color: '#8057d8' }}>{tip.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Baby Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4"
                    style={{ background: 'rgba(61,31,46,0.3)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setShowModal(false)}>
                    <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
                        style={{ background: '#fff9fb', border: '1px solid rgba(255,193,213,0.5)' }}
                        onClick={e => e.stopPropagation()}>

                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ color: '#3d1f2e' }}>Add your baby 🍼</h3>
                            <button onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                style={{ background: '#fff1f5', color: '#f7306a' }}>
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>Baby's name</label>
                                <input
                                    placeholder="e.g. Sofia"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                                    style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                                    onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                    onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>Date of birth</label>
                                <input
                                    type="date"
                                    value={form.birthDate}
                                    onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                                    style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                                    onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                    onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>
                                    Photo URL <span style={{ color: '#c4a0b8' }}>(optional)</span>
                                </label>
                                <input
                                    placeholder="https://..."
                                    value={form.photoUrl}
                                    onChange={e => setForm(f => ({ ...f, photoUrl: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                                    style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                                    onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                    onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                                />
                            </div>

                            {createBaby.isError && (
                                <p className="text-xs rounded-xl px-3 py-2"
                                    style={{ background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5' }}>
                                    Failed to add baby. Please try again.
                                </p>
                            )}

                            <button onClick={handleAdd}
                                disabled={createBaby.isPending || !form.name || !form.birthDate}
                                className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 20px rgba(247,48,106,0.25)' }}>
                                {createBaby.isPending ? '✨ Saving...' : 'Add Baby'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ background: 'rgba(61,31,46,0.3)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setDeleteId(null)}>
                    <div className="w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center"
                        style={{ background: '#fff9fb', border: '1px solid rgba(255,193,213,0.5)' }}
                        onClick={e => e.stopPropagation()}>
                        <div className="text-4xl mb-3">🥺</div>
                        <h3 className="font-bold text-lg mb-1" style={{ color: '#3d1f2e' }}>Remove baby?</h3>
                        <p className="text-sm mb-5" style={{ color: '#9b7fa8' }}>This will delete all their logs too.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)}
                                className="flex-1 py-3 rounded-2xl text-sm font-medium"
                                style={{ background: '#fff1f5', color: '#9b7fa8', border: '1px solid #ffc0d5' }}>
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteId)}
                                disabled={deleteBaby.isPending}
                                className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #f7306a, #e0155a)' }}>
                                {deleteBaby.isPending ? '...' : 'Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
