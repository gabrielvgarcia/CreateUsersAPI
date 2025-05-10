import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    })
    .optional(),
});

const updateSchema = userSchema.partial();

// POST - Create User
router.post('/', async (req, res) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const user = await prisma.user.create({ data: parsed.data });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'User was not created.' });
  }
});

// PUT - Update User
router.put('/:id', async (req, res) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: parsed.data,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: 'User Not found or error on updating.' });
  }
});

// GET - List Users
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const filters = {};
  if (req.query.name) filters.name = req.query.name;
  if (req.query.email) filters.email = req.query.email;

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: filters,
    });

    const total = await prisma.user.count({ where: filters });

    return res.status(200).json({
      data: users,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error Showing results.' });
  }
});

// GET - Get User by id
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ error: 'User Not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error Showing results.' });
  }
});

// DELETE - Remove user
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: 'User not found or error on deleting' });
  }
});

export default router;
