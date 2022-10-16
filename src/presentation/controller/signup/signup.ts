import { AddAccount } from "../../../domain/use-cases/add-account";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError, created } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../../protocols/email-validator";

export class SignUpController implements Controller {
   constructor(
      private readonly emailValidator: EmailValidator,
      private readonly addAccount: AddAccount,
   ) {}

   async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
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

         const account = await this.addAccount.save({
            name,
            email,
            password
         });

         return created(account);
      } catch (_) {
         return serverError();
      }

   }
}