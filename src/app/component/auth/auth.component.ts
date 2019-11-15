import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  
  interval :any;
  model = {};
  loginForm: FormGroup;
  message: string;
  etat :boolean;

  constructor(private formBuilder: FormBuilder,private router: Router, public demandeur: ServicedemandeurService,
    private toastr: ToastrService) 
  { }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms));
  }
  get f() { return this.loginForm.controls; }

  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      LoginDemandeur: ['', Validators.required],
      PassDemandeur: ['', Validators.required]
    });
  }
  OnSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    else{
      this.verify(); 
      this.delay(500).then(any=>{ 
        if(this.etat)
        {
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.f.LoginDemandeur.value);
          this.router.navigate(["/admin"]);
            
        }else
        {
          this.message = "Login et Password incorrect !";
        }
     });
    } 
  }  
  verify() : any {
    this.demandeur.authLogin(this.loginForm.value).subscribe(
      data => {
        this.etat= data!=null ? true : false; 
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }
}
