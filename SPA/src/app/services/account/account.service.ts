import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../model/user-profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userProfile!: UserProfile;
  constructor(private _httpClient: HttpClient) { }
    
  getAllUsers(): Observable<UserProfile[]> {
      return this._httpClient.get<UserProfile[]>(environment.apiRoot + 'Account/Users');
  }

  createUserProfile(userProfile: UserProfile) {
      return this._httpClient.post(`${environment.apiRoot}Account/Profile`, userProfile);
  }

  updateUserProfile(userProfile: UserProfile) {
      return this._httpClient.put(`${environment.apiRoot}Account/Profile/${userProfile.id}`, userProfile);
  }

  register(userInfo: any) {
      return this._httpClient.post(`${environment.apiRoot}Account/Register`, userInfo);

  }}
