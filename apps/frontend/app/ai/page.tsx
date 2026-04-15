'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthGuard } from '@/lib/useAuthGuard';
import { useAiChat } from '@/lib/hooks/useAiChat';

type Message = {
    id: number;
    role: 'user' | 'ai';
    text: string;
};

const SUGGESTIONS = [
    'How much should a 3-month-old sleep?',
    'When should I introduce solid foods?',
    'My baby cries after every feeding — why?',
    'Tips for a healthy sleep schedule',
];

let nextId = 1;

export default function AiChat() {
    useAuthGuard();

    const router = useRouter();
    const aiChat = useAiChat();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nextId++,
            role: 'ai',
            text: "Hi Mama! 🌸 I'm your AI baby care assistant. Ask me anything about sleep, feeding, growth, or development!",
        },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, aiChat.isPending]);

    const send = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || aiChat.isPending) return;

        setInput('');
        setMessages(prev => [...prev, { id: nextId++, role: 'user', text: trimmed }]);

        aiChat.mutate(trimmed, {
            onSuccess: (data) => {
                setMessages(prev => [...prev, { id: nextId++, role: 'ai', text: data.reply }]);
                inputRef.current?.focus();
            },
            onError: () => {
                inputRef.current?.focus();
            },
        });
    };

    return (
        <main className="min-h-screen flex flex-col"
            style={{ background: 'linear-gradient(160deg, #fff1f5 0%, #f5f0ff 60%, #fff7f0 100%)' }}>

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #d9cbff, transparent)' }} />
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ffc0d5, transparent)' }} />
            </div>

            {/* Header */}
            <header className="relative z-10 max-w-lg w-full mx-auto flex items-center justify-between px-4 py-5">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.8)', color: '#8057d8', border: '1px solid #d9cbff' }}>
                    ←
                </button>

                <div className="text-center">
                    <h1 className="text-base font-bold"
                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        AI Assistant
                    </h1>
                    <p className="text-xs" style={{ color: '#9b7fa8' }}>Powered by Llama 3.3</p>
                </div>

                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'linear-gradient(135deg, #ff91b3, #bea6ff)' }}>
                    🧠
                </div>
            </header>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4 max-w-lg w-full mx-auto">

                {/* Suggestion chips — shown only before any user message */}
                {messages.length === 1 && (
                    <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                            style={{ color: '#c4a0b8' }}>
                            Suggested questions
                        </p>
                        <div className="flex flex-col gap-2">
                            {SUGGESTIONS.map(s => (
                                <button
                                    key={s}
                                    onClick={() => send(s)}
                                    disabled={aiChat.isPending}
                                    className="text-left text-sm px-4 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                                    style={{
                                        background: 'rgba(255,255,255,0.85)',
                                        border: '1px solid rgba(217,203,255,0.6)',
                                        color: '#8057d8',
                                    }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {messages.map(msg => (
                        <div key={msg.id}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                                style={{
                                    background: msg.role === 'ai'
                                        ? 'linear-gradient(135deg, #ff91b3, #bea6ff)'
                                        : 'linear-gradient(135deg, #f7306a, #8057d8)',
                                }}>
                                {msg.role === 'ai' ? '🧠' : '👩'}
                            </div>

                            {/* Bubble */}
                            <div className="max-w-[78%] px-4 py-3 rounded-3xl text-sm leading-relaxed"
                                style={
                                    msg.role === 'ai'
                                        ? {
                                            background: 'rgba(255,255,255,0.9)',
                                            border: '1px solid rgba(217,203,255,0.5)',
                                            color: '#3d1f2e',
                                            borderTopLeftRadius: 6,
                                        }
                                        : {
                                            background: 'linear-gradient(135deg, #f7306a, #8057d8)',
                                            color: 'white',
                                            borderTopRightRadius: 6,
                                        }
                                }>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {aiChat.isPending && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #ff91b3, #bea6ff)' }}>
                                🧠
                            </div>
                            <div className="px-4 py-3 rounded-3xl flex items-center gap-1"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    border: '1px solid rgba(217,203,255,0.5)',
                                    borderTopLeftRadius: 6,
                                }}>
                                <span className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: '#bea6ff', animationDelay: '0ms' }} />
                                <span className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: '#ff91b3', animationDelay: '150ms' }} />
                                <span className="w-2 h-2 rounded-full animate-bounce"
                                    style={{ background: '#bea6ff', animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>

                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="relative z-10 px-4 pb-6 pt-3 max-w-lg w-full mx-auto"
                style={{
                    background: 'rgba(255,249,251,0.9)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(255,193,213,0.4)',
                }}>

                {aiChat.isError && (
                    <p className="text-xs text-center mb-2" style={{ color: '#e0155a' }}>Something went wrong. Please try again.</p>
                )}

                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send(input)}
                        placeholder="Ask anything about your baby…"
                        className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
                        style={{ background: 'white', border: '2px solid #ffc0d5', color: '#3d1f2e' }}
                        onFocus={e => (e.target.style.borderColor = '#8057d8')}
                        onBlur={e => (e.target.style.borderColor = '#ffc0d5')}
                    />
                    <button
                        onClick={() => send(input)}
                        disabled={aiChat.isPending || !input.trim()}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg transition-all active:scale-95 disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #f7306a, #8057d8)', boxShadow: '0 4px 16px rgba(247,48,106,0.3)' }}>
                        ↑
                    </button>
                </div>
            </div>
        </main>
    );
}
