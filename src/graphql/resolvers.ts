import bcyrpt from "bcryptjs";
import User from "../models/User";

const signup = async (args, req) => {
  const { username, email, password } = args.signupInputData;
  console.log(username, email, password);
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res
  //     .status(ERROR_CODE_UNPROCESSED_ENTITY)
  //     .json({ message: "Auth failed", error: errors.array() });
  // }

  try {
    const salt = await bcyrpt.genSalt(12);
    const crypted = await bcyrpt.hash(password, salt);

    return await User.create({ email, password: crypted, username });
    // res.status(SUCCESS_CODE_CREATED)
    //   .json({ message: "User created successfully" });

    // await EmailService.send({
    //   to: email,
    //   from: OfficialEmailE.SUPPORT,
    //   template: { ...signup },
    // });
  } catch (e) {
    return { status: false, message: "Unable to signup" };
  }
};

export default {
  signup,
};
