import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import swal from "sweetalert";
import styled, { createGlobalStyle } from "styled-components";
import logoImg from "../../assets/img/logo.png";

const GlobalStyle = createGlobalStyle`
  /* Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  /* Body Styles */
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1c1c1c, #343434); /* Fundo com gradiente */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginSection = styled.section`
  background-color: rgba(0, 0, 0, 0.7); /* Adiciona um overlay escuro */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px;
  position: relative;
  overflow: visible;
  padding-top: 20px;
`;

const LoginContent = styled.div`
  text-align: center;
`;

const Logo = styled.div`
  background: url(${logoImg}) no-repeat center top;
  background-size: contain;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
`;

const FormContainer = styled.div`
  padding: 20px; /* Adiciona espaçamento interno */
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: none;
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); /* Altera a cor de fundo dos inputs */
  color: #fff;
  border-radius: 5px;
  border-bottom: 2px solid #555;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-bottom-color: #ffcc00;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: none;
  background-color: #ffcc00;
  color: #1c1c1c;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffdd33;
  }
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #fff;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #ffcc00;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const navigation = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChangesValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const service = new authService();
    const response: any = await service.login(values);

    if (!response) {
      swal({
        title: "Login Error",
        text: "Invalid username and/or password",
        icon: "error",
        timer: 6000,
      });
    }

    const jwt = response?.data?.token;
    const userId = response?.data?.user?.id;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);
      swal({
        title: "Welcome",
        icon: "success",
        timer: 3000,
      });
      navigation("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Main>
        <LoginContainer>
          <LoginSection>
            <Logo />
            <LoginContent>
              <FormContainer>
                <form onSubmit={handleLogin}>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your login email"
                    required
                    value={values.email}
                    onChange={handleChangesValues}
                  />

                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your access password"
                    required
                    value={values.password}
                    onChange={handleChangesValues}
                  />

                  <Paragraph>
                    You don't have an account created{" "}
                    <strong>
                      <StyledLink to={"/SingUp"}>Create one here!</StyledLink>
                    </strong>
                  </Paragraph>

                  <Button type="submit">Login</Button>
                </form>
              </FormContainer>
            </LoginContent>
          </LoginSection>
        </LoginContainer>
      </Main>
    </React.Fragment>
  );
};

export default Login;
