# Single Page Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Documentation

[Node.js](https://nodejs.org/en/docs/)

[Yarn](https://yarnpkg.com)

[Angular](https://angular.io/)

[Angular CLI](https://cli.angular.io/)

[Jest](https://jestjs.io)

[Angular Style Guide](https://angular.io/guide/styleguide)

[RxJS](https://rxjs-dev.firebaseapp.com/)

[Firebase](https://firebase.google.com/docs/)

[Firebase CLI](https://firebase.google.com/docs/cli/)

[AngularFire](https://github.com/angular/angularfire)

## Common NPM commands in Yarn

|NPM Command                                                                                | Yarn Command              | Description (_wherever necessary_)                                                 |
|:------------------------------------------------------------------------------------------|:--------------------------|------------------------------------------------------------------------------------|
|npm install                                                                                |yarn <br> yarn install    |Will install packages listed in the `package.json` file                             |
|npm install `pkg-name` <br> npm install --save `pkg-name`                                 | yarn add `pkg-name`       |By default Yarn adds the `pgk-name` to `package.json` and `yarn.lock` files         |
|npm install `pkg-name@1.0.0`                                                               | yarn add `pgk-name@1.0.0` |                                                                                    |
|npm install `pkg-name` --save-dev                                                          | yarn add `pkg-name` --dev |                                                                                    |
|npm install `pkg-name` --peer                                                              | yarn add `pkg-name`--peer |                                                                                    |
|npm install `pkg-name` --optional                                                          | yarn add --optional       |                                                                                    |
|npm install -g `pkg-name`                                                                  | yarn global add `pkg-name`| Careful, yarn add global `pkg-name` adds packages `global` and `pkg-name` locally! |
|npm update                                                                                 | yarn upgrade              | Note: It's called **upgrade** in yarn                                              |
|npm uninstall `pkg-name`                                                                   | yarn remove `pkg-name`    |                                                                                    |
|npm run `script-name`                                                                      | yarn run `script-name`    |                                                                                    |
|npm init                                                                                   | yarn init                 |                                                                                    |
|npm pack                                                                                   | yarn pack                 | Creates a compressed gzip archive of the package dependencies                      |
|npm link                                                                                   | yarn link                 |                                                                                    |
|npm outdated                                                                               | yarn outdated             |                                                                                    |
|npm publish                                                                                | yarn publish              |                                                                                    |
|npm run                                                                                    | yarn run                  |                                                                                    |
|npm cache clean                                                                            | yarn cache clean          |                                                                                    |
|npm login                                                                                  | yarn login (and logout)   |                                                                                    |
|npm test                                                                                   | yarn test                 |                                                                                    |
|npm install --production                                                                   | yarn --production         |                                                                                    |
|npm  --version                                                                             | yarn version              |                                                                                    |
|npm  info | yarn info|


### New Commands in Yarn

|Yarn Command                      | Description                                                               |
|----------------------------------|---------------------------------------------------------------------------|
|yarn why `pkg-name`               | Builds a dependency graph on why this package is being used               |
|yarn clean                        | Frees up space by removing unnecessary files and folders from dependencies|
|yarn licenses ls                  | Inspect the licenses of your dependencies                                 |
|yarn licenses generate-disclaimer | Automatically create your license dependency disclaimer                   |

## Install the Angular CLI

### NPM

```
npm install -g @angular/cli
```

### Yarn

```
yarn global add @angular/cli
```

## Install TypeScript

### NPM

```
npm install -g typescript
```

### Yarn

```
yarn global add typescript
```

### Yarn

```
yarn global add firebase-tools  
```

## Install NPM Check Updates

### NPM

```
npm install -g npm-check-updates
```

### Yarn

```
yarn global add npm-check-updates
```

## Modify .gitignore

Add the following to the .gitignore file

```
# node
package-lock.json

# yarn
yarn.lock
yarn-error.log

# Firebase
.firebase/*
firebase-debug.log
```

## Add Chrome/Firefox debugging configuration

Create folder .vscode and add file launch.json

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Chrome against localhost:4200, with sourcemaps",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:4200",
            "runtimeArgs": [
              "--new-window",
              "--incognito",
              "--remote-debugging-port=9222"
            ],
            "sourceMaps": true,
            "trace": "verbose",
            "webRoot": "${workspaceRoot}"
        },
        {
            "name": "Attach Chrome against, with sourcemaps",
            "type": "chrome",
            "request": "attach",
            "port": 9222,
            "sourceMaps": true,
            "trace": "verbose",
            "webRoot": "${workspaceRoot}"
        },
        {
            "name": "Launch Firefox against localhost:4200, with sourcemaps",
            "type": "firefox",
            "request": "launch",
            "reAttach": true,
            "url": "http://localhost:4200",
            "webRoot": "${workspaceFolder}"
        }
    ]
  }
```

## Modify angular.json

Set true to false on inline and tests

```
      "schematics": {
        "@schematics/angular:component": {
          "inlineTemplate": false,
          "inlineStyle": false,
          "style": "scss",
          "skipTests": false
        },
        "@schematics/angular:class": {
          "skipTests": false
        },
        "@schematics/angular:directive": {
          "skipTests": false
        },
        "@schematics/angular:guard": {
          "skipTests": false
        },
        "@schematics/angular:interceptor": {
          "skipTests": false
        },
        "@schematics/angular:module": {
          "skipTests": false
        },
        "@schematics/angular:pipe": {
          "skipTests": false
        },
        "@schematics/angular:service": {
          "skipTests": false
        },
        "@schematics/angular:application": {
          "strict": false
        }
      },
```

## Create app.component files

Create app.component.html and app.component.scss in the src/app folder.
Create an empty app.component.scss file.
Add the following code to app.component.html:

```
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <router-outlet></router-outlet>
```

## Modify app.component.ts

Change the component to the following:

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

### Install NPM Check Update (NCU) and Check packages.json for outdated packages

At times, the package.json file can get out of date from what is current. To check for outdated packages install npm-check-updates, run ncu to see outdated packages, and then run ncu -u to update the packages.

```
ncu -u
npm install
```

## Install the Jest Testing Framework

###  NPM

``
npm install jest jest-preset-angular @types/jest --save-dev
``

### Yarn

```
yarn add jest jest-preset-angular @types/jest --dev
```

### Create setupJest.ts

Create the setupJest.ts file in the root folder and add the following code:

```
import 'jest';
import 'jest-preset-angular';
```

### Modify project.json

```
{
  ...
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "jest",
    "test:cc": "jest --coverage",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/setupJest.ts"
    ],
     "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/src/test.ts",
      "<rootDir>/cypress/",
      "<rootDir>/src/environments/"
    ],
    "globals": {
      "ts-jest": {
        "tsConfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$",
        "astTransformers": [
          "jest-preset-angular/build/InlineFilesTransformer",
          "jest-preset-angular/build/StripStylesTransformer"
        ]  
      }
    }
  },
  ...
}  
```

### Create the file tsconfig.spec.json file in root folder. Add the following configuration:

```
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "emitDecoratorMetadata": true,
      "outDir": "./out-tsc/spec",
      "types": [
        "jest",
        "node"
      ]
    },
    "files": [
      "src/polyfills.ts"
    ],
    "include": [
      "src/**/*.spec.ts",
      "src/**/*.d.ts"
    ]
}
```

### Create app.component.spec.ts

Create the file app.component.spec.ts in the src/app folder and add the following:

```
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          AppComponent
        ],
      }).compileComponents();
    }));
  
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  
    it(`should have as title 'angular-advisors-mirage'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('angular-advisors-mirage');
      });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content span').textContent).toContain('angular-advisors-mirage app is running!');
    });
  });  
```

## Running unit tests

### NPM

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

### Yarn

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io/).


