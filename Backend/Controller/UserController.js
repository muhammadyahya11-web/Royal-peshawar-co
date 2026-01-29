import User from "../Module/UUserModule.js";

const getCurrentUser = async (req, res) => {
  try {

    // token middleware will set req.userId
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(204).json({
        message:"user is not login "
      });
    }

    return res.status(200).json({
      message:"user is login" ,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export default getCurrentUser;

// ================================================================


export const getProfile = async (req, res) => {
  try {
    const user = req.userId
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const updatedFields = { name, email };
    if (phone !== undefined) updatedFields.phone = phone;
    if (address !== undefined) updatedFields.address = address;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updatedFields,
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};