<?php
namespace App\Contracts;
use App\Models\PrintOrder;
interface PrinterServiceInterface { public function print(PrintOrder $order): void; }
