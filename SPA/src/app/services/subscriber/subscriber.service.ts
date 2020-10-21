import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ISubscriber } from 'src/app/model/ISubscriber';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  
  accessToken!: string | null;

  urlApiContent = environment.stsAuthority + 'api/content/';

  urlApiGraphql = environment.stsAuthority + 'api/graphql';

  urlApiAccessToken = environment.stsAuthority + 'connect/token/';

  constructor(private authService: AuthService, private http: HttpClient,) {
    this.authService.getAccessToken().then(token => {
      this.accessToken = token
    })
   }



  getSubscribers(): Observable<ISubscriber[]> {

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.accessToken
    }
    const uri = this.urlApiGraphql + '?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}';

    return this.http.get<ISubscriber>(uri, { headers: headers }).pipe(
      tap(() => shareReplay()),
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

    return this.http.delete(url, { headers: headers });
  }


  updateSubscriber(subscriber: Partial<ISubscriber>): Observable<ISubscriber> {

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


    return this.http.post<ISubscriber>(url, body, { headers: headers });
  }

  addSubscriber(subscriber: NgForm): Observable<ISubscriber> {

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

    return this.http.post<ISubscriber>(url, body, { headers: headers });

  }


}
