const { uuid } = require("uuidv4");
const axios = require("axios");
const Order = require("../models/orders.model");
const User = require("../models/user.models");

const handleOrderCreate = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      KefleKetema,
      FriendlyPlace,
      Amount,
      ProductId,
      BuyerId,
      ProductName,
      ProductImage,
      OrderDate,
    } = req.body;

    const tx_ref = uuid();

    const response = await axios
      .post(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          amount: Amount,
          currency: "ETB",
          email: Email,
          first_name: FirstName,
          last_name: LastName,
          phone_number: PhoneNumber,
          tx_ref,
          return_url: "https://elfegn.netlify.app/buyerpage/payment/verify",
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
          FirstName,
          LastName,
          Email,
          PhoneNumber,
          KefleKetema,
          FriendlyPlace,
          Amount,
          ProductId,
          BuyerId,
          ProductName,
          ProductImage,
          tx_ref,
          PayemntVerify: false,
          Delivered: false,
          OrderDate,
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
        res.redirect("https://elfegn.netlify.app/buyerpage/payment/failure");
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
                  { PayemntVerify: true },
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

const handlePendingOrderGetPaginate = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const orderPerPage = 3;

    const orderList = [];
    const order = await Order.find({ Delivered: false })
        .skip(pageNum * orderPerPage)
        .limit(orderPerPage);
      
    order.forEach((o) => orderList.push(o));
    
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

const handleDeliveredOrderGetPaginate = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const orderPerPage = 3;

    const orderList = [];
    const order = await Order.find({ Delivered: true })
        .skip(pageNum * orderPerPage)
        .limit(orderPerPage);
      
    order.forEach((o) => orderList.push(o));
    
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


const handleApproveDelivery = async (req, res) => {
  try {
    const id = req.params.id;

    const update = await Order.findByIdAndUpdate(
      id,
      { Delivered: true },
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ delivered: false });
    }
    
    res
      .status(201)
      .json({ delivered: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleOrderCreate,
  handleOrderVerification,
  handleOrderGet,
  handleOrderGetPaginate,
  handlePendingOrderGetPaginate,
  handleDeliveredOrderGetPaginate,
  handleApproveDelivery,
};
