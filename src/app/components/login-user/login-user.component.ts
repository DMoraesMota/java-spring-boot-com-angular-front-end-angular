import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { UserLogin } from 'src/app/core/model/login';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.apiService.login(this.user).subscribe(data => {
      console.log("LOGIN EFETUADO COM SUCESO " + JSON.stringify(data));
      this.loginSucess(data);      
    }, error => {
      console.log('Error ao fazer LOGIN');
    });
  }

  public loginSucess(data: any) {

    localStorage.clear();
    localStorage.setItem('acessToken', data.access_token);    
    localStorage.setItem('refreshToken', data.refresh_Token);
    this.apiService.getMainUser(localStorage.getItem('acessToken')).subscribe(user => {
      this.redirectPage(user);
    }, error => {
      console.log('Error ao pegar o usuário logado');      
    });

  }

  public redirectPage(user : any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['welcome']);
  }
}
