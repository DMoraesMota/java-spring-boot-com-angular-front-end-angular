import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {

  user= new UserDTO();

  constructor(private apiService : ApiService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  resendToken() {
    this.apiService.resendRegisterToken(this.user).subscribe(data => {
      this.messageService.showSucess('Token Enviado', 'Token reenviado com sucesso');
      this.router.navigate(['login']);
    }, error => {
      this.messageService.showError('Erro ao enviar o novo token', 'ERRO ao enviar o novo token');
      console.log('Error ao solicitar novo token de acesso!!', error);
      
    });
  }

}
