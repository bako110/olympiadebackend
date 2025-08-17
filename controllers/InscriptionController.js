const Inscription = require('../models/inscription');
const sendTelegramMessage = require('../telegram');

exports.createInscription = async (req, res) => {
  try {
    const {
      telephone,
      discipline,
      disciplineType, 
      price,
      coachName,
      teamName,
      playerList,
      duoNames,
      soloName,
      ville,
      email
    } = req.body;

    // Normaliser les listes
    let playersArray = [];
    if (playerList) {
      if (typeof playerList === 'string') {
        playersArray = playerList.split('\n').map(s => s.trim()).filter(Boolean);
      } else if (Array.isArray(playerList)) {
        playersArray = playerList.map(s => s.trim()).filter(Boolean);
      }
    }

    let duoArray = [];
    if (duoNames) {
      if (typeof duoNames === 'string') {
        duoArray = duoNames.split(',').map(s => s.trim()).filter(Boolean);
      } else if (Array.isArray(duoNames)) {
        duoArray = duoNames.map(s => s.trim()).filter(Boolean);
      }
    }

    const inscription = new Inscription({
      telephone,
      discipline,
      disciplineType,
      price,
      coachName: coachName || undefined,
      teamName: teamName || undefined,
      playerList: playersArray.length ? playersArray : undefined,
      duoNames: duoArray.length ? duoArray : undefined,
      soloName: soloName || undefined,
      ville,
      email
    });

    await inscription.save();

    // Préparer le message Telegram en n'ajoutant que les champs renseignés
    let message = `<b>Nouvelle inscription !</b>\n`;
    message += `<b>Discipline :</b> ${discipline}\n`;
    if (ville) message += `<b>Ville :</b> ${ville}\n`;
    message += `<b>Montant :</b> ${price} FCFA\n`;
    message += `<b>Téléphone :</b> ${telephone}\n`;

    if (disciplineType === 'football') {
      if (coachName) message += `<b>Coach :</b> ${coachName}\n`;
      if (teamName) message += `<b>Équipe :</b> ${teamName}\n`;
      if (playersArray.length) message += `<b>Joueurs :</b>\n${playersArray.join('\n')}\n`;
    } else if (disciplineType === 'duo') {
      if (duoArray.length) message += `<b>Participants :</b> ${duoArray.join(', ')}\n`;
    } else if (disciplineType === 'solo') {
      if (soloName) message += `<b>Participant :</b> ${soloName}\n`;
    }

    // Envoyer le message sur Telegram
    sendTelegramMessage(message);

    res.status(201).json({ message: 'Inscription réussie !', data: inscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
