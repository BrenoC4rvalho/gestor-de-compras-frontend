import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/types/User';
import { CommonModule } from '@angular/common';
import { CreateUser } from '../../core/types/CreateUser';
import { FormsModule } from '@angular/forms';
import { RoleName } from '../../core/types/RoleName';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  users: User[] | null = null

  newUser: CreateUser = { name: '', role: RoleName.ROLE_REQUESTER, password: "" }

  roleNames = Object.values(RoleName)

  constructor(private authService: AuthService, private apiService: ApiService) {}  

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    const token = this.authService.getToken()
    console.log(token)
    if(token) {
      this.apiService.getAllUsers(token).subscribe({
        next: (users: User[]) => {
          this.users = users
          console.log(users)
        },
        error: (err) => {
          console.log("Error in load users")
        }
      })
    }
  }

  onSubmit() {
    const token = this.authService.getToken()
    if(token) {
      this.apiService.createUser(this.newUser, token).subscribe({
        next: () => {
          alert('User created successfully')
          this.newUser = { name: '', role: null, password: "" }
          this.loadUsers()
        },
        error: (err) => {
          console.log("Error creating user", err)
          alert('Failed to create user')
        }
      })
    }

  }

}
