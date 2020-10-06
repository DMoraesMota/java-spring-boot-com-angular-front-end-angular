import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private notify = new Subject();
  public notifyObservable$ = this.notify.asObservable();

  constructor(private toastrService: ToastrService) { }

  showSucess(titulo, mensagem){
    this.toastrService.success(titulo, mensagem);    
    this.notify.next(true);
  }

  showWarning(titulo, mensagem){
    this.toastrService.warning(titulo, mensagem);
    this.notify.next(true);
  }

  showError(titulo, mensagem){
    this.toastrService.error(titulo, mensagem);
    this.notify.next(true);
  }
  
}
