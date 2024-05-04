import { Directive, Input, effect, inject } from '@angular/core';
import { BmMapDirective } from './bm-map.directive';
import { LoadBingmapsService } from './load-bingmaps.service';
import { Coordinates } from './coordinates';
@Directive({ selector: 'bm-marker', standalone: true })

export class BmMarkerDirective {
  #bmMap = inject(BmMapDirective);
  #loadService = inject(LoadBingmapsService);
  #coords: Coordinates = { latitude: 0, longitude: 0 };
  #color = 'red';
  #marker!: Microsoft.Maps.Pushpin;

  @Input({ required: true }) set coords(coords: Coordinates) {
    this.#coords = coords;
    this.#marker?.setLocation(
      new Microsoft.Maps.Location(coords.latitude, coords.longitude)
    );
  }
  
  @Input() set color(color: string) {
    this.#color = color;
    this.#marker?.setOptions({ color: color });
  }

  constructor() {
    effect(async () => {
      if (this.#bmMap.map()) {
        this.#marker = await this.#loadService.createMarker(
          this.#bmMap.map()!,
          this.#coords,
          this.#color
        );
      }
    });
  }
  
}
