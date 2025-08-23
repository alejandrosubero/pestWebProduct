import { Injectable } from '@angular/core';
import { PestData } from '../models/pestdata.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegateService {


  constructor(
      private router: Router,
  ) { }


 goFavorites(routeName: string, id: number): void {
    const pestData: PestData = {
      id: id,
      name: routeName
    };
    this.router.navigate(['/favorites', id], {
      state: { data: pestData }
    });
  }
  


   goToDetail(detailRouteName: string, id: number, namePest: string): void {
    const pestData: PestData = {
      id: id,
      name:namePest
    };
    this.router.navigate([`/${detailRouteName}`, id], {
      state: { data: pestData }
    });
  }


  getData(routerx: Router): PestData {
    let pestData: PestData = { id: 0, name: '' };
    let pestDataTemp: PestData = { id: 0, name: '' }
 
    const nav = routerx.getCurrentNavigation();
    pestData = nav?.extras?.state?.['data'] || history.state.data || null;
    
    if (!pestData) {
      console.warn('No pestData passed, fetching by ID or redirecting...');
    } else {
       const id : number = pestData.id != undefined && pestData.id != null ? pestData.id : 0;
       const nameToNavegate = pestData.name != undefined && pestData.name != null ? pestData.name : '';
      pestDataTemp = { id: id , name: nameToNavegate }
    }

    return pestDataTemp;
  }





}


