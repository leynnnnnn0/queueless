# QueueLess ESP32 locker controller

Copy `include/config.example.h` to `include/config.h`, set Wi-Fi credentials and an API key, then calibrate each open/closed angle before connecting the mechanism.

```bash
pio run
pio run --target upload
pio device monitor --baud 115200
```

Power all three MG90S servos from an external regulated 5V 3A supply—never the ESP32 3.3V pin. Connect PSU negative, every servo ground, and ESP32 GND together. Signals: catcher GPIO13, pickup GPIO14, trash GPIO25. Power off before rewiring, test one servo at a time, never force a powered horn, and reduce angles if a servo buzzes or strains against a hard stop.

For a 0.96-inch SSD1306 128×64 I²C OLED: VCC → ESP32 3.3V, GND → ESP32 GND, SDA → GPIO21, and SCL → GPIO22. Its usual address is `0x3C`.
