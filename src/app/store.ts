import { INCREMENT } from './actions';
import { tassign } from 'tassign';

// tu ces definirati koji propertiji ce biti u storu
export interface IAppState {
    counter: number;
    messaging: { // mozes staviti da je nullbale, ali onda ako ne definiras u rootReduceru, postat ce null, neovisno o ninitial value
        newMessages: number
    };
}

// ovo radis da ti je sve na jednom mestu, da ne moras ici u app.module i tamo mijenjati INITIAL_STATE
// u slucaju da ti se tu promijeni interface..
export const INITIAL_STATE: IAppState = {
    counter: 0,
    messaging: {
        newMessages: 5 
    }
 };

// kako aplikacija raste, ovu funkciju ces razbijati u manje
// za svaku domenu jedna funkcija
// funkcija prima 2 parametra i vraca sledeci state, ulazni state mora ostati ne promenjen.(pure function)
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case INCREMENT:
        /*
        return {
            counter: state.counter + 1,
            messaging: {
                newMessages: state.messaging.newMessages - 1
            }
        };*/

        // ako imas puno propertija u store-u, radi ovako, a ne ko u primjeru iznad
        // jer ces tako imati puno ponavljanje
        // zato koristis javascript Object.asign sa kojim mozes vise objekata kombinirati u jedan
        // (target object, source object, combined object)

        /*return Object.assign({}, state,
            {
                counter: state.counter + 1,
                // isOnline: 1, // kako ne bi mogao dodavati propertije koji nisu definirani u IAppState interfejsu
                                // koristis type safe verziju Object.asign()..
                                // npm install tassign --save
                messaging: {
                    newMessages: state.messaging.newMessages - 1
                }
            }
        );*/

        // tassign gleda propertije unutar state objekta i ne dozvoljava druge da se dodaju

        // !!!!!!!!!!!!!!!!!!
        // state.counter++; //kako bi sprecio ovakve zabrrarnje slucajne stvari, koristis immutable.js
        // npm install immutable --save
        // i nakon toga svugde mijenjas IAppState sa Map<string, any>, sto pretstavlja bilo koji objekt, string je naziv propertija
        // a any moze biti kakav objekt, nisi ovo koristi vec si tassign nacin
        // (tassign je lepsa sintaksa ali nemas ovu funkciju koju pruza immutable)

        return tassign(state,
            {
                counter: state.counter + 1,
                messaging: { // ako stavis da je ovaj parametar nullable u IAppState, tada se tu kompajler zali
                    // vidi sta moras napraviti, neke nove interfejse?? tada se definicija metode tassign menja
                    // stavi kurosra u nju pa vidi razliku sta intelisence pokazuje
                    newMessages: state.messaging.newMessages - 1
                }
            }
        );

    }
    return state; // reduser ne radi nista jer vraca ulazni state
}
