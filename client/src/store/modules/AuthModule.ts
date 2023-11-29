import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { AuthEndpoint } from '../../api/endpoints/AuthEndPoint';
import { AlertColor, dispatchAlert } from '../../utils/alerts';

interface IUserInfo {
  email: string;
  token: string | null;
  lastLogin: number | null;
  lastUse: number | null;
}

export interface IUserState {
  userInfo: IUserInfo;
  loading: boolean;
}

class AuthModule implements Module<IUserState, any> {
  namespaced: boolean = true;

  state: IUserState = {
    userInfo: {
      email: '',
      token: null,
      lastLogin: null,
      lastUse: null,
    },
    loading: false,
  };

  getters: GetterTree<IUserState, any> = {
    email(state): string {
      return state.userInfo.email;
    },

    token(state): string | null {
      return state.userInfo.token;
    },

    loading(state): boolean {
      return state.loading;
    },
  };
  actions: ActionTree<IUserState, any> = {
    async login({ commit, dispatch }, userInfo: { email: string; password: string }) {
      commit('setLoading', true);

      try {
        const authClient = new AuthEndpoint();
        const loginRes = await authClient.login(userInfo.email, userInfo.password);

        if (loginRes) {
          commit('setToken', loginRes.token);
          commit('setEmail', userInfo.email);
          commit('setLastLogin', Date.now());
        }
      } catch (err: any) {
        console.error(err);
        const errorMessage = err.title || `An error occurred during login`;
        dispatchAlert(AlertColor.ERROR, errorMessage, dispatch);
        throw err; // throw error to let the login page know that login failed
      } finally {
        commit('setLoading', false);
        dispatch('updateLastUse');
      }
    },

    logout({ commit }) {
      commit('setToken', null);
      commit('setEmail', '');
      commit('setLastLogin', null);
      commit('setLastUse', null);
    },

    checkAuth({ state, dispatch }): boolean {
      if (!state.userInfo.token) return false;

      const daysPassedFromDate = (date: number) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.abs((Date.now() - date) / oneDay);
      };

      // login required every 30 days
      if (state.userInfo.lastLogin) {
        if (daysPassedFromDate(state.userInfo.lastLogin) > 30) {
          dispatch('logout');
          return false;
        }
      }

      // login required after 3 days of inactivity
      if (state.userInfo.lastUse) {
        if (daysPassedFromDate(state.userInfo.lastUse) > 3) {
          dispatch('logout');
          return false;
        }
      }

      return true;
    },

    updateLastUse({ commit }) {
      commit('setLastUse', Date.now());
    },
  };

  mutations: MutationTree<IUserState> = {
    setToken(state, token: string) {
      state.userInfo.token = token;
    },
    setEmail(state, email: string) {
      state.userInfo.email = email;
    },
    setLastLogin(state, date: number) {
      state.userInfo.lastLogin = date;
    },
    setLastUse(state, date: number) {
      state.userInfo.lastUse = date;
    },
    setLoading(state, value: boolean) {
      state.loading = value;
    },
  };
}

const authModule = new AuthModule();
export default authModule;
