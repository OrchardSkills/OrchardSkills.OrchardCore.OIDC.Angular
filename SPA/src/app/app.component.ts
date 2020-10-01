import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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

  urlApiContent = environment.stsAuthority + 'api/content/';

  urlApiGraphql = environment.stsAuthority + 'api/graphql';

  urlApiAccessToken = environment.stsAuthority + 'connect/token/';

  //headers = {
  //  'Authorization': 'Bearer ' + this.accessToken
  //}

  subscriberToEdit!: Partial<ISubscriber> | null;

  editing = false;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getToken()
    setTimeout(() => {
      this.getSubscribers();
    }, 1000);

  }

  public getToken() {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const body = 'client_id=' + environment.credentialsClientId + '&client_secret=' + environment.credentialsClientSecret + '&grant_type=' + environment.credentialsClientGrantType;
    console.log("body = ", body);
    this.http.post<any>(this.urlApiAccessToken, body, { headers }).subscribe(response => {
      this.accessToken = response.access_token;
      console.log("response = ", response.access_token);
    })

  }

  getSubscribers() {
    this.getToken();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const uri = this.urlApiGraphql + '?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}';

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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const url = this.urlApiContent + id;

    this.http.delete(url, { headers: headers }).pipe(

      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);

        this.toastr.error(err.message)

        return throwError(err);

      })).subscribe(() => {

        this.toastr.success('You Successfully delete subscriber');

      });

    setTimeout(() => {
      this.getSubscribers();
    }, 1000);
  }

  OpenEditSubscriber(subscriber: Partial<ISubscriber>) {
    this.editing = true;
    this.subscriberToEdit = subscriber;
  }


  closeEditSubscriber() {
    this.editing = false;
    this.subscriberToEdit = null;
  }

  updateSubscriber(subscriber: Partial<ISubscriber>) {
    this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    }

    const url = this.urlApiContent;

    const body = {
      "ContentItemId": subscriber.contentItemId,
      "DisplayText": subscriber.firstName + '' + subscriber.lastName,
      "TitlePart": {
        "Title": subscriber.firstName + '' + subscriber.lastName
      },
      "Subscriber": {
        "FirstName": {
          "Text": subscriber.firstName
        },
        "LastName": {
          "Text": subscriber.lastName
        },
        "Email": {
          "Text": subscriber.email
        }
      },
      "ContainedPart": {
        "ListContentItemId": "462m1ps5kkzkp2k5da5pfhh2ww",
        "Order": 0
      }
    };


    this.http.post(url, body, { headers: headers }).pipe(

      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);

        this.toastr.error(err.message)

        return throwError(err);

      })).subscribe(() => {

        this.toastr.success('You Successfully delete subscriber');

      });
    this.closeEditSubscriber();
  }

  addSubscriber(subscriber: NgForm) {
    console.log('sub', subscriber.value)
    this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    }

    const url = this.urlApiContent

    const body = {
      "ContentType": "Subscriber",
      "Latest": true,
      "Published": true,
      "Owner": "sales",
      "Author": "sales",
      "DisplayText": subscriber.value.firstName + '' + subscriber.value.lastName,
      "TitlePart": {
        "Title": subscriber.value.firstName + '' + subscriber.value.lastName
      },
      "Subscriber": {
        "FirstName": {
          "Text": subscriber.value.firstName
        },
        "LastName": {
          "Text": subscriber.value.lastName
        },
        "Email": {
          "Text": subscriber.value.email
        }
      },
      "ContainedPart": {
        "ListContentItemId": "462m1ps5kkzkp2k5da5pfhh2ww",
        "Order": 0
      }
    };

    this.http.post(url, body, { headers: headers }).pipe(

      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);

        this.toastr.error(err.message)

        return throwError(err);

      })).subscribe(() => {

        this.toastr.success('You Successfully delete subscriber');
        this.getSubscribers();

      });

  }


}
