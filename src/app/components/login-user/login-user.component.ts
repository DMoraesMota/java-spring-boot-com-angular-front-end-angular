import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { UserLogin } from 'src/app/core/model/login';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();
  submitted = false;

  constructor(private apiService: ApiService, 
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public login(){
    this.submitted = true;
    this.apiService.login(this.user).subscribe(data => {
    this.loginSucess(data); 
    this.submitted = false;     
    }, error => {      
      this.messageService.showError('Falha ao logar', 'Falha na autenticação. Favor verificar o usuário e senha');
      this.submitted = false;
    });
  }

  public loginSucess(data: any) {

    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);    
    localStorage.setItem('refreshToken', data.refresh_Token);
    this.apiService.getMainUser(localStorage.getItem('accessToken')).subscribe(user => {
      this.redirectPage(user);
      this.messageService.showSucess('Bem Vindo', 'Login efetuado com sucesso. Bem Vindo');
    }, error => {
      console.log('Error ao pegar o usuário logado', error);      
    });

  }

  public redirectPage(user : any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['welcome']);
  }
}
