import { Router } from "express";
import { userList } from "../userList.js";
import { productList } from "../productList.js";

const router = Router();

// Search users only (your original intent)
router.get("/users", (req, res) => {
  const { name, email, q } = req.query;
  const searchTerm = name || email || q;

  if (!searchTerm) {
    return res.status(400).json({ 
      message: "Search query parameter (name, email, or q) is required" 
    });
  }

  // Validate userList exists
  if (!userList || !Array.isArray(userList)) {
    return res.status(500).json({ message: "User data is not available" });
  }

  // Validate search term length
  if (searchTerm.length < 2) {
    return res.status(400).json({ 
      message: "Search term must be at least 2 characters long" 
    });
  }

  const searchLower = searchTerm.toLowerCase();
  
  // Search in multiple fields
  const results = userList.filter((entry) => {
    return (
      entry.name?.toLowerCase().includes(searchLower) ||
      entry.email?.toLowerCase().includes(searchLower) ||
      entry.age?.toString().includes(searchLower)
    );
  });

  if (results.length > 0) {
    return res.status(200).json({
      count: results.length,
      results: results
    });
  }

  return res.status(404).json({ 
    message: `No users found matching "${searchTerm}"` 
  });
});

// Advanced search with multiple criteria
router.get("/advanced", (req, res) => {
  const { name, email, minAge, maxAge } = req.query;

  if (!userList || !Array.isArray(userList)) {
    return res.status(500).json({ message: "User data is not available" });
  }

  let results = [...userList];

  // Filter by name (partial match, case-insensitive)
  if (name) {
    const nameLower = name.toLowerCase();
    results = results.filter(user => 
      user.name?.toLowerCase().includes(nameLower)
    );
  }

  // Filter by email (partial match, case-insensitive)
  if (email) {
    const emailLower = email.toLowerCase();
    results = results.filter(user => 
      user.email?.toLowerCase().includes(emailLower)
    );
  }

  // Filter by age range
  if (minAge) {
    results = results.filter(user => user.age >= parseInt(minAge));
  }
  if (maxAge) {
    results = results.filter(user => user.age <= parseInt(maxAge));
  }

  return res.status(200).json({
    count: results.length,
    criteria: { name, email, minAge, maxAge },
    results: results
  });
});

// Search across all collections (users and products)
router.get("/all", (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query parameter 'q' is required" });
  }

  if (q.length < 2) {
    return res.status(400).json({ message: "Search term must be at least 2 characters" });
  }

  const searchLower = q.toLowerCase();
  const results = {
    users: [],
    products: []
  };

  // Search in users
  if (userList && Array.isArray(userList)) {
    results.users = userList.filter(user =>
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  }

  if (productList && Array.isArray(productList)) {
    results.products = productList.filter((product) =>
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower)
    );
  }

  const totalCount = results.users.length + results.products.length;

  if (totalCount > 0) {
    return res.status(200).json({
      total: totalCount,
      ...results
    });
  }

  return res.status(404).json({ 
    message: `No results found for "${q}"` 
  });
});

// Keep your original simple search but with fixes
router.get("/", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name query parameter is required" });
  }

  // Validate name parameter
  if (typeof name !== 'string') {
    return res.status(400).json({ message: "Name parameter must be a string" });
  }

  if (name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters" });
  }

  // Check if userList exists
  if (!userList || !Array.isArray(userList)) {
    return res.status(500).json({ message: "User data is not available" });
  }

  // Find ALL matching users (not just first)
  const users = userList.filter(
    (entry) => entry.name?.toLowerCase() === name.toLowerCase()
  );

  if (users.length > 0) {
    return res.status(200).json({
      count: users.length,
      users: users
    });
  }

  return res.status(404).json({ 
    message: `No users found with name "${name}"` 
  });
});

export default router;