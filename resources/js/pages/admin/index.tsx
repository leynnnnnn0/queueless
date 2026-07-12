import { Form, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
type O = {
    reference: string;
    status: string;
    locker: number;
    pickup_at: string;
    expires_at: string;
    latest_command?: Record<string, unknown>;
};
export default function Admin({
    orders,
    simulation,
}: {
    orders: O[];
    simulation: boolean;
}) {
    return (
        <AppLayout>
            <Head title="QueueLess admin" />
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold">Operations</h1>
                    {simulation && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                            Hardware simulation
                        </span>
                    )}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                    {['catcher', 'pickup', 'trash'].flatMap((servo) =>
                        ['open', 'close'].map((action) => (
                            <Form
                                key={servo + action}
                                action="/admin/device-command"
                                method="post"
                            >
                                <input
                                    type="hidden"
                                    name="servo"
                                    value={servo}
                                />
                                <input
                                    type="hidden"
                                    name="action"
                                    value={action}
                                />
                                <button className="rounded-lg border px-3 py-2 text-sm capitalize">
                                    {action} {servo}
                                </button>
                            </Form>
                        )),
                    )}
                </div>
                <div className="mt-8 overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-4">Reference</th>
                                <th>Status</th>
                                <th>Locker</th>
                                <th>Pickup</th>
                                <th>Latest device command</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr
                                    key={o.reference}
                                    className="border-b last:border-0"
                                >
                                    <td className="p-4 font-medium">
                                        {o.reference}
                                    </td>
                                    <td>{o.status}</td>
                                    <td>{o.locker}</td>
                                    <td>
                                        {new Date(o.pickup_at).toLocaleString()}
                                    </td>
                                    <td className="max-w-xs truncate">
                                        {o.latest_command
                                            ? JSON.stringify(o.latest_command)
                                            : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
