import { LoginResultDTO } from '../dto/LoginResultDTO';
import { $http } from '../../api/common/Axios';

export class AuthEndpoint {
  public async login(userName: string, password: string): Promise<LoginResultDTO> {
    try {
      const data = {
        userName,
        password,
      };

      const response = await $http.post('/login', data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async logout() {}
}
