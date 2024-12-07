import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/types/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  activePage: string = 'home';
  isDropdownOpen: boolean = false;

  user: User | null = null;
  
  constructor(private authService: AuthService, private apiService: ApiService) {}
  
  ngOnInit() {
    this.loadUser()
  }

  loadUser() {
    const token = this.authService.getToken()
    if(token) {
      this.apiService.recoveryUser(token).subscribe({
        next: (user: User) => {
          this.user = user
        },
        error: (err) => {
          console.log("Error in load user")
        }
      })
    }
  }

  setActive(page: string) {
    this.activePage = page;
    this.isDropdownOpen = false; // Fecha o dropdown ao mudar de página
  }

  

  isActive(page: string): boolean {
    return this.activePage === page;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
  }

}

