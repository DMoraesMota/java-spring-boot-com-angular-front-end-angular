import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { UserDTO } from 'src/app/core/model/userDTO';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user = new UserDTO();
  idUser: string;


  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(this.idUser).subscribe(user => {
      this.user = user;
      console.log('Retornou o usuário com sucesso! ');
    }, error => {
      console.log('Erro ao pegar usuário! ', error);      
    });
  }

  update(): void{
    this.user.id = this.idUser;
    this.apiService.updateUser(this.user).subscribe(() => {
      this.messageService.showSucess('Atualizado com sucesso', 'Usuário atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Falha na atualização do usuário!');
      console.log('Erro ao atualizar o usuário!! ', error);      
    });
  }
  
  goBack() {
    this.location.back();
  }
}
