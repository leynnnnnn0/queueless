<?php
namespace App\Models;
use App\Enums\DeviceCommandStatus; use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class DeviceCommand extends Model { protected $guarded=[]; protected function casts(): array { return ['status'=>DeviceCommandStatus::class,'requested_payload'=>'array','response_payload'=>'array','attempted_at'=>'datetime','completed_at'=>'datetime']; } public function order(): BelongsTo { return $this->belongsTo(PrintOrder::class, 'print_order_id'); } }
