const express = require("express");

const router = express.Router();

const contactService = require("../grpc/contact.js");
const auth = require("../middlewares/auth.js");

router.use(auth);

// create contact
router.post("/", (req, res) => {
  contactService
    .createContact(req.token, req.body)
    .then((recordId) => {
      res.status(200).json(recordId);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ msg: "failed to create new contact" });
    });
});

// get contact by id
router.get("/:id", (req, res) => {
  contactService
    .getContact(req.token, req.params.id)
    .then((record) => {
      res.status(200).json(record);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).json({ msg: "record not found" });
    });
});

// get all contacts
router.get("/", (req, res) => {
  contactService
    .getAllContacts(req.token)
    .then((records) => {
      res.status(200).json(records);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ msg: "failed to fetch contacts" });
    });
});

// update contact by id
router.patch("/:id", (req, res) => {
  contactService
    .updateContact(req.token, req.params.id, req.body)
    .then((record) => {
      res.status(200).json(record);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ msg: "failed to update contact" });
    });
});

// delete contact by id
router.delete("/:id", (req, res) => {
  contactService
    .deleteContact(req.token, req.params.id)
    .then(() => {
      res.status(200).json({ msg: "contact deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ msg: "failed to delete contact" });
    });
});

module.exports = router;
