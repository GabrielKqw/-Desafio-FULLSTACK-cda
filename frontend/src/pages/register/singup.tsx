import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import swal from "sweetalert";
import { RoutesPath } from "../../routes";
import './singup.css'

const SingUp = () => {
  const navigate = useNavigate();

  const handleRegisterUser = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { name, nickname, email, cpf, password, confirmPassword } =
      Object.fromEntries(formData);
    const service = new authService();
    const response = await service.register({
      name: name as string,
      nickname: nickname as string,
      email: email as string,
      cpf: cpf as string,
      password: password as string,
      confirmPassword: confirmPassword as string,
      profileImage: "",
      isAdmin: false,
    });

    if (!response) {
      swal({
        title: "Erro de Cadastro",
        text: "Informações incorretas!",
        icon: "error",
        timer: 6000,
      });
    }

    const login = await service.login({
      email: email as string,
      password: password as string,
    });
    console.log("login ->", login);
    const jwt = login?.data.token;

    if (!jwt) {
      swal({
        title: "Error!",
        text: `${login?.data.message}`,
        icon: "error",
        timer: 6000,
      });
    }

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("userId", login?.data.user.id);
    swal({
      title: "Usuário cadastrado com sucesso!",
      icon: "success",
      timer: 6000,
    });

    navigate(RoutesPath.DASHBOARD);
  };

  return (
    <div className="singup">
      {/* <ReturnPage Route={() => navigate(-1)} /> */}

      <section className="singup-section">

        <form
          action="submit"
          onSubmit={handleRegisterUser}
          className="singup-form"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            required
          />
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder=" your nickname"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" Enter your Email"
            required
          />

          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder=" Put your CPF"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder=" Enter a password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder=" Confirm your password"
            required
          />

          <button type="submit">Register</button>
        </form>
      </section>
    </div>
  );
};

export default SingUp;
