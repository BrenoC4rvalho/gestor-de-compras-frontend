import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { Request } from '../../core/types/Request';
import { SignaturePadComponent } from '../../shared/signature-pad/signature-pad.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [HeaderComponent, CommonModule, SignaturePadComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  request: Request | null = null
  signatureBase64: string | null = null

  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService){}

  ngOnInit() {
    this.loadRequest()
  }

  loadRequest() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    const token = this.authService.getToken()

    if(token) {
      this.apiService.getRequestById(id, token).subscribe({
        next: (request: Request) => {
          this.request = request
        },
        error: (err) => {
          console.log(err)
          alert('Failed to load request')
        }
      })
    }
  }

  openSignatureModal(signaturePad: SignaturePadComponent) {
    signaturePad.openSignatureModal();
  }

  handleSignatureSaved(signature: string) {
    this.signatureBase64 = signature;
    const token = this.authService.getToken()

    if(token && this.request) {
      this.apiService.signatureRequest(this.request.id, token, this.signatureBase64).subscribe({
        next: (request: Request) => {
          this.request = request
        },
        error: (err) => {
          console.log(err)
          alert('Failed to signature')
        }
      })
    
    }
      
  }

}
