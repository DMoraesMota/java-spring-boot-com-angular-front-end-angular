import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  public user = new UserDTO();
  private unsubscribeMessage = new Subject();
  submitted = false;

  constructor(private apiService: ApiService, 
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.notifyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result => {
      if (result === true){
        this.submitted = false;
      }
    });
  }

  save(): void{
    this.submitted = true;
    this.apiService.registerUser(this.user).subscribe(data =>{
      this.messageService.showSucess('Usuário salvo com sucesso', 'Usuário cadastrado no sistema. ');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro ao salvar o usuário', 'Erro ao registar o usuário!');
      console.log('Erro ao registrar usuário ', error);
      
    })
  }
  goBack() {
    this.location.back();
  }

  ngOnDestroy(){
    this.unsubscribeMessage.next();
    this.unsubscribeMessage.complete();
  }

}
