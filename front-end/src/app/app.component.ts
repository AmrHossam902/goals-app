import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GlobalHttpInterceptor } from './common/interceptors/http-interceptor.inteceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end';
}
