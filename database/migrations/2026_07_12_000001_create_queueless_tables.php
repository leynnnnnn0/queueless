<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('lockers', function (Blueprint $table) { $table->id(); $table->unsignedInteger('locker_number')->unique(); $table->string('status')->default('available')->index(); $table->boolean('active')->default(true); $table->unsignedBigInteger('current_order_id')->nullable(); $table->timestamps(); });
        Schema::create('print_orders', function (Blueprint $table) { $table->id(); $table->string('public_reference')->unique(); $table->string('email'); $table->string('pickup_code_hash'); $table->string('pickup_code_last_four', 4); $table->string('pdf_path'); $table->string('original_filename'); $table->foreignId('locker_id')->constrained(); $table->string('status')->index(); $table->dateTime('requested_pickup_at'); $table->dateTime('expires_at')->index(); $table->dateTime('printing_started_at')->nullable(); $table->dateTime('printing_completed_at')->nullable(); $table->dateTime('ready_at')->nullable(); $table->dateTime('claimed_at')->nullable(); $table->dateTime('discarded_at')->nullable(); $table->text('failure_reason')->nullable(); $table->timestamps(); });
        Schema::table('lockers', fn (Blueprint $table) => $table->foreign('current_order_id')->references('id')->on('print_orders')->nullOnDelete());
        Schema::create('print_order_status_histories', function (Blueprint $table) { $table->id(); $table->foreignId('print_order_id')->constrained()->cascadeOnDelete(); $table->string('previous_status')->nullable(); $table->string('new_status'); $table->string('message')->nullable(); $table->timestamps(); });
        Schema::create('device_commands', function (Blueprint $table) { $table->id(); $table->foreignId('print_order_id')->nullable()->constrained()->nullOnDelete(); $table->string('command_type'); $table->string('target_servo'); $table->json('requested_payload'); $table->json('response_payload')->nullable(); $table->string('status')->index(); $table->dateTime('attempted_at'); $table->dateTime('completed_at')->nullable(); $table->text('failure_message')->nullable(); $table->timestamps(); });
    }
    public function down(): void { Schema::dropIfExists('device_commands'); Schema::dropIfExists('print_order_status_histories'); Schema::table('lockers', fn (Blueprint $table) => $table->dropForeign(['current_order_id'])); Schema::dropIfExists('print_orders'); Schema::dropIfExists('lockers'); }
};
