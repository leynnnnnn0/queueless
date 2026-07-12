import { Form, Head } from '@inertiajs/react';
import { FileUp, Info } from 'lucide-react';
import InputError from '@/components/input-error';
import PublicShell from '@/components/public-shell';
export default function CreateOrder({
    maxUploadMb,
    simulation,
}: {
    maxUploadMb: number;
    simulation: boolean;
}) {
    return (
        <PublicShell>
            <Head title="New print request" />
            <div className="grid gap-10 lg:grid-cols-[1fr_.65fr]">
                <section>
                    <p className="font-semibold text-cyan-300">
                        New print request
                    </p>
                    <h1 className="mt-2 text-4xl font-semibold">
                        Send your document
                    </h1>
                    <p className="mt-4 text-slate-300">
                        Upload a PDF and choose when you plan to collect it.
                    </p>
                    <Form
                        action="/print"
                        method="post"
                        encType="multipart/form-data"
                        className="mt-10 space-y-6"
                        disableWhileProcessing
                    >
                        {({ errors, processing }) => (
                            <>
                                <label className="block">
                                    <span className="text-sm">
                                        Email address
                                    </span>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3"
                                    />
                                    <InputError message={errors.email} />
                                </label>
                                <label className="block">
                                    <span className="text-sm">
                                        Pickup date and time
                                    </span>
                                    <input
                                        name="pickup_at"
                                        type="datetime-local"
                                        required
                                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 [color-scheme:dark]"
                                    />
                                    <InputError message={errors.pickup_at} />
                                </label>
                                <label className="block rounded-2xl border border-dashed border-cyan-400/40 bg-cyan-400/5 p-6">
                                    <span className="flex items-center gap-3 font-medium">
                                        <FileUp /> Choose a PDF
                                    </span>
                                    <input
                                        name="pdf"
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        required
                                        className="mt-4 block w-full text-sm"
                                    />
                                    <span className="mt-2 block text-xs text-slate-400">
                                        PDF only, up to {maxUploadMb} MB
                                    </span>
                                    <InputError message={errors.pdf} />
                                </label>
                                <label className="flex gap-3 text-sm text-slate-300">
                                    <input
                                        name="terms"
                                        value="1"
                                        type="checkbox"
                                        required
                                        className="mt-1"
                                    />
                                    <span>
                                        I understand that I must save my pickup
                                        code and collect before the expiration
                                        deadline.
                                    </span>
                                </label>
                                <InputError message={errors.terms} />
                                <InputError message={errors.locker} />
                                <button
                                    disabled={processing}
                                    className="w-full rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Submitting…'
                                        : 'Submit print request'}
                                </button>
                            </>
                        )}
                    </Form>
                </section>
                <aside className="rounded-3xl border border-white/10 bg-white/5 p-7">
                    <Info className="text-cyan-300" />
                    <h2 className="mt-5 text-xl font-semibold">
                        Before you submit
                    </h2>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                        <li>• Upload PDF files only.</li>
                        <li>• Double-check your pickup time.</li>
                        <li>• Save the six-digit pickup code.</li>
                        <li>• Unclaimed documents move to the discard tray.</li>
                    </ul>
                    {simulation && (
                        <div className="mt-8 rounded-xl bg-amber-400/10 p-4 text-sm text-amber-200">
                            Prototype mode: printing and hardware commands are
                            simulated.
                        </div>
                    )}
                </aside>
            </div>
        </PublicShell>
    );
}
