import { useEffect } from 'react';
import { initializeEcho } from '@/lib/echo';

export type OrderStatusUpdate = {
    status: string;
    message: string;
    at: string;
};

export function useOrderStatus(
    reference: string,
    onUpdate: (update: OrderStatusUpdate) => void,
): void {
    useEffect(() => {
        initializeEcho();
        const channel = window.Echo?.channel(`orders.${reference}`);
        channel?.listen('.order.status.updated', onUpdate);

        return () => window.Echo?.leave(`orders.${reference}`);
    }, [onUpdate, reference]);
}
