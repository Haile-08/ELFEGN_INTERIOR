const axios = require("axios");
const { uuid } = require("uuidv4");
const Withdraw = require("../models/withdraw.models");
const Balance = require("../models/balance.models");

const handleBankList = async (req, res) => {
  try {
    const response = await axios
      .get(`https://api.chapa.co/v1/banks`, {
        headers: {
          Authorization: "Bearer " + process.env.CHAPA_KEY,
        },
      })
      .then(async (response) => {
        res.status(201).json({ bank: response.data });
      })
      .catch((error) => {
        console.log(error);
        console.log("no bank list");
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWithdrawRequest = async (req, res) => {
  try {
    const {
      account_name,
      account_number,
      amount,
      bank_code,
      bank_name,
      seller_id,
      date,
    } = req.body;
    const reference = uuid();
    await Balance.findOneAndUpdate(
       { user_id: seller_id },
       { balance: 0 },
       { new: true }
     );

    await Withdraw.create({
      account_name,
      account_number,
      amount,
      beneficiary_name: account_name,
      reference,
      bank_code,
      bank_name,
      seller_id,
      Approved: false,
      Decline: false,
      success: false,
      date,
    }).catch((err) => {
      console.log(err);
    });
    res
      .status(201)
      .json({ message: "withdraw created successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleRequestList = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Withdraw.find({ seller_id: id });
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWithdrawAccept = async (req, res) => {
  try {
    const { id } = req.body;

    const withdraw = await Withdraw.findById(id);

    await Withdraw.findByIdAndUpdate(
      withdraw._id,
      {
        success: true,
      },
      { new: true }
    );
    // const response = await axios
    //   .post(
    //     "https://api.chapa.co/v1/transfers",
    //     {
    //       account_name: withdraw.account_name,
    //       account_number: withdraw.account_number,
    //       amount: withdraw.amount,
    //       currency: "ETB",
    //       beneficiary_name: withdraw.beneficiary_name,
    //       reference: withdraw.reference,
    //       bank_code: withdraw.bank_code,
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + process.env.CHAPA_KEY,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    res.status(201).json({ message: "withdraw accepted", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWithdrawVerification = async (req, res) => {
  try {
    const { id } = req.body;

    const withdraw = await Withdraw.findById(id);

    // await axios.get(
    //   `https://api.chapa.co/v1/transfers/verify/${withdraw.reference}`,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + process.env.CHAPA_KEY,
    //     },
    //   }
    // );
    res.status(201).json({ message: "withdraw verified", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetBalance = async (req, res) => {
  try {
    const id = req.params.id;
    const balance = await Balance.find({ user_id: id });

    res.status(201).json({
      message: "blog fetched successfully",
      success: true,
      balance: balance[0].balance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleGetBalance,
  handleBankList,
  handleWithdrawRequest,
  handleRequestList,
  handleWithdrawAccept,
  handleWithdrawVerification,
};
