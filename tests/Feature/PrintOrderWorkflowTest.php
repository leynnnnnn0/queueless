<?php

use App\Enums\LockerStatus;
use App\Enums\PrintOrderStatus;
use App\Jobs\ClosePickupLockerJob;
use App\Jobs\SimulatePrintJob;
use App\Models\DeviceCommand;
use App\Models\Locker;
use App\Models\PrintOrder;
use App\Services\PickupCodeService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;

beforeEach(function () { Storage::fake('local'); });

test('order submission reserves a locker and queues printing', function () {
    Queue::fake();
    $locker = Locker::create(['locker_number' => 1]);
    $response = $this->post(route('orders.store'), ['email'=>'customer@example.com','pickup_at'=>now()->addHour()->toDateTimeString(),'pdf'=>UploadedFile::fake()->createWithContent('sample.pdf', '%PDF-1.4 sample'),'terms'=>'1']);
    $order = PrintOrder::first();
    $response->assertRedirect(route('orders.show', $order->public_reference));
    expect($order->locker_id)->toBe($locker->id)->and($locker->fresh()->status)->toBe(LockerStatus::Reserved)->and($order->pickup_code_hash)->not->toBeEmpty();
    Storage::disk('local')->assertExists($order->pdf_path);
    Queue::assertPushed(SimulatePrintJob::class);
});

test('order submission is rejected without an available locker', function () {
    Locker::create(['locker_number'=>1,'status'=>LockerStatus::Occupied]);
    $this->from(route('orders.create'))->post(route('orders.store'), ['email'=>'customer@example.com','pickup_at'=>now()->addHour()->toDateTimeString(),'pdf'=>UploadedFile::fake()->createWithContent('sample.pdf','%PDF-1.4'),'terms'=>'1'])->assertRedirect(route('orders.create'))->assertSessionHasErrors('locker');
    expect(PrintOrder::count())->toBe(0);
});

test('non pdf uploads are rejected', function () {
    Locker::create(['locker_number'=>1]);
    $this->post(route('orders.store'), ['email'=>'customer@example.com','pickup_at'=>now()->addHour()->toDateTimeString(),'pdf'=>UploadedFile::fake()->create('notes.txt',10,'text/plain'),'terms'=>'1'])->assertSessionHasErrors('pdf');
});

test('correct pickup code opens locker once without real http', function () {
    Queue::fake(); config(['queueless.hardware_simulation'=>true]);
    $codes=app(PickupCodeService::class); $locker=Locker::create(['locker_number'=>1,'status'=>LockerStatus::Occupied]);
    $order=PrintOrder::create(['public_reference'=>'QL-TEST123456','email'=>'a@b.test','pickup_code_hash'=>$codes->hash('123456'),'pickup_code_last_four'=>'3456','pdf_path'=>'private.pdf','original_filename'=>'private.pdf','locker_id'=>$locker->id,'status'=>PrintOrderStatus::ReadyForPickup,'requested_pickup_at'=>now()->addHour(),'expires_at'=>now()->addHours(2)]);
    $this->post(route('pickup.store'),['code'=>'123456'])->assertRedirect(route('orders.show',$order->public_reference));
    expect($order->fresh()->status)->toBe(PrintOrderStatus::OpeningLocker)->and(DeviceCommand::first()->response_payload['simulated'])->toBeTrue();
    Queue::assertPushed(ClosePickupLockerJob::class);
    $this->post(route('pickup.store'),['code'=>'123456'])->assertSessionHasErrors('code');
});
