<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Enums\PrintOrderStatus;
use App\Jobs\DiscardExpiredOrderJob;
use App\Models\PrintOrder;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
Schedule::call(fn () => PrintOrder::where('status', PrintOrderStatus::ReadyForPickup)->where('expires_at', '<=', now())->pluck('id')->each(fn ($id) => DiscardExpiredOrderJob::dispatch($id)))->name('discard-expired-orders')->everyMinute()->withoutOverlapping();
