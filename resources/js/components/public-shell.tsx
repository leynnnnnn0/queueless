import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogo from './app-logo';
export default function PublicShell({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-white/10">
                <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
                    <Link href="/">
                        <AppLogo />
                    </Link>
                    <nav className="flex gap-4 text-sm text-slate-300">
                        <Link href="/print">Print</Link>
                        <Link href="/pickup">Pickup</Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-6 py-14">{children}</main>
        </div>
    );
}
