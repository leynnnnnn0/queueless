<?php

namespace App\Events;

use App\Models\PrintOrder;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public string $reference,
        public string $status,
        public string $message,
        public string $occurredAt,
    ) {}

    public static function fromOrder(PrintOrder $order, string $message): self
    {
        return new self(
            $order->public_reference,
            $order->status->value,
            $message,
            now()->toIso8601String(),
        );
    }

    public function broadcastOn(): Channel
    {
        return new Channel("orders.{$this->reference}");
    }

    public function broadcastAs(): string
    {
        return 'order.status.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'status' => $this->status,
            'message' => $this->message,
            'at' => $this->occurredAt,
        ];
    }
}
