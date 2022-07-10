import SignupController from "./signup";
import { MissingParamError } from "../errors/missing-param-error";

describe("SignUp Controller", () => {
  /**
   * Verificação de erro 400 Bad Request
   **/
  test("Should return 400 if no name is provided", () => {
    /**
     * Iniciando a instância da classe com o nome "sut" system under test
     **/
    const sut = new SignupController();

    const httpRequest = {
      body: {
        email: "raphael_porto@outlook.com",
        password: "1234567!R",
        confirmPassword: "1234567!R",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const sut = new SignupController();

    const httpRequest = {
      body: {
        name: "Raphael Porto",
        password: "",
        confirmPassword: "",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: "Raphael Porto",
        email: "raphael_porto@outlook.com",
        confirmPassword: "1234567!@",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no confirmPassword is provided", () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: "Raphael Porto",
        email: "raphael_porto@outlook.com",
        password: "1234567!@",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.confirmPassword).toEqual(
      new MissingParamError("confirmPassword")
    );
  });

  // test("", () => {
  //   const sut = new SignupController();
  //   const httpRequest = {};
  // });
});
