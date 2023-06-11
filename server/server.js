import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// the path od users in a json file
const usersFilePath = "server/users.json";

// we get the users from the json file
const getUsers = () => {
  const usersData = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(usersData);
};

// we save the users in the json file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
};

// base api route for checking if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

//api route to register a new user
app.post("/api/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    country,
    dateOfBirth,
    phoneNumber,
    acceptTerms,
    password,
  } = req.body;

  // we check if the email is already in use
  const users = getUsers();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  try {
    //we encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      country,
      dateOfBirth,
      phoneNumber,
      acceptTerms,
      password: hashedPassword,
    };

    users.push(newUser);
    saveUsers(users);

    // we return the new user
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// api route to edit a user
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const {
    firstName,
    lastName,
    country,
    dateOfBirth,
    phoneNumber,
    acceptTerms,
    password,
  } = req.body;

  const users = getUsers();
  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // we have to encrypt the password again
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      country,
      dateOfBirth,
      phoneNumber,
      acceptTerms,
      password: hashedPassword,
    };

    const updatedUsers = users.map((u) =>
      u.id === parseInt(userId) ? updatedUser : u
    );
    saveUsers(updatedUsers);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api route to login a user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // we check if the email exists
  const users = getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
