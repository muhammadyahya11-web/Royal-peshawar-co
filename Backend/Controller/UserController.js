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
