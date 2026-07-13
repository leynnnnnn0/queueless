<?php

namespace App\Services;

use App\Enums\PrintOrderStatus;
use App\Events\OrderStatusUpdated;
use App\Models\PrintOrder;
use Illuminate\Support\Facades\Log;

class OrderStatusService
{
    public function transition(
        PrintOrder $order,
        PrintOrderStatus $status,
        ?string $message = null,
        array $attributes = [],
    ): void {
        $previous = $order->status;
        $order->update([...$attributes, 'status' => $status]);
        $order->histories()->create([
            'previous_status' => $previous?->value,
            'new_status' => $status->value,
            'message' => $message,
        ]);

        try {
            broadcast(OrderStatusUpdated::fromOrder($order, $message ?? 'Order status updated.'));
        } catch (\Throwable $exception) {
            Log::warning('Order status broadcast failed.', [
                'order_reference' => $order->public_reference,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
