import HttpService from './https';
import endpoints from './endpoints';

class AuthService {
  static JoinRoom(args: {username: string, password: string}) {
    return HttpService.post(endpoints.auth.joinRoom, args);
  }
  static LeaveRoom(args: { name: string }) {
    return HttpService.post(endpoints.auth.joinRoom, args);
  }
}

export default AuthService;
