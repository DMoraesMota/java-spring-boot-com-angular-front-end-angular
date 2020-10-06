import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService, 
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.apiService.logout().subscribe(()=> {
      this.clearLocalStorage();
      this.messageService.showSucess('Logout Sucesso', 'Logout efetuado com sucesso');
      this.router.navigate(['login'])
    }, error => {
      this.messageService.showError('Erro ao efetuar logout', 'Erro ao fazer logout');
      console.log('Erro ao tentar fazer logout ', error);
    })
  }

  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }
  
  isAutenticated(): Observable<boolean>{
    return this.apiService.isAuthenticate();
  }

}
