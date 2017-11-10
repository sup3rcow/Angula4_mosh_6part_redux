import { INCREMENT } from './actions';

// tu ces definirati koji propertiji ce biti u storu
export interface IAppState {
    counter: number;
    messaging?: { // mozes staviti da je nullbale, ali onda ako ne definiras u rootReduceru, postat ce null, neovisno o ninitial value
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
        return {
            counter: state.counter + 1,
            messaging: {
                newMessages: state.messaging.newMessages
            }
        };
    }
    return state; // reduser ne radi nista jer vraca ulazni state
}
