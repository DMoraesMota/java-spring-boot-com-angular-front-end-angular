import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  showSucess(titulo, mensagem){
    this.toastrService.success(titulo, mensagem);
  }

  showWarning(titulo, mensagem){
    this.toastrService.warning(titulo, mensagem);
  }

  showError(titulo, mensagem){
    this.toastrService.error(titulo, mensagem);
  }
  
}
