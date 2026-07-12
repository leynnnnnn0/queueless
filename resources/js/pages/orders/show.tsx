import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import PublicShell from '@/components/public-shell';
type Order = {
    reference: string;
    status: string;
    locker: number;
    pickup_at: string;
    expires_at: string;
    filename: string;
    code_last_four: string;
    history: { status: string; message: string; at: string }[];
};
const label = (s: string) =>
    s
        .split('_')
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join(' ');
const date = (s: string) =>
    new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(s));
export default function ShowOrder({
    order,
    pickupCode,
}: {
    order: Order;
    pickupCode?: string;
}) {
    const flash = usePage().props.flash as { success?: string } | undefined;

    return (
        <PublicShell>
            <Head title={`Track ${order.reference}`} />
            <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                    <p className="text-cyan-300">Order {order.reference}</p>
                    <h1 className="mt-2 text-4xl font-semibold">
                        {label(order.status)}
                    </h1>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                    Locker {order.locker}
                </span>
            </div>
            {pickupCode && (
                <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                    <p className="text-sm text-emerald-200">
                        Save your one-time pickup code
                    </p>
                    <p className="mt-2 text-4xl font-semibold tracking-[.3em]">
                        {pickupCode}
                    </p>
                </div>
            )}
            {flash?.success && (
                <div className="mt-8 rounded-2xl bg-emerald-400/10 p-5 text-emerald-200">
                    {flash.success}
                </div>
            )}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                    ['File', order.filename],
                    ['Pickup', date(order.pickup_at)],
                    ['Expires', date(order.expires_at)],
                ].map(([k, v]) => (
                    <div
                        key={k}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                        <p className="text-sm text-slate-400">{k}</p>
                        <p className="mt-2 font-medium">{v}</p>
                    </div>
                ))}
            </div>
            <section className="mt-12">
                <h2 className="text-2xl font-semibold">Status timeline</h2>
                <div className="mt-6 space-y-5">
                    {order.history.map((h) => (
                        <div key={h.at} className="flex gap-4">
                            <CheckCircle2 className="mt-1 size-5 shrink-0 text-cyan-300" />
                            <div>
                                <p className="font-medium">{label(h.status)}</p>
                                <p className="text-sm text-slate-400">
                                    {h.message} · {date(h.at)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="mt-12 flex gap-4">
                <Link
                    href="/pickup"
                    className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
                >
                    Enter pickup code
                </Link>
                <Link
                    href="/print"
                    className="rounded-xl border border-white/15 px-5 py-3"
                >
                    New request
                </Link>
            </div>
        </PublicShell>
    );
}
