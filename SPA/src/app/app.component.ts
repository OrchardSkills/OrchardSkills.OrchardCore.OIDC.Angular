import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa';

  constructor(private http: HttpClient) { }

  public getToken(event: Event) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded'}
    const body = { title:'client_id=credentials_client_id&client_secret=C1ientCredentials_$ecret&grant_type=client_credentials' }
    this.http.post<any>('https://localhost:44342/connect/token/', body, { headers }).subscribe(response => {
            console.log(response);
    })        
  }
     
}
