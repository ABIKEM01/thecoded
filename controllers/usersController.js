import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

//@desc: get all users
//route: GET /api/v1/users
//access: private - admin only
const getUsers = async (req, res) => {
  // res.send('get all users')
  try {
    const user = await User.find({});
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

//@desc: create user
//route: POST /api/v1/users/register
//access: public

const createUser = async (req, res) => {
  const { business_name, email, password, role } = req.body;
  //check user doesnot exist

  // Check we have an email

  const userExist = await User.find({ email: email });
  console.log("userexist", userExist);
  if (userExist.length > 0) {
    throw new Error("Email already exists");
  }

  try {
    const user = await User.create({
      business_name,
      email,
      password,
      role: "admin",
    });

    res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        business_name: user.business_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      error: err.message,
    });
  }
};

//@desc: login users
//route: POST /api/v1/users/register
//access: public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check that email exist
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401);
      throw new Error(`User does not exist, please register`);
    }
    if (user && (await user.passwordMatched(password))) {
      res.status(200).json({
        status: "success",
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          token: await generateToken(user._id),
        },
      });
    } else {
      res.status(402);
      throw new Error("Invalid password");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err.message,
    });
  }
};

//access: private - admin only
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      console.log("no user found");
      return;
    }
    await user.remove();
    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

export { getUsers, createUser, loginUser, deleteUser };
