import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ISubscriber } from '../model/isubscriber';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accessToken!: string | null;
  subscribers!: Observable<ISubscriber[]>

  urlApiContent = environment.stsAuthority + 'api/content/';

  urlApiGraphql = environment.stsAuthority + 'api/graphql';

  urlApiAccessToken = environment.stsAuthority + 'connect/token/';

  subscriberToEdit!: Partial<ISubscriber> | null;
  userAuthorized = false;
  editing = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.authService.getAccessToken().then(token => {
      this.accessToken = token
    })
    
    this.authService.isLoggedIn().then(loggedIn => {
      this.userAuthorized = loggedIn;
      this.userAuthorized && this.accessToken ?  this.getSubscribers() : null;
    })

  }



  getSubscribers() {

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const uri = this.urlApiGraphql + '?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}';

    this.subscribers = this.http.get(uri, { headers: headers }).pipe(
      map((data: any) => {
        console.log('data', data.data.subscriber)
        return data ? data.data.subscriber : null;
      })
    )
  }

  deleteSubscriber(id: string) {

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

        this.toastr.success('You Successfully deleted subscriber');

        this.getSubscribers();
      });
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

        this.toastr.success('You Successfully updated subscriber');

      });
    this.closeEditSubscriber();
  }

  addSubscriber(subscriber: NgForm) {

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
      "DisplayText": subscriber.value.firstName + ' ' + subscriber.value.lastName,
      "TitlePart": {
        "Title": subscriber.value.firstName + ' ' + subscriber.value.lastName
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

        this.toastr.success('You Successfully added new subscriber');
        this.getSubscribers();
        subscriber.form.reset()

      });

  }

}
