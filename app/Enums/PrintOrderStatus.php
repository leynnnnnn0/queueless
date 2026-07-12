<?php

namespace App\Enums;

enum PrintOrderStatus: string
{
    case Pending = 'pending'; case CheckingLocker = 'checking_locker'; case Printing = 'printing';
    case Printed = 'printed'; case WaitingForPaper = 'waiting_for_paper'; case DroppingToLocker = 'dropping_to_locker';
    case ReadyForPickup = 'ready_for_pickup'; case OpeningLocker = 'opening_locker'; case Claimed = 'claimed';
    case Expired = 'expired'; case DroppingToTrash = 'dropping_to_trash'; case Discarded = 'discarded'; case Failed = 'failed';
}
