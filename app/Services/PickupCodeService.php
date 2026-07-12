<?php
namespace App\Services;
use Illuminate\Support\Facades\Hash;
class PickupCodeService { public function generate(): string { return (string) random_int(100000, 999999); } public function hash(string $code): string { return Hash::make($code); } public function verify(string $code, string $hash): bool { return Hash::check($code, $hash); } }
