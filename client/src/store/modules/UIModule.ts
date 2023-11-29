import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { Alert, AlertColor } from '../../utils/alerts';

export interface IUIState {
  isSidebarOpened: boolean;
  overlayLoading: boolean;
  alert: Alert;
}

class UIModule implements Module<IUIState, any> {
  namespaced: boolean = true;

  state: IUIState = {
    isSidebarOpened: true,
    overlayLoading: false,
    alert: {
      message: '',
      color: AlertColor.DEFAULT,
    },
  };

  getters: GetterTree<IUIState, any> = {
    isSidebarOpened(state): boolean {
      return state.isSidebarOpened;
    },
    alertMessage(state): string {
      return state.alert.message;
    },
    alertColor(state): AlertColor {
      return state.alert.color;
    },
    overlayLoading(state): boolean {
      return state.overlayLoading;
    },
  };

  actions: ActionTree<IUIState, any> = {
    toggleSidebar({ commit, getters }) {
      commit('setIsSidebarOpened', !getters.isSidebarOpened);
    },

    /**
     * ALERTS:
     * 1) use `utils/alertUtils/dispatchAlert` method to show alert
     */

    setAlert({ commit }, alert: Alert) {
      commit('setAlert', alert);
    },

    removeAlert({ commit }) {
      const noAlert = {
        message: '',
        color: AlertColor.DEFAULT,
      };
      commit('setAlert', noAlert);
    },
  };

  mutations: MutationTree<IUIState> = {
    setIsSidebarOpened(state, isSidebarOpened: boolean) {
      state.isSidebarOpened = isSidebarOpened;
    },
    setOverlayLoading(state, overlayLoading: boolean) {
      state.overlayLoading = overlayLoading;
    },
    setAlert(state, alert: Alert) {
      state.alert = alert;
    },
  };
}

const uiModule = new UIModule();
export default uiModule;
