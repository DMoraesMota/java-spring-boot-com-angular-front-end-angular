import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  @ViewChild('deleteUserModal') public deleteUserModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Aplicação Spring Boot e Angular 7';
  recebePergunta = 'Deseja realmente deletar este usuário?';

  constructor() { }

  ngOnInit(): void {
  }

  onClose(event: any) {
   console.log(event);    
  }

  show(){
    this.deleteUserModal.show();
  }

  delete(){
    this.resposta.emit(this.recebeItem);
    this.deleteUserModal.hide();
  }

}
