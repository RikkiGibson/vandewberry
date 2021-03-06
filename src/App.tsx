// tslint:disable:no-console
import * as React from 'react';
import './App.css';
import './pictures.css';
import { Banner } from './Banner';
import { HashRouter, Route, Switch } from "react-router-dom"
import { HomeView } from './views/homeview';
import { FoodApp } from './FoodApp';
import { Login } from './Login';
import { IApiResponse } from './Database';
import { PhotosApp } from './views/photosapp';
import { CreateAccount } from './CreateAccount';

class App extends React.Component<{}, { error: boolean, authenticated: boolean, user: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { error: false, authenticated: false, user: "" }

    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);

    fetch('/api/checkSession', { credentials: 'include' })
      .then((data: any) => {
        return data.json();
      })
      .then((response: IApiResponse) => {
        if (response.authenticated) {
          this.authenticate(response.payload);
        }
      });

  }

  private logout(event: any) {
    event.stopPropagation();
    fetch('/api/logout', { credentials: 'include' }).then(() => {
      this.setState({ authenticated: false, user: "" });
    });

  }

  private authenticate(user: string) {
    this.setState({ authenticated: true, user });
    this.foodApp && this.foodApp.refresh();
    this.photoApp && this.photoApp.refresh();
  }

  private foodApp: FoodApp | null;
  private photoApp: PhotosApp | null;




  public render() {
    let showIfLoggedIn = (
      <div id='protected'>
        <FoodApp ref={thing => { this.foodApp = thing }} />
        <Route path="/photos"
          component={() =>
            <PhotosApp ref={thing => { this.photoApp = thing }} />
          }
        />
        <Route path="/home"
          component={() =>
            <HomeView />
          }
        />
      </div>
    )

    return (
      <div>
        <Banner user={this.state.user} authenticated={this.state.authenticated} logout={this.logout} />
        <HashRouter>
          <Switch>
            <div>
              {this.state.authenticated && showIfLoggedIn}
              {!this.state.authenticated &&
                <Switch>
                  <Route path="/createAccount"
                    component={() =>
                      <CreateAccount authenticate={this.authenticate} />
                    }
                  />
                  <Route path="/"
                    component={() =>
                      <Login authenticate={this.authenticate} />
                    }
                  />
                </Switch>
              }
            </div>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
