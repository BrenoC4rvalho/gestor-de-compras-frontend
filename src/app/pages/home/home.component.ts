import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Request } from '../../core/types/Request';
import { degrees, PDFDocument, rgb } from 'pdf-lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    requests: Request[] | null = null
    selectedRequests: Request[] = []

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

    toggleSelection(request: Request) {
      const index = this.selectedRequests.findIndex((r) => r.id === request.id)
      if (index >= 0) {
        this.selectedRequests.splice(index, 1)
      } else {
        this.selectedRequests.push(request)
      }
    }

    async generatePDF() {
      
      if(this.selectedRequests.length === 0) {
        alert('Please select at least one request to generate a PDF')
        return
      }

      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([600, 800])
      const { width, height } = page.getSize()
      let yPosition = height - 50

      page.drawText('Selected Requests', { x: 50, y: yPosition, size: 18, color: rgb(0, 0, 0) });
      yPosition -= 30;

      const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
      const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())

      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
      const jpgDims = jpgImage.scale(0.5)


      // page.drawImage(jpgImage, {
      //   x: 60,
      //   y: 400,
      //   width: jpgDims.width,
      //   height: jpgDims.height,
      //   //rotate: degrees(30),
      //   opacity: 0.75,
      // })
  
      this.selectedRequests.forEach((request, index) => {
        if (yPosition < 50) {
          page.drawText('(Page truncated)', { x: 50, y: 30, size: 10, color: rgb(1, 0, 0) });
          yPosition = height - 50; // New page setup
          pdfDoc.addPage();
        }
        page.drawText(
          `${index + 1}. Title: ${request.title} - Price: $${request.price} - Requester: ${request.requesterName}`,
          { x: 50, y: yPosition, size: 12, color: rgb(0, 0, 0) }
        );
        yPosition -= 20;
      });
  
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create a link to download the Blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'selected_requests.pdf';

      // Programmatically click the link to start the download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    }

}
