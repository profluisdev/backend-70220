import { Router } from "express";
import { accountDao } from "../dao/account.dao.js";

const router = Router();

router.put("/deposit", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;

    const queryAccount = alias ? { alias } : { number };

    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount)
      res.status(404).json({ status: "error", msg: "Account Not Found" });

    // Hacer el depósito
    const account = await accountDao.deposit(queryAccount, amount);

    res.status(200).json({ status: "ok", payload: account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/extract", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;

    const queryAccount = alias ? { alias } : { number };

    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount)
      res.status(404).json({ status: "error", msg: "Account Not Found" });

    // Hacer la extracción
    const account = await accountDao.extract(queryAccount, amount);

    res.status(200).json({ status: "ok", payload: account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/transfer", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const user = req.session.user;
    const queryAccount = alias ? { alias } : { number };

    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount)
      res.status(404).json({ status: "error", msg: "Account Not Found" });

    // Hacer la extracción
    const account = await accountDao.extract(queryAccount, amount);

    res.status(200).json({ status: "ok", payload: account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

export default router;
