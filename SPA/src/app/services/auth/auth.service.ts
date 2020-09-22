import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthContext } from '../../model/auth-context';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user!: User | null;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();
  authContext!: AuthContext;

  constructor(private _httpClient: HttpClient) {
    const stsSettings = {
      // Required Settings
      authority: environment.stsAuthority, // (string): The URL of the OIDC/OAuth2 provider
      client_id: environment.clientId, // (string): Your client application's identifier as registered with the OIDC/OAuth2 provider.
      redirect_uri: `${environment.clientRoot}signin-callback`, // (string): The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
      response_type: 'code', // (string, default: 'id_token'): The type of response desired from the OIDC/OAuth2 provider.
      scope: 'openid profile', // (string, default: 'openid'): The scope being requested from the OIDC/OAuth2 provider

      // Provider settings if CORS not supported on OIDC/OAuth2 provider metadata endpoint
      // The authority URL setting is used to make HTTP requests to discover more information 
      // about the OIDC/OAuth2 provider and populate a metadata property on the settings. 
      // If the server does not allow CORS on the metadata endpoint, then these additional settings can be manually configured. 
      // These values can be found on the metadata endpoint of the provider:
      // metadata: {
      //   issuer: `${environment.stsAuthority}`,
      //   authorization_endpoint: `${environment.stsAuthority}authorize?audience=projects-api`,
      //   jwks_uri: `${environment.stsAuthority}.well-known/jwks.json`,
      //   token_endpoint: `${environment.stsAuthority}connect/token`,
      //   userinfo_endpoint: `${environment.stsAuthority}connect/userinfo`,
      //   end_session_endpoint: `${environment.stsAuthority}logout?client_id=${environment.clientId}&returnTo=${encodeURI(environment.clientRoot)}signout-callback`
      // },            
      // signingKeys (which is the keys property of the jwks_uri endpoint)

      // Optional Settings
      // clockSkew (number, default: 300): The window of time (in seconds) to allow the current time to deviate when validating id_token's iat, nbf, and exp values.
      // loadUserInfo (boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
      // filterProtocolClaims (boolean, default: true): Should OIDC protocol claims be removed from profile
      post_logout_redirect_uri: `${environment.clientRoot}signout-callback`, // (string): The OIDC/OAuth2 post-logout redirect URI.
      // popupWindowFeatures (string, default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'): The features parameter to window.open for the popup signin window.
      // popupWindowTarget (string, default: '_blank'): The target parameter to window.open for the popup signin window.
      silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`, // (string): The URL for the page containing the code handling the silent renew.
      automaticSilentRenew: true, // (boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration. The attempt is made as a result of the accessTokenExpiring event being raised.
      // silentRequestTimeout (number, default: 10000): Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.
      // accessTokenExpiringNotificationTime (number, default: 60): The number of seconds before an access token is to expire to raise the accessTokenExpiring event.
      // userStore: (default: session storage): Storage object used to persist User for currently authenticated user. E.g. userStore: new WebStorageStateStore({ store: window.localStorage })
      // monitorSession [1.1.0]: (default: true): Will raise events for when user has performed a signout at the OP.
      // checkSessionInterval: (default: 2000): Interval, in ms, to check the user's session.
      // revokeAccessTokenOnSignout [1.2.1] (default: false): Will invoke the revocation endpoint on signout if there is an access token for the user.
      // includeIdTokenInSilentRenew [1.4.0] (default: true): Flag to control if id_token is included as id_token_hint in silent renew calls.
      // staleStateAge (default: 300): Number (in seconds) indicating the age of state entries in storage for authorize requests that are considered abandoned and thus can be cleaned up.
      // extraQueryParams: (object): An object containing additional query string parameters to be including in the authorization request. E.g, when using Azure AD to obtain an access token an additional resource parameter is required. extraQueryParams: {resource:"some_identifier"}      

    };
    this._userManager = new UserManager(stsSettings);
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
    this._userManager.events.addUserLoaded(user => {
      if (this._user !== user) {
        this._user = user;
        this.loadSecurityContext();
        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });

  }

  login() {
    return this._userManager.signinRedirect(); // Returns promise to trigger a redirect of the current window to the authorization endpoint.
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this._userManager.getUser();
    const userCurrent = !!user && !user.expired;
    if (this._user !== user) {
      this._loginChangedSubject.next(userCurrent);
    }
    if (userCurrent && !this.authContext) {
      this.loadSecurityContext();
    }
    user ? this._user = user :  null;
    return userCurrent;
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback() // Returns promise to process response from the authorization endpoint. The result of the promise is the authenticated User
    .then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this._userManager.signoutRedirect(); // Returns promise to trigger a redirect of the current window to the end session endpoint.
  }

  completeLogout() {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback(); // Returns promise to process response from the end session endpoint.
  }

  getAccessToken() {
    return this._userManager.getUser() // Returns promise to load the User object for the currently authenticated user.
    .then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

  loadSecurityContext() {
    this._httpClient
      .get<AuthContext>(`${environment.apiRoot}Projects/AuthContext`)
      .subscribe(
        context => {
          this.authContext = new AuthContext();
          this.authContext.claims = context.claims;
          this.authContext.userProfile = context.userProfile;
        },
        error => console.error(error)
      );
  }

}
