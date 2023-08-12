// notes.route.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

router.route('/add')
  .post(notesController.addNotes);


router.route('/:id')

  .patch(notesController.updateNoteById)
  .delete(notesController.deleteNoteById)

  router.route('/all/:id')
  .get(notesController.getAllNotes)
  
module.exports = router;
