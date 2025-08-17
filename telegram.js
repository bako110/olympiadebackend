// telegram.js
const axios = require('axios');

// Ton token de bot
const TELEGRAM_BOT_TOKEN = '8496672631:AAGhLSZLJ0rkWB04Wy5etdLeaRaBpI6a6lU';

// Liste des destinataires : usernames ou chat_id (numéros ou groupes)
const TELEGRAM_RECIPIENTS = [
    '8173158426', // Robert Bako
    '7412200515', // Ibrahim Sawadogo
];

async function sendTelegramMessage(message) {
    for (const recipient of TELEGRAM_RECIPIENTS) {
        try {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: recipient,
                text: message,
                parse_mode: 'HTML' // permet de styliser le message
            });
            console.log(`Message envoyé à ${recipient} !`);
        } catch (err) {
            console.error(`Erreur lors de l’envoi à ${recipient} :`, err.message);
        }
    }
}

module.exports = sendTelegramMessage;
