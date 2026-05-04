'use client';

import {useState} from 'react';
import {useResetPassword} from '@/lib/hooks/useAuth';

export function ResetPasswordForm({initialToken}: {initialToken?: string}) {
    const [token, setToken] = useState(initialToken ?? '');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [mismatch, setMismatch] = useState(false);
    const reset = useResetPassword();

    const handleSubmit = () => {
        if (newPassword !== confirm) {
            setMismatch(true);
            return;
        }
        setMismatch(false);
        reset.mutate({token, newPassword});
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="text-center mb-8">
                <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 text-4xl shadow-lg"
                    style={{background: 'linear-gradient(135deg, #ff91b3, #bea6ff)'}}>
                    🍼
                </div>
                <h1 className="text-3xl font-bold tracking-tight"
                    style={{
                        background: 'linear-gradient(135deg, #f7306a, #8057d8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                    MomAI
                </h1>
                <p className="text-sm mt-1" style={{color: '#9b7fa8'}}>
                    AI Smart Mom & Baby Super App ✨
                </p>
            </div>

            <div className="rounded-3xl shadow-xl p-8 backdrop-blur-sm"
                 style={{background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,193,213,0.4)'}}>

                <h2 className="text-xl font-semibold mb-1" style={{color: '#3d1f2e'}}>
                    Set a new password 🔒
                </h2>
                <p className="text-sm mb-6" style={{color: '#9b7fa8'}}>
                    Choose a strong password to protect your account.
                </p>

                <div className="space-y-4">
                    {!initialToken && (
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{color: '#5c3d52'}}>
                                Reset Token
                            </label>
                            <input
                                type="text"
                                placeholder="Paste your reset token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                                style={{background: '#fff9fb', border: '2px solid #ffc0d5', color: '#3d1f2e'}}
                                onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                                onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#5c3d52'}}>
                            New Password
                        </label>
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                            style={{background: '#fff9fb', border: '2px solid #ffc0d5', color: '#3d1f2e'}}
                            onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                            onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5" style={{color: '#5c3d52'}}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                            style={{background: '#fff9fb', border: '2px solid #ffc0d5', color: '#3d1f2e'}}
                            onFocus={e => (e.target.style.borderColor = '#ff91b3')}
                            onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                        />
                    </div>

                    {mismatch && (
                        <p className="text-xs rounded-xl px-3 py-2"
                           style={{background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5'}}>
                            Passwords do not match.
                        </p>
                    )}

                    {reset.isError && (
                        <p className="text-xs rounded-xl px-3 py-2"
                           style={{background: '#fff1f5', color: '#e0155a', border: '1px solid #ffc0d5'}}>
                            {(reset.error as Error)?.message ?? 'Reset failed. The link may have expired.'}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={reset.isPending || !token || !newPassword || !confirm}
                        className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60 mt-2"
                        style={{
                            background: 'linear-gradient(135deg, #f7306a, #8057d8)',
                            boxShadow: '0 4px 20px rgba(247,48,106,0.3)'
                        }}
                    >
                        {reset.isPending ? '✨ Resetting...' : 'Reset Password'}
                    </button>
                </div>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px" style={{background: '#ffc0d5'}}/>
                    <span className="text-xs" style={{color: '#c49ab5'}}>or</span>
                    <div className="flex-1 h-px" style={{background: '#ffc0d5'}}/>
                </div>

                <p className="text-center text-sm" style={{color: '#9b7fa8'}}>
                    Back to{' '}
                    <a href="/login" className="font-semibold" style={{color: '#f7306a'}}>
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
