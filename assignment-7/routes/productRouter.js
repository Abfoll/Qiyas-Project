import { Router } from "express";
import { productList } from "../productList.js";

const router = Router();

// Validate that productList exists and is an array
if (!productList || !Array.isArray(productList)) {
  console.error("productList is not properly imported or is not an array");
}

// GET all products
router.get("/", (req, res) => {
  if (!productList || !Array.isArray(productList)) {
    return res.status(500).json({ message: "Product data is not available" });
  }
  return res.status(200).json(productList);
});

// GET single product by ID
router.get("/:id", (req, res) => {
  // Validate productList exists
  if (!productList || !Array.isArray(productList)) {
    return res.status(500).json({ message: "Product data is not available" });
  }

  // Parse ID with validation
  const productId = Number.parseInt(req.params.id, 10);
  
  // Check if ID is a valid number
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID format. ID must be a number." });
  }

  const product = productList.find((entry) => entry.id === productId);

  if (product) {
    return res.status(200).json(product);
  }

  return res.status(404).json({ message: "Product not found" });
});

// POST - Create new product (if needed)
router.post("/", (req, res) => {
  const { name, price, description, category } = req.body;

  // Validate required fields
  if (!name || !price) {
    return res.status(400).json({ 
      message: "Product name and price are required" 
    });
  }

  // Validate productList exists
  if (!productList || !Array.isArray(productList)) {
    return res.status(500).json({ message: "Product data is not available" });
  }

  // Create new product with numeric ID
  const newProduct = {
    id: productList.length > 0 ? Math.max(...productList.map(p => p.id)) + 1 : 1,
    name,
    price: Number(price),
    description: description || "",
    category: category || "Uncategorized"
  };

  productList.push(newProduct);
  return res.status(201).json(newProduct);
});

// DELETE - Remove a product
router.delete("/:id", (req, res) => {
  // Validate productList exists
  if (!productList || !Array.isArray(productList)) {
    return res.status(500).json({ message: "Product data is not available" });
  }

  const productId = Number.parseInt(req.params.id, 10);
  
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID format. ID must be a number." });
  }

  const productIndex = productList.findIndex((entry) => entry.id === productId);

  if (productIndex !== -1) {
    productList.splice(productIndex, 1);
    return res.status(200).json({ message: "Product deleted successfully" });
  }

  return res.status(404).json({ message: "Product not found" });
});

// PUT/PATCH - Update a product
router.put("/:id", (req, res) => {
  const productId = Number.parseInt(req.params.id, 10);
  
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID format. ID must be a number." });
  }

  const productIndex = productList.findIndex((entry) => entry.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, description, category } = req.body;
  
  // Update only provided fields
  productList[productIndex] = {
    ...productList[productIndex],
    name: name || productList[productIndex].name,
    price: price ? Number(price) : productList[productIndex].price,
    description: description || productList[productIndex].description,
    category: category || productList[productIndex].category
  };

  return res.status(200).json(productList[productIndex]);
});

export default router;