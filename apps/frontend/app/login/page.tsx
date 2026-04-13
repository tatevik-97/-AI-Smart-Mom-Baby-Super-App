'use client';

import { useState } from 'react';
import { useLogin } from '@/lib/hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();

    const handleLogin = () => login.mutate({ email, password });

    return (
        <main className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #fff1f5 0%, #f5f0ff 50%, #fff7f0 100%)' }}>

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
                <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ffd8b5, transparent)' }} />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo / Hero */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 text-4xl shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #ff91b3, #bea6ff)' }}>
                        🍼
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight"
                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        MomAI
                    </h1>
                    <p className="text-sm mt-1" style={{ color: '#9b7fa8' }}>
                        AI Smart Mom & Baby Super App ✨
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl shadow-xl p-8 backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,193,213,0.4)' }}>

                    <h2 className="text-xl font-semibold mb-1" style={{ color: '#3d1f2e' }}>
                        Welcome back, mama! 👋
                    </h2>
                    <p className="text-sm mb-6" style={{ color: '#9b7fa8' }}>
                        Sign in to continue your journey
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
                                style={{
                                    background: '#fff9fb',
                                    border: '2px solid #ffc0d5',
                                    color: '#3d1f2e',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
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
                                onKeyDown={(e) => e.key === 'Enter' && login.mutate({ email, password })}
                                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                style={{
                                    background: '#fff9fb',
                                    border: '2px solid #ffc0d5',
                                    color: '#3d1f2e',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                            />
                        </div>

                        {/* Error */}
                        {login.isError && (
                            <p className="text-xs rounded-xl px-3 py-2"
                                style={{ background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5' }}>
                                Invalid email or password. Please try again.
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            onClick={handleLogin}
                            disabled={login.isPending}
                            className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60 mt-2"
                            style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 20px rgba(247,48,106,0.3)' }}
                        >
                            {login.isPending ? '✨ Signing in...' : 'Sign In'}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: '#ffc0d5' }} />
                        <span className="text-xs" style={{ color: '#c49ab5' }}>or</span>
                        <div className="flex-1 h-px" style={{ background: '#ffc0d5' }} />
                    </div>

                    <p className="text-center text-sm" style={{ color: '#9b7fa8' }}>
                        New here?{' '}
                        <a href="/register" className="font-semibold"
                            style={{ color: '#f7306a' }}>
                            Create an account
                        </a>
                    </p>
                </div>

                {/* Footer tags */}
                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                    {['🤱 Track feedings', '😴 Sleep logs', '🧠 AI insights'].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.7)', color: '#8057d8', border: '1px solid #d9cbff' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </main>
    );
}
