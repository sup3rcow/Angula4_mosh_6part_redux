import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store'; // pomocu select-a, uzmemo samo djelic store-a
import { IAppState } from './store';
import { INCREMENT} from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // counter = 0;
  // ne moras inicijalizirati, jer ga odmah vezes za store, koji ima postavljenu inicijalnu vrijednost
  @select() counter; // ako pises ovako onda u html-u moras jos pisati i pipe "| async"
  // @select('counter') counterMoj; // ovako specifiras tocan naziv propertija u store-u

  // @select(['messaging', 'newMessages']) newMessages; // ovako selektiras properti iz kompleksnog objekta
  @select((s: IAppState) => s.messaging.newMessages) newMessages; // ili ovako

  constructor(private ngRedux: NgRedux<IAppState>) {
    // Ne trebas se subscribati ovako, nego koristi @select
    // ngRedux.subscribe(() => {
    //   let store = ngRedux.getState();
    //   this.counter = store.counter;
    // });
  }

  increment() {
    // this.counter += 1; // ne mijenjas direktno, nego pomocu reduxa
    // ovo se odnosi samo na updateanje state-a, dok citanje state radi netko drugi
    this.ngRedux.dispatch({ type: INCREMENT});
  }
}
