import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { HttpRequest } from "../../protocols";
import { EmailValidator } from "../../protocols/email-validator";

export class SignUpController {
   constructor(
      private readonly emailValidator: EmailValidator,
   ) {}

   execute(httpRequest: HttpRequest): any {
      try {
         const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

         for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
               return badRequest(new MissingParamError(field));
            }
         }

         const { name, email, password, passwordConfirmation } = httpRequest.body;

         if (password !== passwordConfirmation) {
            return badRequest(new InvalidParamError('passwordConfirmation'));
         }

         const isValid = this.emailValidator.isValid(email);
         if (!isValid) {
            return badRequest(new InvalidParamError('email'));
         }
      } catch (_) {
         return serverError();
      }

   }
}