<?php

namespace App\Jobs;

use App\Contracts\PrinterServiceInterface;
use App\Enums\LockerStatus;
use App\Enums\PrintOrderStatus;
use App\Models\PrintOrder;
use App\Services\Esp32DeviceService;
use App\Services\LockerAssignmentService;
use App\Services\OrderStatusService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SimulatePrintJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $orderId) {}

    public function handle(
        PrinterServiceInterface $printer,
        OrderStatusService $statuses,
        Esp32DeviceService $device,
        LockerAssignmentService $lockers,
    ): void {
        $order = PrintOrder::findOrFail($this->orderId);

        try {
            $statuses->transition($order, PrintOrderStatus::Printing, 'Printing started.', ['printing_started_at' => now()]);
            $printer->print($order);
            $statuses->transition($order, PrintOrderStatus::Printed, 'Printing completed.', ['printing_completed_at' => now()]);
            $statuses->transition($order, PrintOrderStatus::WaitingForPaper, 'Waiting for the paper to settle.');
            sleep(max(0, (int) config('queueless.paper_settle_seconds')));
            $statuses->transition($order, PrintOrderStatus::DroppingToLocker, 'Moving the document into its locker.');
            $device->openCatcher($order);
            sleep(max(0, (int) config('queueless.catcher_open_seconds')));
            $device->closeCatcher($order);
            $order->locker()->update(['status' => LockerStatus::Occupied]);
            $device->setLockerOccupied($order);
            $statuses->transition($order, PrintOrderStatus::ReadyForPickup, 'Your document is ready for pickup.', ['ready_at' => now()]);
        } catch (\Throwable $exception) {
            $statuses->transition($order, PrintOrderStatus::Failed, 'The order could not be completed.', ['failure_reason' => $exception->getMessage()]);
            $lockers->release($order);

            throw $exception;
        }
    }
}
