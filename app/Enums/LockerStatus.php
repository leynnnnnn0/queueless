<?php
namespace App\Enums;
enum LockerStatus: string { case Available = 'available'; case Reserved = 'reserved'; case Occupied = 'occupied'; case Opening = 'opening'; case Maintenance = 'maintenance'; }
