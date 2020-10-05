import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: UserDTO[];

  constructor(private router: Router,
              private apiService : ApiService) { }

  ngOnInit(): void {
    if (!this.apiService.isAuthenticate()) {
      this.router.navigate(['login']);
    }
    this.apiService.getUsers().subscribe(users =>{
      this.users = users;
    }, error => {
      console.log('Erro ao pegar a lista de usuários!! ', error);      
    });
  }

  getRole(user: UserDTO) {
    return this.apiService.getRoles(user.roles);
  }

  deleteUser(user: UserDTO):void {
    this.apiService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id)
    }, error => {
      console.log('Erro ao deletar usuário ', error);      
    });
  }
}
