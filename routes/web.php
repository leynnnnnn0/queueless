<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PickupController;
use App\Http\Controllers\PrintOrderController;

Route::inertia('/', 'welcome')->name('home');
Route::get('/print', [PrintOrderController::class, 'create'])->name('orders.create');
Route::post('/print', [PrintOrderController::class, 'store'])->name('orders.store');
Route::get('/track/{reference}', [PrintOrderController::class, 'show'])->name('orders.show');
Route::post('/track', [PrintOrderController::class, 'lookup'])->middleware('throttle:10,1')->name('orders.lookup');
Route::get('/pickup', [PickupController::class, 'create'])->name('pickup.create');
Route::post('/pickup', [PickupController::class, 'store'])->middleware('throttle:5,1')->name('pickup.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () { Route::get('/', [AdminController::class, 'index'])->name('index'); Route::post('/device-command', [AdminController::class, 'command'])->name('command'); });

require __DIR__.'/settings.php';
