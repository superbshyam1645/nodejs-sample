const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const { generateToken } = require("../config/jwtUtils");
exports.getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const { password: _, ...userDetails } = user.toObject();

    // Generate JWT token
    const token = generateToken({ id: user._id, email: user.email });

    res.json({
      message: "User login successful",
      user: userDetails,
      token, // Send the token in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, password, email, address, age } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      password: hashedPassword,
      email,
      address,
      age,
    });
    await user.save();

    // Generate JWT token for the newly created user
    const token = generateToken({ id: user._id, email: user.email });

    res.status(201).json({
      message: "User created successfully",
      user: { name, email, address, age },
      token, // Send the token in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const { name, password, email, address, age } = req.body;
    const updateData = {};

    // Add fields to updateData only if they are provided
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    if (age) updateData.age = age;

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // If no fields are provided to update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true, // Optional: Ensure the update adheres to the model schema
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
