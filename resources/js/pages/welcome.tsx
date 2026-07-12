import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    FileUp,
    LockKeyhole,
    Printer,
    ShieldCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { dashboard, login, register } from '@/routes';

const steps = [
    {
        icon: FileUp,
        title: 'Upload your PDF',
        text: 'Send your document securely from any device.',
    },
    {
        icon: Printer,
        title: 'We print it',
        text: 'Your order is printed and prepared automatically.',
    },
    {
        icon: LockKeyhole,
        title: 'Pick up, queue-free',
        text: 'Use your private code to open the assigned locker.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Upload. Print. Pick Up. No Queue.">
                <meta
                    name="description"
                    content="QueueLess is a secure, contactless document printing and locker pickup service."
                />
            </Head>
            <div className="min-h-screen bg-slate-950 text-white">
                <header className="border-b border-white/10">
                    <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                        <AppLogo />
                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                                    >
                                        Get started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,.18),transparent_35%)]" />
                        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:py-32">
                            <div>
                                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                                    <ShieldCheck className="size-4" /> Secure,
                                    contactless printing
                                </div>
                                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
                                    Your documents, ready{' '}
                                    <span className="text-cyan-400">
                                        when you are.
                                    </span>
                                </h1>
                                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                                    Upload your files, let us handle the
                                    printing, then collect them from a secure
                                    locker—without waiting in line.
                                </p>
                                <div className="mt-10 flex flex-wrap gap-4">
                                    <Link
                                        href="/print"
                                        className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 hover:bg-cyan-300"
                                    >
                                        Start printing{' '}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    <Link
                                        href="/pickup"
                                        className="rounded-full border border-white/20 px-6 py-3.5 font-semibold hover:bg-white/5"
                                    >
                                        Claim my document
                                    </Link>
                                    <a
                                        href="#how-it-works"
                                        className="rounded-full border border-white/20 px-6 py-3.5 font-semibold hover:bg-white/5"
                                    >
                                        See how it works
                                    </a>
                                </div>
                            </div>
                            <div className="self-center rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
                                <div className="rounded-2xl bg-slate-900 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">
                                            Document pickup
                                        </span>
                                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                            Ready
                                        </span>
                                    </div>
                                    <div className="my-8 flex justify-center">
                                        <div className="grid size-36 place-items-center rounded-3xl border-2 border-cyan-400/50 bg-cyan-400/10">
                                            <LockKeyhole className="size-14 text-cyan-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        {[
                                            'Printing completed',
                                            'Stored in Locker 04',
                                            'Private pickup code issued',
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle2 className="size-5 text-emerald-400" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="how-it-works"
                        className="bg-slate-50 py-24 text-slate-950"
                    >
                        <div className="mx-auto max-w-6xl px-6">
                            <div className="max-w-2xl">
                                <p className="font-semibold text-cyan-700">
                                    Simple by design
                                </p>
                                <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                                    Upload. Print. Pick Up. No Queue.
                                </h2>
                            </div>
                            <div className="mt-14 grid gap-6 md:grid-cols-3">
                                {steps.map(
                                    ({ icon: Icon, title, text }, index) => (
                                        <article
                                            key={title}
                                            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="grid size-12 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
                                                    <Icon className="size-6" />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-400">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-xl font-semibold">
                                                {title}
                                            </h3>
                                            <p className="mt-3 leading-7 text-slate-600">
                                                {text}
                                            </p>
                                        </article>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="border-t border-white/10 py-8">
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-400 sm:flex-row sm:justify-between">
                        <span>© {new Date().getFullYear()} QueueLess</span>
                        <span>Fast, secure, contactless document pickup.</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
