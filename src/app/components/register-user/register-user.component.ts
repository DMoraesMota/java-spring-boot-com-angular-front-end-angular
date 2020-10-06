import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public user = new UserDTO();

  constructor(private apiService: ApiService, 
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  save(): void{
    this.apiService.registerUser(this.user).subscribe(data =>{
      this.messageService.showSucess('Usuário salvo com sucesso', 'Usuário cadastrado no sistema. ');
    }, error => {
      this.messageService.showError('Erro ao salvar o usuário', 'Erro ao registar o usuário!');
      console.log('Erro ao registrar usuário ', error);
      
    })
  }
  goBack() {
    this.location.back();
  }

}
