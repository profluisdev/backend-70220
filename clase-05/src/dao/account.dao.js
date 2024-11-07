import { accountModel } from "./models/account.model.js";

class AccountDao {
  async getAll() {
    return await accountModel.find();
  }

  async getOne(query) {
    return await accountModel.findOne(query);
  }

  async createAccount(userData) {
    const { name, lastName, _id = "null" } = userData;
    //Generar el número de cuenta
    const accountNumber = Math.floor(Math.random() * 1000000000);

    // Generar un alias
    const alias = `${name.toLowerCase()}${lastName.toLowerCase()}.${accountNumber
      .toString()
      .slice(-4)}`;
    const accountData = {
      alias,
      number: accountNumber,
      userId: _id,
    };
    return await accountModel.create(accountData);
  }

  async update(id, data) {
    return await accountModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deposit(query, amount) {
    // Buscamos la cuenta por alias o por número de cuenta
    const account = await accountModel.findOne(query);

    return await accountModel.findByIdAndUpdate(
      account._id,
      { balance: account.balance + amount },
      { new: true }
    );
  }

  async extract(query, amount) {
    // Buscamos la cuenta por alias o por número de cuenta
    const account = await accountModel.findOne(query);

    return await accountModel.findByIdAndUpdate(
      account._id,
      { balance: account.balance - amount },
      { new: true }
    );
  }

  async transfer(originQuery, destinationQuery, amount) {
    const destinationAccount = await accountModel.findOne(destinationQuery);
    const originAccount = await accountModel.findOne(originQuery);

    const originAccountUpdate = await accountModel.findByIdAndUpdate(
      originAccount._id,
      { balance: originAccount.balance - amount },
      { new: true }
    );
    const destinationAccountUpdate = await accountModel.findByIdAndUpdate(
      originAccount._id,
      { balance: destinationAccount.balance + amount },
      { new: true }
    );

    return {
      originAccount: originAccountUpdate,
      destinationAccount: destinationAccountUpdate,
    };
  }
}

export const accountDao = new AccountDao();
