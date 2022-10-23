import { AddAccountModel } from "../../domain/use-cases/add-account";
import { AccountModel } from "../user-cases/add-account/db-add-account-protocols";

export interface AddAccountRepository {
   save(accountData: AddAccountModel): Promise<AccountModel>;
}