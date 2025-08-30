import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { NavConfig } from '../models/navElemet.model';


@Injectable({
  providedIn: 'root'
})
export class NavService {


   navConfig: WritableSignal<NavConfig> = signal<NavConfig>(new NavConfig());
  
  constructor() { }


 setNavConfig(nav: NavConfig){
  this.navConfig.set(nav);
 }

 reSetNavConfig(){
    this.navConfig.set(new NavConfig());
 }
 

  get config() {
    return this.navConfig.asReadonly();
  }


updateToggleFavorite(value: boolean) {
  this.navConfig.update(config => ({
    ...config,
    favorite: {
      ...config.favorite,
      toggleFavorite: value,
      active: value
    }
  }));
}




}
