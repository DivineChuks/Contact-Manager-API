import Contact from "../models/Contact.js";
import asyncHandler from "express-async-handler";

//@desc Create contacts
//route POST /api/contact
//access Private

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//@desc Get all contacts
//route GET /api/contact
//access Private

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Get contact
//route GET /api/contact/:id
//access Public

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id === req.user.id){
    res.status(200).json(contact);
  } else {
    res.status(403)
    throw new error("You can only view your contact")
  }
  
});

export const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error("Contact does not exist")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("You can only update your contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    res.status(200).send(updatedContact)
})

export const deleteContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
      res.status(400)
      throw new Error("Contact does not exist")
  }

  if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error("You can only delete your contact")
  }
  await Contact.findByIdAndDelete(req.params.id)
  res.status(200).send("Contact has been deleted")
})
