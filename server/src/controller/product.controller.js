const Product = require("../models/product.models");
const User = require("../models/user.models")

const handleGetAllProduct = async (req, res) => {
    try {
      const product = await Product.find();
      res
        .status(201)
        .json({ message: "product fetched successfully", success: true, product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const handleGetAProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res
      .status(201)
      .json({ message: "A product fetched successfully", success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const handleUpdateRating = async (req, res) => {
  try {
    const { product_id, buyer_id, rating_num } = req.body;
    const product = await Product.findById(product_id);
    const user = await User.findById(buyer_id);

    const updated_Rating =
      (Number(rating_num) + Number(product.star)) /
      (Number(product.number_reviewed) + 1);

    const total_reviewed = Number(product.number_reviewed) + 1;
    await Product.findOneAndUpdate(
      { _id: product_id},
      { star: updated_Rating, number_reviewed: total_reviewed },
      { new: true }
    );

    const new_array = [...user.rated_gifts, product_id];

     await User.updateOne({ _id: buyer_id }, { rated_gifts: new_array });
     const updatedUser = await User.findById(buyer_id);
     res
       .status(201)
       .json({ message: "gift rated", success: true, user: updatedUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    handleGetAllProduct,
    handleGetAProduct,
    handleUpdateRating
}