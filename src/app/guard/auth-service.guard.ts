import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceGuard implements CanActivate {
  constructor(private _router : Router){
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //let url: string = state.url; 
    return this.verifyLogin();
  }
  verifyLogin() : boolean{
    if(localStorage.getItem('isLoggedIn') == "true"){
        return true;
    }
    this._router.navigate(["/login"]);
    return false; //if(!this.isLoggedIn(url))
  }
  public isLoggedIn()//: boolean
  {
      //return localStorage.getItem('isLoggedIn') == "true"? true : false;
  }
}

