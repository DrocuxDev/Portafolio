# Girasol Dual SENATI

Prototipo con Arduino Uno, fotoresistor (LDR), servomotor, dos LEDs y pantalla LCD 16×2. El programa promedia y suaviza las lecturas de luz, convierte su intensidad en un ángulo de 0° a 180°, mueve el servo gradualmente y ajusta de forma inversa el brillo de los LEDs azul y amarillo. La LCD y el monitor serial muestran las lecturas.

## Archivos

- `girasol-dual.ino`: código Arduino proporcionado para el proyecto.
- `girasol-dual-senati.brd`: diseño de placa en XML de EAGLE 9.7.0, exportado desde Tinkercad.
- `girasol-dual.png`: imagen del montaje.

## Conexiones principales

| Componente | Pin Arduino |
| --- | --- |
| LDR | A0 |
| Servo | D7 |
| LED azul | D6 |
| LED amarillo | D11 |
| LCD RS, E, D4, D5, D6, D7 | D12, D8, D5, D4, D3, D2 |

El potenciómetro del montaje ajusta el contraste de la LCD. `LDR_MAX = 300` corresponde a la calibración del simulador y puede necesitar ajuste en hardware real. El proyecto usa un solo LDR: responde a la intensidad de luz, no determina la dirección de la fuente luminosa.
