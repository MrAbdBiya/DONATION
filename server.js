const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis le répertoire courant
app.use(express.static(__dirname));

// Route principale pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Données simulées pour les dons
let donations = [
    { 
        id: 1,
        name: 'Ahmed Benali', 
        email: 'ahmed.benali@example.com',
        amount: 500, 
        date: '01/06/2024', 
        message: 'Bon courage à tous les étudiants !',
        anonymous: false,
        paymentMethod: 'bank-transfer',
        status: 'completed'
    },
    { 
        id: 2,
        name: 'Fatima Zahra', 
        email: 'fatima.zahra@example.com',
        amount: 200, 
        date: '02/06/2024', 
        message: 'Félicitations pour cette belle initiative !',
        anonymous: false,
        paymentMethod: 'cash',
        status: 'completed'
    },
    { 
        id: 3,
        name: 'Donateur anonyme', 
        email: 'karim.idrissi@example.com',
        amount: 300, 
        date: '03/06/2024', 
        message: 'Fier de soutenir les futurs experts-comptables !',
        anonymous: true,
        paymentMethod: 'mobile-payment',
        status: 'completed'
    }
];

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    try {
        fs.mkdirSync(dataDir);
        console.log('Dossier data créé avec succès');
    } catch (err) {
        console.error('Erreur lors de la création du dossier data:', err);
    }
}

// Chemin du fichier de données
const donationsFilePath = path.join(dataDir, 'donations.json');

// Fonction pour enregistrer les dons dans un fichier JSON
function saveDonations() {
    try {
        fs.writeFileSync(donationsFilePath, JSON.stringify(donations, null, 2));
        console.log('Donations saved to file');
    } catch (err) {
        console.error('Error saving donations:', err);
    }
}

// Fonction pour charger les dons depuis un fichier JSON
function loadDonations() {
    try {
        if (fs.existsSync(donationsFilePath)) {
            const data = fs.readFileSync(donationsFilePath, 'utf8');
            donations = JSON.parse(data);
            console.log('Donations loaded from file');
        } else {
            console.log('No donations file found, using default data');
            saveDonations(); // Créer le fichier avec les données par défaut
        }
    } catch (err) {
        console.error('Error loading donations:', err);
    }
}

// Charger les dons au démarrage
loadDonations();

// Route pour obtenir tous les dons (publics)
app.get('/api/donations', (req, res) => {
    // Ne renvoyer que les informations publiques des dons
    const publicDonations = donations.map(donation => ({
        id: donation.id,
        name: donation.anonymous ? 'Donateur anonyme' : donation.name,
        amount: donation.amount,
        date: donation.date,
        message: donation.message,
        status: donation.status
    }));
    
    res.json({
        donations: publicDonations,
        total: publicDonations.reduce((sum, donation) => sum + donation.amount, 0),
        count: publicDonations.length
    });
});

// Route pour ajouter un nouveau don
app.post('/api/donations', (req, res) => {
    const { name, email, amount, message, anonymous, paymentMethod } = req.body;
    
    // Validation basique
    if (!name || !email || !amount || !paymentMethod) {
        return res.status(400).json({ error: 'Informations incomplètes' });
    }
    
    // Créer un nouvel ID
    const newId = donations.length > 0 ? Math.max(...donations.map(d => d.id)) + 1 : 1;
    
    // Créer le nouveau don
    const newDonation = {
        id: newId,
        name,
        email,
        amount: Number(amount),
        date: new Date().toLocaleDateString('fr-FR'),
        message: message || '',
        anonymous: Boolean(anonymous),
        paymentMethod,
        status: 'pending' // Par défaut, le don est en attente de confirmation
    };
    
    // Ajouter à la liste
    donations.push(newDonation);
    
    // Sauvegarder dans le fichier
    saveDonations();
    
    // Répondre avec le don créé (version publique)
    res.status(201).json({
        id: newDonation.id,
        name: newDonation.anonymous ? 'Donateur anonyme' : newDonation.name,
        amount: newDonation.amount,
        date: newDonation.date,
        message: newDonation.message,
        status: newDonation.status
    });
});

// Route pour obtenir les statistiques
app.get('/api/stats', (req, res) => {
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const targetAmount = 5000; // Objectif de 5000 DH
    const percentage = Math.min(Math.round((totalAmount / targetAmount) * 100), 100);
    
    // Calculer le nombre de jours restants
    const endDate = new Date('2024-07-01T00:00:00');
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
    
    res.json({
        totalAmount,
        targetAmount,
        percentage,
        donorsCount: donations.length,
        daysLeft
    });
});

// Route catch-all pour les applications SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrage du serveur avec gestion d'erreur
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Le port ${PORT} est déjà utilisé. Veuillez arrêter le serveur existant ou utiliser un autre port.`);
        process.exit(1);
    } else {
        console.error('Erreur lors du démarrage du serveur:', err);
    }
}); 