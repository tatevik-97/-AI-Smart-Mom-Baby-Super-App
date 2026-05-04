'use client';

import { useState } from 'react';
import { useForgotPassword } from '@/lib/hooks/useAuth';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const forgot = useForgotPassword();

    return (
        <main className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #fff1f5 0%, #f5f0ff 50%, #fff7f0 100%)' }}>

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
            </div>

            <div className="relative w-full max-w-md">
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

                <div className="rounded-3xl shadow-xl p-8 backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,193,213,0.4)' }}>

                    <h2 className="text-xl font-semibold mb-1" style={{ color: '#3d1f2e' }}>
                        Forgot your password? 🔑
                    </h2>
                    <p className="text-sm mb-6" style={{ color: '#9b7fa8' }}>
                        Enter your email and we'll send you a reset link.
                    </p>

                    {forgot.isSuccess ? (
                        <div className="text-sm rounded-xl px-4 py-3 text-center"
                            style={{ background: '#f5f0ff', color: '#8057d8', border: '1px solid #d9cbff' }}>
                            Check your inbox! A reset link has been sent. 💌
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5c3d52' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && forgot.mutate({ email })}
                                    className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                    style={{ background: '#fff9fb', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                                    onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                    onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                                />
                            </div>

                            {forgot.isError && (
                                <p className="text-xs rounded-xl px-3 py-2"
                                    style={{ background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5' }}>
                                    {(forgot.error as Error)?.message ?? 'Something went wrong. Please try again.'}
                                </p>
                            )}

                            <button
                                onClick={() => forgot.mutate({ email })}
                                disabled={forgot.isPending || !email}
                                className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60 mt-2"
                                style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 20px rgba(247,48,106,0.3)' }}
                            >
                                {forgot.isPending ? '✨ Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: '#ffc0d5' }} />
                        <span className="text-xs" style={{ color: '#c49ab5' }}>or</span>
                        <div className="flex-1 h-px" style={{ background: '#ffc0d5' }} />
                    </div>

                    <p className="text-center text-sm" style={{ color: '#9b7fa8' }}>
                        Remember it?{' '}
                        <a href="/login" className="font-semibold" style={{ color: '#f7306a' }}>
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
