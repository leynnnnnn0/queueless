<?php
namespace App\Enums;
enum DeviceCommandStatus: string { case Pending = 'pending'; case Succeeded = 'succeeded'; case Failed = 'failed'; }
