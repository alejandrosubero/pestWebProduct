// pest-image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PestImageService {

  constructor() { }

  /**
   * Abre una búsqueda de imágenes en Google para la plaga indicada
   * @param pestName Nombre de la plaga
   * @param size Tamaño de la imagen: 'l' (large), 'm' (medium), 'i' (icon)
   * @param color Color de la imagen: 'trans' (transparente), 'gray', 'color'
   * @param type Tipo de imagen: 'clipart', 'photo', 'lineart', 'animated'
   * 
   * Por ejemplo: tamaño grande y fondo transparente
       constructor(private pestImageService: PestImageService) {}    
       this.pestImageService.searchPestImage(this.pestName, 'l', 'trans');
   */
  searchPestImage(
    pestName: string, 
    size?: 'l' | 'm' | 'i', 
    color?: 'trans' | 'gray' | 'color', 
    type?: 'clipart' | 'photo' | 'lineart' | 'animated'
  ) {
    if (!pestName) return;

    const query = encodeURIComponent(pestName);
    let tbsParams: string[] = [];

    if (size) tbsParams.push(`isz:${size}`);
    if (color) tbsParams.push(`ic:${color}`);
    if (type) tbsParams.push(`itp:${type}`);

    const tbs = tbsParams.length > 0 ? `&tbs=${tbsParams.join(',')}` : '';
    const url = `https://www.google.com/search?tbm=isch&q=${query}${tbs}`;

    window.open(url, '_blank');
  }


  searchPestImageSimple(pestName: string) {
    if (!pestName) return;
    const query = encodeURIComponent(pestName);
    const url = `https://www.google.com/search?tbm=isch&q=${query}&tbs=isz:l,ic:trans`;
    // const url = `https://www.google.com/search?tbm=isch&q=${query}`;
    window.open(url, '_blank');
  }


}
