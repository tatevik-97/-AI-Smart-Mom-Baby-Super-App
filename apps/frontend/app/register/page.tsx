'use client';

import { useState } from 'react';
import { useRegister } from '@/lib/hooks/useAuth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const register = useRegister();

    const passwordMismatch = confirm.length > 0 && confirm !== password;

    const handleRegister = () => {
        if (passwordMismatch) return;
        register.mutate({ email, password });
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #fff1f5 0%, #f5f0ff 50%, #fff7f0 100%)' }}>

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ffd8b5, transparent)' }} />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo / Hero */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 text-4xl shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #bea6ff, #ff91b3)' }}>
                        🤱
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight"
                        style={{ background: 'linear-gradient(135deg, #8057d8, #f7306a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        MomAI
                    </h1>
                    <p className="text-sm mt-1" style={{ color: '#9b7fa8' }}>
                        AI Smart Mom & Baby Super App ✨
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl shadow-xl p-8 backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(190,166,255,0.4)' }}>

                    <h2 className="text-xl font-semibold mb-1" style={{ color: '#3d1f2e' }}>
                        Join the family! 💜
                    </h2>
                    <p className="text-sm mb-6" style={{ color: '#9b7fa8' }}>
                        Create your account and start your journey
                    </p>

                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="hello@mommy.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                style={{ background: '#fff9fb', border: '2px solid #d9cbff', color: '#3d1f2e' }}
                                onFocus={e => (e.target.style.borderColor = '#bea6ff')}
                                onBlur={e => (e.target.style.borderColor = '#d9cbff')}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                style={{ background: '#fff9fb', border: '2px solid #d9cbff', color: '#3d1f2e' }}
                                onFocus={e => (e.target.style.borderColor = '#bea6ff')}
                                onBlur={e => (e.target.style.borderColor = '#d9cbff')}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !passwordMismatch && register.mutate({ email, password })}
                                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                style={{
                                    background: '#fff9fb',
                                    border: `2px solid ${passwordMismatch ? '#f7306a' : '#d9cbff'}`,
                                    color: '#3d1f2e',
                                }}
                                onFocus={e => (e.target.style.borderColor = passwordMismatch ? '#f7306a' : '#bea6ff')}
                                onBlur={e => (e.target.style.borderColor = passwordMismatch ? '#f7306a' : '#d9cbff')}
                            />
                            {passwordMismatch && (
                                <p className="text-xs mt-1.5" style={{ color: '#e0155a' }}>
                                    Passwords don't match
                                </p>
                            )}
                        </div>

                        {/* Error */}
                        {register.isError && (
                            <p className="text-xs rounded-xl px-3 py-2"
                                style={{ background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5' }}>
                                Registration failed. This email may already be in use.
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            onClick={handleRegister}
                            disabled={register.isPending || passwordMismatch}
                            className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60 mt-2"
                            style={{ background: 'linear-gradient(135deg, #8057d8, #f7306a)', boxShadow: '0 4px 20px rgba(128,87,216,0.3)' }}
                        >
                            {register.isPending ? '✨ Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: '#d9cbff' }} />
                        <span className="text-xs" style={{ color: '#c49ab5' }}>or</span>
                        <div className="flex-1 h-px" style={{ background: '#d9cbff' }} />
                    </div>

                    <p className="text-center text-sm" style={{ color: '#9b7fa8' }}>
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold" style={{ color: '#8057d8' }}>
                            Sign in
                        </a>
                    </p>
                </div>

                {/* Footer tags */}
                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                    {['🍼 Baby tracking', '💤 Sleep patterns', '🌸 Mom wellness'].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.7)', color: '#f7306a', border: '1px solid #ffc0d5' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </main>
    );
}
