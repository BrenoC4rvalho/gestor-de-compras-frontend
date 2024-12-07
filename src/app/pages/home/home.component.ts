import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Request } from '../../core/types/Request';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    requests: Request[] | null = null

    constructor(private authService: AuthService, private apiService: ApiService) {}

    ngOnInit() {
      this.loadRequests()
    }

    loadRequests() {
      const token = this.authService.getToken()
      if(token) {
        this.apiService.getAllRequests(token).subscribe({
          next: (requests: Request[]) => {
            console.log(requests)
            this.requests = requests;
          },
          error: (err) => {
            console.error('Error loading requests', err);
            alert('Failed to load requests');
          }
        });
      }

    }
}
