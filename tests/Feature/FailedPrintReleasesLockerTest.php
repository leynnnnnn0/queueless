<?php

use App\Contracts\PrinterServiceInterface;
use App\Enums\LockerStatus;
use App\Enums\PrintOrderStatus;
use App\Jobs\SimulatePrintJob;
use App\Models\Locker;
use App\Models\PrintOrder;

test('a failed print workflow releases its reserved locker', function () {
    $this->app->bind(PrinterServiceInterface::class, fn () => new class implements PrinterServiceInterface
    {
        public function print(PrintOrder $order): void
        {
            throw new RuntimeException('Printer unavailable.');
        }
    });

    $locker = Locker::create(['locker_number' => 1, 'status' => LockerStatus::Reserved]);
    $order = PrintOrder::create([
        'public_reference' => 'QL-FAILTEST01', 'email' => 'test@example.com',
        'pickup_code_hash' => 'hash', 'pickup_code_last_four' => '0000',
        'pdf_path' => 'test.pdf', 'original_filename' => 'test.pdf',
        'locker_id' => $locker->id, 'status' => PrintOrderStatus::Pending,
        'requested_pickup_at' => now()->addHour(), 'expires_at' => now()->addHours(2),
    ]);
    $locker->update(['current_order_id' => $order->id]);

    expect(fn () => app()->call([new SimulatePrintJob($order->id), 'handle']))->toThrow(RuntimeException::class);
    expect($order->fresh()->status)->toBe(PrintOrderStatus::Failed)
        ->and($locker->fresh()->status)->toBe(LockerStatus::Available)
        ->and($locker->fresh()->current_order_id)->toBeNull();
});
