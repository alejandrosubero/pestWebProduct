import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
  standalone: true // Si tu proyecto usa standalone components, de lo contrario quita esta línea
})
export class LongPressDirective {
  private pressTimer: any; // Timer para almacenar el setTimeout
  private pressDuration: number = 1000; // Duración en milisegundos (1 segundo)

  // Evento que se emitirá cuando se complete el tiempo de presión
  @Output() appLongPress = new EventEmitter<void>();

  // Escucha el evento de mousedown y touchstart
  @HostListener('mousedown')
  @HostListener('touchstart')
  onPress(): void {
    // Inicia el timer que emitirá el evento después de pressDuration
    this.pressTimer = setTimeout(() => {
      this.appLongPress.emit();
    }, this.pressDuration);
  }

  // Escucha los eventos de liberación (mouseup, mouseleave, touchend, touchcancel)
  // para cancelar el timer si el usuario libera antes del tiempo requerido.
  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  @HostListener('touchcancel')
  onRelease(): void {
    clearTimeout(this.pressTimer);
  }
}
