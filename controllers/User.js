const User = require("../models/UserModel");

//GET REQUESTS

exports.welcome = (req, res) => {
  res.json({
    message: "Welcome!! to my first Zuri CRUD App hosted in Heroku ",
  });
};

exports.getAllUSers = async (req, res) => {
  try {
    const response = await User.find();
    res.json({
      message: "Request for all users successful",
      data: response,
    });
  } catch (error) {
    res.json({ message: "Error, failed to load", data: error });
  }
};

exports.getUserByName = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await User.findOne({ name });
    if (!!response) {
      return res.json({
        message: `Hello ${name},Here is your information.`,
        data: response,
      });
    }
    res.json({ message: "Error, name does not exist" });
  } catch (error) {
    res.json({ message: "Sorry,please try again" });
  }
};

//GET REQUESTS ENDS

// POST REQUESTS STARTS HERE
exports.addUser = async (req, res) => {
  const { name, email, country } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //do simple validation and make all fields are present

  // save the user if every thing is present and validated
  try {
    if (!name || name.length < 3) {
      return res.json({
        message:
          "Name cannot be empty,required field",
      });
    }
    if (!emailRegex.test(email)) {
      return res.json({ message: "Invalid email" });
    }
    if (!country || country.length < 2) {
      return res.json({
        message: "Country cannot be empty,please provide country",
      });
    }
    //create new instance of the model
    const newUser = new User({ name, email, country });
    const response = await newUser.save();
    res.json({
      message: `Congrats!!! ${name}, Your data has been created successfully.`,
      data: response,
    });
  } catch (error) {
    res.json({ message: "Error,user cannot be created, please try again" });
  }
};

// POST REQUESTS ENDS HERE

// UPDATE REQUESTS STARTS HERE
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, country } = req.body;

  try {
    //do simple validation and make all fields are present
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name || name.length < 3) {
      return res.json({
        message:
          "Name cannot be empty,name required",
      });
    }
    if (!emailRegex.test(email)) {
      return res.json({ message: "Invalid email" });
    }
    if (!country || country.length < 2) {
      return res.json({
        message: "Country cannot be empty,please enter country",
      });
    }

    const response = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });

    res.json({ message: "User updated successfully", data: response });
  } catch (error) {
    res.json({ message: "Could not update,Try again." });
  }
};

// UPDATE REQUESTS ENDS HERE

//Delete

exports.deleteUser = async (req, res) => {
  const username = req.params.name;
  try {
    const response = await User.findOneAndRemove({ name: username });
    res.json({ message: "User deleted succesfully." });
  } catch (error) {
    res.json({ message: "Error,couldn't delete user, try again later." });
  }
};
