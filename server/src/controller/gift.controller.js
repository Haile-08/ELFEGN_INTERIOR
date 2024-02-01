const Gift = require("../models/gift.models");
const User = require("../models/user.models");

const handlePostGift = async (req, res) => {
  try {
    const {
      gift_name,
      gift_price,
      gift_category,
      gift_description,
      gift_star,
      gift_client,
      gift_location,
      gift_status,
      gift_date,
      seller_id,
    } = req.body;
    const { path } = req.file;

    await Gift.create({
      gift_name,
      gift_image: path,
      gift_price,
      gift_category,
      gift_description,
      gift_star,
      gift_client,
      gift_location,
      gift_status,
      gift_date,
      seller_id,
    });

    res
      .status(201)
      .json({ message: "gift created successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetGifts = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const giftsPerPage = 6;

    const gifts = await Gift.find()
      .skip(pageNum * giftsPerPage)
      .limit(giftsPerPage);

    const giftList = [];
    gifts.forEach((gift) => giftList.push(gift));

    res.status(201).json({
      message: "Gifts fetched successfully",
      success: true,
      gifts: giftList,
      hasMore: giftList.length == giftsPerPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetAGift = async (req, res) => {
  try {
    const id = req.params.id;
    const gift = await Gift.findById(id);
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, gift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, gifts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleUpdateRating = async (req, res) => {
  try {
    const { gift_id, buyer_id, rating_num } = req.body;
    const gift = await Gift.findById(gift_id);
    const user = await User.findById(buyer_id);
    console.log(rating_num);
    console.log(Number(gift.gift_star));
    console.log(Number(gift.number_reviewed));
    const updated_Rating =
      (Number(rating_num) + Number(gift.gift_star)) /
      (Number(gift.number_reviewed) + 1);

    const total_reviewed = Number(gift.number_reviewed) + 1;
    await Gift.findOneAndUpdate(
      { _id: gift_id },
      { gift_star: updated_Rating, number_reviewed: total_reviewed },
      { new: true }
    );
    console.log(updated_Rating);

    const new_array = [...user.rated_gifts, gift_id];
    console.log(new_array);

     await User.updateOne({ _id: buyer_id }, { rated_gifts: new_array });
     const updatedUser = await User.findById(buyer_id);
     res
       .status(201)
       .json({ message: "gift rated", success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGiftDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDocument = await Gift.findByIdAndDelete(id);
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
  handlePostGift,
  handleGetGifts,
  handleGetAGift,
  handleGetAllGifts,
  handleUpdateRating,
  handleGiftDelete,
};
