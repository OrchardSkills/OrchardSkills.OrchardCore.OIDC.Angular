import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ISubscriber } from '../model/ISubscriber';
import { SubscriberService } from '../services/subscriber/subscriber.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribers!: Observable<ISubscriber[]>

  subscriberToEdit!: Partial<ISubscriber> | null;

  userAuthorized = false;

  editing = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private subscriberService: SubscriberService) { }


  ngOnInit(): void {

    this.authService.isLoggedIn().then(loggedIn => {
      this.userAuthorized = loggedIn;
      this.userAuthorized  ?  this.getSubscribers() : null;
    })

  }



  getSubscribers(): Observable<ISubscriber[]> {

    this.subscribers = this.subscriberService.getSubscribers();

    return this.subscribers.pipe(

      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);

        this.toastr.error(err.message)

        return throwError(err);

      }))
  }




  deleteSubscriber(id: string) {

   this.subscriberService.deleteSubscriber(id).pipe(

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

   this.subscriberService.updateSubscriber(subscriber).pipe(

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

   this.subscriberService.addSubscriber(subscriber).pipe(

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
