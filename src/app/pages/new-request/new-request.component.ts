import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class NewRequestComponent {

}
