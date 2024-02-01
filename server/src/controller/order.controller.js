const { uuid } = require("uuidv4");
const axios = require("axios");
const Order = require("../models/orders.model");
const User = require("../models/user.models");
const Balance = require("../models/balance.models");

const handleOrderCreate = async (req, res) => {
  try {
    const {
      GiftId,
      BuyerId,
      SellerId,
      GiftImage,
      GiftName,
      OrderDate,
      amount,
      email,
      first_name,
      last_name,
      phone_number,
    } = req.body;

    const tx_ref = uuid();

    const response = await axios
      .post(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          amount,
          currency: "ETB",
          email,
          first_name,
          last_name,
          phone_number,
          tx_ref,
          return_url: "https://merita.netlify.app/buyerpage/payment/verify",
        },
        {
          headers: {
            Authorization: "Bearer " + process.env.CHAPA_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      .catch(function (error) {
        console.log(error);
      });
    if (response.data["status"] === "success") {
      try {
        console.log("create");
        await Order.create({
          GiftId,
          BuyerId,
          SellerId,
          tx_ref,
          amount,
          paymentStatus: "pending",
          GiftImage,
          GiftName,
          OrderDate,
          OrderActive: false,
          OrderDelivered: false,
        });
        res.json({
          status: "success",
          url: response.data["data"].checkout_url,
          tx_ref,
        });
      } catch (error) {
        res.json({
          status: "fail",
          url: null,
        });
        res.redirect("https://merita.netlify.app/buyerpage/payment/failure");
      }
    } else {
      console.log("error");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleOrderVerification = async (req, res) => {
  try {
    console.log("verify complete");
    const { tx_ref } = req.body;

    console.log(`text_ref  ${tx_ref}`);
    if (tx_ref) {
      await axios
        .get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
          headers: {
            Authorization: "Bearer " + process.env.CHAPA_KEY,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            if (response.data.status === "success") {
              try {
                await Order.findOneAndUpdate(
                  {
                    tx_ref: tx_ref,
                  },
                  { OrderActive: true, paymentStatus: "completed" },
                  { new: true }
                );
                res.json({
                  paid: true,
                });
              } catch (error) {
                console.log(error);
                res.status(500).json({
                  error: "An error occurred while updating the order",
                });
              }
            } else {
              // Process the unsuccessful response
              res.json({
                paid: false,
              });
            }
          }
        })
        .catch((error) => {
          console.log("verify error");
        });
    } else {
      res.status(400).json({ error: "tx_ref is missing" });
    }
  } catch (err) {
    console.log("error");
  }
};

const handleOrderGet = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(201).json({
      message: "blog fetched successfully",
      success: true,
      order,
    });
  } catch (err) {
    console.log("verify error");
    res.status(500).json({ error: err.message });
  }
};

const handleOrderGetPaginate = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const id = req.query.id;
    console.log(id);
    const orderPerPage = 3;

    const buyer = await Order.findOne({ BuyerId: id });
    const seller = await Order.findOne({ SellerId: id });

    const orderList = [];
    if (buyer) {
      const buyerorder = await Order.find({ BuyerId: id })
        .skip(pageNum * orderPerPage)
        .limit(orderPerPage);
      console.log("buyer");
      buyerorder.forEach((o) => orderList.push(o));
    }
    if (seller) {
      const sellerorder = await Order.find({ SellerId: id })
        .skip(pageNum * orderPerPage)
        .limit(orderPerPage);
      console.log("seller");
      sellerorder.forEach((o) => orderList.push(o));
    }
    res.status(201).json({
      message: "blog fetched successfully",
      success: true,
      orders: orderList,
      hasMore: orderList.length == orderPerPage,
    });
  } catch (err) {
    console.log("verify error");
    res.status(500).json({ error: err.message });
  }
};

const handleOrderApprove = async (req, res) => {
  try {
    const { id, userId } = req.body;
    console.log("order approve");
    const order = await Order.findByIdAndUpdate(
      id,
      {
        OrderDelivered: true,
      },
      { new: true }
    );
    const value = await Balance.find({ user_id: userId });
    console.log("balance", value);
    console.log("balance", value[0].balance);
    const balance = await Balance.findOneAndUpdate(
      { user_id: userId },
      {
        balance: order.amount + value[0].balance,
      },
      { new: true }
    );
    console.log("order amount", order.amount);
    console.log("user id", userId);
    console.log("balance", balance);
    res.json({ message: "Delivery approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleOrderDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDocument = await Order.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the document" });
  }
};

module.exports = {
  handleOrderCreate,
  handleOrderVerification,
  handleOrderGet,
  handleOrderGetPaginate,
  handleOrderApprove,
  handleOrderDelete,
};
