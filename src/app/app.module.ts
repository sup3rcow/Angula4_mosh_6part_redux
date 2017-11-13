import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

// import { fromJS, Map } from 'immutable'; // koristi ili tassign ili immutable, ja sam odabra tasign citljiviji je
// immutable je manje citljiviji ali sa njim sprecavas da netko mijenja state objekt, ali nemas tasign feature

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // prvi parametar je nasa funkcija, drugi je initial store objekt
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
