# QueueLess

**Upload. Print. Pick Up. No Queue.** QueueLess is a Laravel, Inertia, and React prototype for automated PDF printing and secure locker collection. Printing and ESP32 commands are simulated by default; the same workflow can drive the included three-servo controller.

## Requirements

PHP 8.2+, Composer, Node.js 20+, npm, SQLite or MySQL, and PlatformIO for firmware. Redis is optional; the database queue works locally. Install the appropriate ESP32 USB/UART driver if the board is not detected.

## Laravel setup

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
npm install
npm run dev
```

In separate terminals run:

```bash
php artisan serve
php artisan queue:work
php artisan schedule:work
```

Use `QUEUE_CONNECTION=database`. The jobs-table migration is already included. Uploaded PDFs are stored privately under `storage/app/private/print-orders`; no public storage link is required for them. In production run the scheduler each minute: `* * * * * cd /path/to/queueless && php artisan schedule:run >> /dev/null 2>&1`.

Key settings in `.env` include simulation durations, expiry grace, PDF limit, `HARDWARE_SIMULATION`, `PRINTER_SIMULATION`, `ESP32_BASE_URL`, `ESP32_API_KEY`, and `ESP32_REQUEST_TIMEOUT`. Use short durations for local testing.

## Pages

- Public landing: `http://127.0.0.1:8000/`
- New request: `http://127.0.0.1:8000/print`
- Tracking: `http://127.0.0.1:8000/track/{order-reference}`
- Pickup: `http://127.0.0.1:8000/pickup`
- Authenticated debug console: `http://127.0.0.1:8000/admin`

Register and verify a normal application account before opening the admin console. In local development, verification may be completed through the configured mail/log driver.

## ESP32 wiring and flashing

Copy `esp32-locker-controller/include/config.example.h` to `config.h`; add Wi-Fi credentials and an API key matching Laravel. Then:

```bash
cd esp32-locker-controller
pio run
pio run --target upload
pio device monitor --baud 115200
```

Use an external regulated **5V 3A** supply. Never power MG90S servos from ESP32 3.3V.

- PSU +5V → all three servo red wires
- PSU negative → all servo brown/black wires and ESP32 GND (common ground is mandatory)
- Catcher orange/yellow signal → GPIO13
- Pickup orange/yellow signal → GPIO14
- Trash orange/yellow signal → GPIO25

Turn power off before rewiring. Test one servo at a time, do not force powered horns, do not let a servo buzz against a mechanical stop, and move calibration angles inward if it strains. The workflow moves one servo at a time.

## End-to-end test

With simulation enabled, submit a sample PDF, watch the queue worker advance the tracking timeline, then enter the displayed pickup code. Set a short expiry grace to test automatic discard via the scheduler. With hardware enabled, repeat while watching Serial Monitor: catcher moves after printing, pickup opens for the configured duration, and trash moves for an expired order.

Run automated checks with `php artisan test`, `npm run types:check`, `npm run lint:check`, and `npm run build`.
