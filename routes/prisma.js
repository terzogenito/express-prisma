const express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Prisma CRUD Routes

// Get all customers
router.get("/getall", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a customer by ID
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new customer
router.post("/post", async (req, res) => {
  const { name, phone, sellerid } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: { name, phone, sellerid },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer
router.put("/put/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, sellerid } = req.body;
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: { name, phone, sellerid },
    });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;