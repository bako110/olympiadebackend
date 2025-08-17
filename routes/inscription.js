const express = require('express');
const router = express.Router();
const { createInscription } = require('../controllers/InscriptionController');

// Route POST pour créer une inscription
router.post('/inscription', createInscription);

module.exports = router;
