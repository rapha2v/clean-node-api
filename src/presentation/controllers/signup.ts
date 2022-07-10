import { httpResponse, httpRequest } from "../protocols/http";
import { MissingParamError } from "../errors/missing-param-error";

export default class SignupController {
  private returnHandle: httpResponse;

  handle(httpRequest: httpRequest): httpResponse {
    if (
      this.checkBodyParamIsInvalid(
        "name",
        new RegExp(/^[a-zA-Z\s]+$/),
        httpRequest
      )
    )
      return this.returnHandle;
    if (
      this.checkBodyParamIsInvalid(
        "email",
        new RegExp(/\w+@[a-z]+\.com(\.br)?/),
        httpRequest
      )
    )
      return this.returnHandle;
    if (this.isValidPassword(httpRequest)) return this.returnHandle;
    if (this.isValidConfirmPassword(httpRequest)) return this.returnHandle;
  }

  private checkBodyParamIsInvalid(
    nameParam: string,
    reg: RegExp,
    httpRequest: httpRequest
  ): boolean {
    const param = httpRequest.body[nameParam] || "";
    const paramTest = !reg.test(param);

    if (paramTest) {
      this.returnHandle = {
        statusCode: 400,
        body: new MissingParamError(nameParam),
      };
      return true;
    } else return false;
  }

  private isValidPassword(httpRequest: httpRequest): boolean {
    const password = httpRequest.body.password || "";
    if (password < 8) {
      this.returnHandle = {
        statusCode: 400,
        body: new MissingParamError("password"),
      };
      return true;
    } else return false;
  }

  private isValidConfirmPassword(httpRequest: httpRequest): boolean {
    const confirmPassword = httpRequest.body.confirmPassword || "";
    const password = httpRequest.body.password || "";
    if (confirmPassword === "" || password !== confirmPassword) {
      this.returnHandle = {
        statusCode: 400,
        body: new MissingParamError("confirmPassword"),
      };
      return true;
    } else return false;
  }
}
