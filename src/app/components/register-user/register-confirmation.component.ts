import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-register-user',
  template: `
    <div class="view overlay zomm">
        <p class="white-text"> Verificando Solicitação de registro de usuário</p>
    </div>
  `
})
export class RegisterConfirmationComponent implements OnInit {

    public token: string;

  constructor(private apiService: ApiService, 
              private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
      this.token = this.route.snapshot.paramMap.get('token');
      this.apiService.confirmationRegisterToken(this.token).subscribe(register => {
        this.messageService.showSucess('Registro validado', 'Usuário registrado com sucesso');
        this.router.navigate(['login']);
      }, error => {
        this.messageService.showError('Problema na confirmação do registro', 'Falha na confirmação de registro');
        console.log('Erro na confirmação de registro!! ', error);
        this.router.navigate(['resend-register-token']);
      })
  }

  goBack() {
    this.location.back();
  }

}
