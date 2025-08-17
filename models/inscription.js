const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  discipline: {
    type: String,
    required: true,
    enum: ['football-minimes', 'football-seniors', 'jeu-dames', 'petanque']
  },
  disciplineType: {  // football / duo / solo
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  // Champs dynamiques selon le type de discipline
  coachName: { type: String },       // pour football
  teamName: { type: String },        // pour football
  playerList: { type: [String] },   // pour football
  duoNames: { type: [String] },     // pour duo
  soloName: { type: String },        // pour solo

  paymentStatus: {                   // suivi du paiement
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inscription', inscriptionSchema);
