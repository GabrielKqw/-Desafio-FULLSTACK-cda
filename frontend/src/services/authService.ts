import Api from "./api";
import swal from "sweetalert";
import { UserLogin, RegisterUser } from "./interfaces";

class authService {
  async login(values: UserLogin) {
    const endpoint = "/auth";
    try {
      const response = await Api.post(endpoint, values);
      return response;
    } catch (error: any) {
      swal({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
        timer: 6000,
      });
    }
  }
  async register(values: RegisterUser) {
    const endpoint = "/user";
    try {
      const response = await Api.post(endpoint, values);
      return response;
    } catch (error: any) {
      swal({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
        timer: 6000,
      });
    }
  }
}
export {authService}
