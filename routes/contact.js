import express from 'express'
import { createContact, getContact, getContacts, updateContact, deleteContact } from '../controllers/contact.js'
import { validateToken } from '../middleware/validateToken.js'

const router = express.Router()

router.get("/", validateToken, getContacts )

router.post("/", validateToken, createContact)

router.get("/:id", validateToken, getContact)

router.put("/:id", validateToken, updateContact )

router.delete("/:id",validateToken, deleteContact )

export default router