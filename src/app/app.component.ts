import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './core/api.service';
import { UserDTO } from './core/model/userDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sba7-app';

  constructor(private apiService: ApiService) {}

  isAuthenticate():Observable<boolean> {
    return this.apiService.isAuthenticate();
  }
}