## Install Cypress End-to-End Testing framework

### Install the Cypress package

### NPM

```
npm install cypress --save-dev
```

### Yarn

```
yarn add cypress --dev
```

### Create Cypress Open Command

Replace the e2e with a cypress open command in the scripts section of our package.json

```
"cypress:open": "./node_modules/.bin/cypress open"
```

### Make sure that the following Cypress folders are added to testPathIgnorePatterns in package.json

```
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/src/test.ts",
      "<rootDir>/cypress/",
      <rootDir>/src/environments/
    ],
```

### Modify tsconfig.base.json

Add "types": ["cypress"], to the tsconfig.json file.

```
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "target": "es2015",
    "types": ["cypress"],
  }
  ...
}
```

Add Exclude at bottom

```
  "exclude": [
    "**/*.spec.ts"
  ]
```

## Run Cypress

### NPM

```
npm run cypress:open
```

### Yarn

```
yarn cypress:open
```

After Cypress first run, it will create a cypress folder in the root directory. Move the examples folder from cypress/integration to cypress folder.

Move the example folder located at cypress\integration\examples to the cypress\examples folder

Create the file initial-page.spec.ts in the cypress/integration folder and add the following:

```
describe('initial-page', () => {

  beforeEach(() => {
    cy.visit("localhost:4200/");
  })

  it(`has title 'angular-advisors-mirage'`, () => {
    cy.contains('angular-advisors-mirage');
    cy.get('h1').should('contain', 'angular-advisors-mirage');
    cy.title().should('eq', 'AngularAdvisorsMirage');
  })

})
```

### Running end-to-end cypress tests

Two terminals are needed

In the first terminal:

Run `ng serve`

In the second terminal:

### NPM

Run `npm run cypress:open` to execute the end-to-end tests.

### Yarn

Run `yarn cypress:open` to execute the end-to-end tests.

A window will pop up and them just click on initial-page.spec.ts.

An integration test with results will be displayed.

## Install oidc-client

### NPM

```
npm install oidc-client --save
```

### Yarn

```
yarn add cypress
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Create Services

### Create Auth Service

```
ng generate service services/auth/auth
```

### Create Account Service

```
ng generate service services/account/account
```

### Create Auth Interceptor Service

```
ng generate service services/auth-interceptor/auth-interceptor
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
