import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class DemandeurGuard {
    constructor(private _router : Router){
    }
  
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url; 
      return this.verifyLogin(url);
    }
    verifyLogin(url) : boolean{
      if(this.isLoggedIn(url)){
          return true;
      }
    
      return false; //if(!this.isLoggedIn(url))
    }
    public isLoggedIn(url): boolean{
        if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('url') == url){
          return true;
        }
        return false;
    }
}
