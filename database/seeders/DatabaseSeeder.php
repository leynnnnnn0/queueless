<?php

namespace Database\Seeders;

use App\Models\Locker;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Locker::firstOrCreate(['locker_number' => 1]);
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'test@example.com')],
            [
                'name' => env('ADMIN_NAME', 'QueueLess Admin'),
                'email_verified_at' => now(),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
            ],
        );
    }
}
