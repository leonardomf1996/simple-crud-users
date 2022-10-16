import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { HttpRequest } from "../../protocols";

export class SignUpController {
   execute(httpRequest: HttpRequest): any {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
         if (!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field));
         }
      }
   }
}