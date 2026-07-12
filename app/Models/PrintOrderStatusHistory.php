<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class PrintOrderStatusHistory extends Model { protected $guarded=[]; public function order(): BelongsTo { return $this->belongsTo(PrintOrder::class, 'print_order_id'); } }
