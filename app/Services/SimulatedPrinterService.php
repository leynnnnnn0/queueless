<?php
namespace App\Services;
use App\Contracts\PrinterServiceInterface; use App\Models\PrintOrder;
class SimulatedPrinterService implements PrinterServiceInterface { public function print(PrintOrder $order): void { sleep(max(0, (int) config('queueless.print_seconds'))); } }
