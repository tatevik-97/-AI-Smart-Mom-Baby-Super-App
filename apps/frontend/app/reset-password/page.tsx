import { Suspense } from 'react';
import { ResetPasswordForm } from './reset-password-form';

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4"
              style={{background: 'linear-gradient(135deg, #fff1f5 0%, #f5f0ff 50%, #fff7f0 100%)'}}>

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30"
                     style={{background: 'radial-gradient(circle, #ffc0d5, transparent)'}}/>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-30"
                     style={{background: 'radial-gradient(circle, #d9cbff, transparent)'}}/>
            </div>

            <Suspense fallback={null}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}