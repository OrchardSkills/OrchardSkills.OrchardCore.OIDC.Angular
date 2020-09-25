import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa';
  accessToken = '';
  constructor(private http: HttpClient) { }

  public getToken(event: Event) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded'}
    const body = 'client_id='+environment.clientCredentialsId + '&client_secret=' + environment.clientCredentialsSecret + '&grant_type=' + environment.clientCredentialsGrantType;
    console.log("body = ", body);
    this.http.post<any>('https://localhost:44342/connect/token/', body, { headers }).subscribe(response => {
      this.accessToken = response.access_token;
      console.log("response = ", response.access_token);
    })        
  }
     
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value.contentId);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Bearer ' + this.accessToken}
    const body = '';
    console.log("headers = ", headers);
    console.log("body = ", body);
    this.http.post<any>('https://localhost:44342/api/content/'+form.value.contentId, body, { headers }).subscribe(response => {
      console.log("response = ", response);
    })        
}  
}
