<?php
namespace App\Services;
use App\Enums\PrintOrderStatus; use App\Models\PrintOrder;
class OrderStatusService { public function transition(PrintOrder $order, PrintOrderStatus $status, ?string $message=null, array $attributes=[]): void { $previous=$order->status; $order->update([...$attributes,'status'=>$status]); $order->histories()->create(['previous_status'=>$previous?->value,'new_status'=>$status->value,'message'=>$message]); } }
