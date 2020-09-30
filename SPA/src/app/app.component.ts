import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


interface ISubscriber {
  createdUtc: string
  displayText: string,
  email: string,
  firstName: string,
  lastName: string,
  modifiedUtc: string,
  publishedUtc: string,
  contentItemId: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spa';
  accessToken = '';
  subscribers!: Observable<ISubscriber[]>
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getToken()
    setTimeout(() => {
      this.getSubscribers()
    }, 1000);

  }
  public getToken() {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const body = 'client_id=' + environment.credentialsClientId + '&client_secret=' + environment.credentialsClientSecret + '&grant_type=' + environment.credentialsClientGrantType;
    console.log("body = ", body);
    this.http.post<any>('https://localhost:44342/connect/token/', body, { headers }).subscribe(response => {
      this.accessToken = response.access_token;
      console.log("response = ", response.access_token);
    })

  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value.contentId);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const uri = 'https://localhost:44342/api/graphql?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}';
    const body = '';
    console.log("uri = ", uri);
    console.log("headers = ", headers);
    console.log("body = ", body);
    this.subscribers = this.http.get(uri, { headers: headers }).pipe(
      map((data: any) => {
        console.log('data', data.data.subscriber)
        return data.data.subscriber
      })
    )
  }

  getSubscribers() {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const uri = 'https://localhost:44342/api/graphql?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}';

    this.subscribers = this.http.get(uri, { headers: headers }).pipe(
      map((data: any) => {
        console.log('data', data.data.subscriber)
        return data.data.subscriber
      })
    )
  }

  deleteSubscriber(id: string) {
    this.getToken();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const url = 'https://localhost:44342/api/content/' + id;
    console.log('Bearer =', this.accessToken)
    console.log('id = ', id);
    this.http.delete(url, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err)
    );
  }

  editSubscriber(id: string) {
    console.log('id', id)
  }

  addSubscriber(subscriber: NgForm) {
    console.log('sub', subscriber.value)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const url = 'https://localhost:44342/api/connect/' + subscriber.value

    this.http.post(url, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )

  }

}
