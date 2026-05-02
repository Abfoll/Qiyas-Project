import { Router } from "express";
import { userList } from "../userList.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json(userList);
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userList.find((entry) => String(entry.id) === userId);

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(404).json({ message: "User not found" });
});

router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "Name, email, and age are required" });
  }

  const newUser = {
    id: uuidv4(), // String UUID
    name,
    email,
    age: Number(age) // Ensure age is a number
  };

  userList.push(newUser);
  return res.status(201).json(newUser);
});

// Fixed: Changed userRoute to router
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = userList.findIndex((entry) => String(entry.id) === userId);

  if (userIndex !== -1) {
    userList.splice(userIndex, 1);
    return res.status(200).json({ message: "User deleted successfully" });
  }

  return res.status(404).json({ message: "User not found" });
});

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;
  const userIndex = userList.findIndex((entry) => String(entry.id) === userId);

  if (userIndex !== -1) {
    const updatedUser = {
      id: userList[userIndex].id, // Keep the same ID
      name: name || userList[userIndex].name,
      email: email || userList[userIndex].email,
      age: age !== undefined ? Number(age) : userList[userIndex].age
    };
    userList[userIndex] = updatedUser;
    return res.status(200).json(updatedUser);
  }

  return res.status(404).json({ message: "User not found" });
}); 


router.patch("/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;
  const userIndex = userList.findIndex((entry) => String(entry.id) === userId);

  if (userIndex !== -1) {
    const updatedUser = {
      ...userList[userIndex],
      name: name || userList[userIndex].name,
      email: email || userList[userIndex].email,
      age: age !== undefined ? Number(age) : userList[userIndex].age
    };
    userList[userIndex] = updatedUser;
    return res.status(200).json(updatedUser);
  }

  return res.status(404).json({ message: "User not found" });
});

// Basic search with a single term
// router.get("/search", (req, res) => {
//   const { q: searchTerm } = req.query;

//   if (!searchTerm) {
//     return res.status(400).json({ message: "Search term (q) is required" });
//   }     

export default router;