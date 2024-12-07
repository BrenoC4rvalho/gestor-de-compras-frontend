import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CreateRequest } from '../../core/types/CreateRequest';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class NewRequestComponent {

  newRequest: CreateRequest = {
    title: '',
    description: '',
    price: 0,
    maxSignatureDate: new Date()
  }

  constructor(private authService: AuthService, private apiService: ApiService) {}

  onSubmit() {
    const token = this.authService.getToken()
    if(token) {
      this.apiService.createRequest(this.newRequest, token).subscribe({
        next: (response) => {
          alert('Request created successfully');
          this.newRequest = {
            title: '',
            description: '',
            price: 0,
            maxSignatureDate: new Date()
          }
        }, 
        error: (err) => {
          console.log('Erroe creating request', err)
          alert('Failed to create request')
        }
      })
    }
  }

}
