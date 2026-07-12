<?php
namespace App\Models;
use App\Enums\LockerStatus; use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Locker extends Model { protected $guarded = []; protected function casts(): array { return ['active'=>'boolean','status'=>LockerStatus::class]; } public function currentOrder(): BelongsTo { return $this->belongsTo(PrintOrder::class, 'current_order_id'); } }
