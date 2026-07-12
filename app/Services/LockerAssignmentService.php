<?php
namespace App\Services;
use App\Enums\LockerStatus; use App\Models\Locker; use App\Models\PrintOrder; use RuntimeException;
class LockerAssignmentService { public function reserve(): Locker { $locker=Locker::query()->where('active',true)->where('status',LockerStatus::Available)->lockForUpdate()->first(); if(!$locker) throw new RuntimeException('No locker is currently available. Please try again later.'); $locker->update(['status'=>LockerStatus::Reserved]); return $locker; } public function attach(Locker $locker, PrintOrder $order): void { $locker->update(['current_order_id'=>$order->id]); } public function release(PrintOrder $order): void { $order->locker()->update(['status'=>LockerStatus::Available,'current_order_id'=>null]); } }
