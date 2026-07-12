<?php

return [
    'upload_max_kilobytes' => (int) env('PDF_UPLOAD_MAX_KB', 10240),
    'print_seconds' => (int) env('SIMULATED_PRINT_SECONDS', 10),
    'paper_settle_seconds' => (int) env('PAPER_SETTLE_SECONDS', 5),
    'catcher_open_seconds' => (int) env('CATCHER_OPEN_SECONDS', 2),
    'locker_open_seconds' => (int) env('LOCKER_OPEN_SECONDS', 30),
    'trash_open_seconds' => (int) env('TRASH_OPEN_SECONDS', 3),
    'expiry_grace_minutes' => (int) env('ORDER_EXPIRY_GRACE_MINUTES', 5),
    'hardware_simulation' => (bool) env('HARDWARE_SIMULATION', true),
    'printer_simulation' => (bool) env('PRINTER_SIMULATION', true),
    'esp32' => [
        'base_url' => env('ESP32_BASE_URL', 'http://192.168.1.100'),
        'api_key' => env('ESP32_API_KEY', 'change-this-secret'),
        'timeout' => (int) env('ESP32_REQUEST_TIMEOUT', 5),
    ],
];
