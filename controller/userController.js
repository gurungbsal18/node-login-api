import Users from "../models/userSchema.js";

export async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;
    const newUser = new Users({ username, password, email });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Fail to create user", error);
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.log("Unable to login", error);
    res.status(500).json({ message: "Server error" });
  }
}
