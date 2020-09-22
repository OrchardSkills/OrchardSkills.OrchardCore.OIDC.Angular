import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.scss']
})
export class SigninCallbackComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _router: Router) { }

ngOnInit() {
this._authService.completeLogin().then(user => {
this._router.navigate(['/'], { replaceUrl: true });
})
}

}
