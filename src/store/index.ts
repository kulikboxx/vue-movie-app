import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { State, state } from './state';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  strict: import.meta.env.DEV,
  state,
  mutations,
  getters,
  actions,
});

export function useStore() {
  return baseUseStore(key);
}

export * from './types';
export * from './interfaces';
