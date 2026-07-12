import { Form, Head } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';
import InputError from '@/components/input-error';
import PublicShell from '@/components/public-shell';
export default function Pickup() {
    return (
        <PublicShell>
            <Head title="Claim my document" />
            <div className="mx-auto max-w-lg text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-cyan-400/10">
                    <LockKeyhole className="text-cyan-300" />
                </div>
                <h1 className="mt-6 text-4xl font-semibold">
                    Claim your document
                </h1>
                <p className="mt-3 text-slate-300">
                    Enter the six-digit code once your order is ready.
                </p>
                <Form action="/pickup" method="post" className="mt-10">
                    {({ errors, processing }) => (
                        <>
                            <input
                                name="code"
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                required
                                autoFocus
                                aria-label="Pickup code"
                                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-5 text-center text-3xl tracking-[.35em]"
                            />
                            <InputError message={errors.code} />
                            <button
                                disabled={processing}
                                className="mt-5 w-full rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 disabled:opacity-50"
                            >
                                {processing ? 'Checking…' : 'Open my locker'}
                            </button>
                        </>
                    )}
                </Form>
            </div>
        </PublicShell>
    );
}
