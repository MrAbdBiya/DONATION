// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Fonction pour mettre à jour la navigation active lors du défilement
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Écouter l'événement de défilement pour mettre à jour la navigation active
    window.addEventListener('scroll', updateActiveNav);
    
    // Header sticky avec effet de réduction
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Défilement vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut
            header.style.transform = 'translateY(0)';
        }
        
        // Ajouter une classe lorsqu'on défile pour changer l'apparence du header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animation des chiffres pour les statistiques
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Gestion du menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fermer le menu mobile lorsqu'on clique sur un lien
    const mobileLinks = document.querySelectorAll('nav ul li a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = document.querySelector('.mobile-menu-btn i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Gestion des formulaires
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Simuler l'envoi du formulaire
                alert('Merci de vous être abonné à notre newsletter !');
                emailInput.value = '';
            }
        });
    }
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simuler l'envoi du formulaire
            alert('Votre message a été envoyé avec succès !');
            this.reset();
        });
    }
    
    // Gestion des boutons de copie pour les informations bancaires
    const copyButtons = document.querySelectorAll('.copy-btn');
    if (copyButtons.length > 0) {
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-clipboard');
                
                // Créer un élément temporaire pour la copie
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                
                // Sélectionner et copier le texte
                tempInput.select();
                document.execCommand('copy');
                
                // Supprimer l'élément temporaire
                document.body.removeChild(tempInput);
                
                // Effet visuel pour confirmer la copie
                const icon = this.querySelector('i');
                this.classList.add('copied');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                // Rétablir l'icône après un délai
                setTimeout(() => {
                    this.classList.remove('copied');
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 2000);
            });
        });
    }
    
    // Gestion de l'affichage des détails de paiement
    const paymentMethodSelect = document.getElementById('payment-method');
    const bankTransferDetails = document.getElementById('bank-transfer-details');
    
    if (paymentMethodSelect && bankTransferDetails) {
        // Cacher les détails par défaut
        bankTransferDetails.style.display = 'none';
        
        paymentMethodSelect.addEventListener('change', function() {
            const selectedMethod = this.value;
            
            // Afficher les détails uniquement pour le virement bancaire
            if (selectedMethod === 'bank-transfer') {
                bankTransferDetails.style.display = 'block';
            } else {
                bankTransferDetails.style.display = 'none';
            }
        });
    }
    
    // Gestion des boutons de montant pour les dons
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    let selectedAmount = 0;
    
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Supprimer la classe active de tous les boutons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Mettre à jour le montant sélectionné
                selectedAmount = parseInt(this.getAttribute('data-amount'));
                
                // Réinitialiser le champ de montant personnalisé
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
            });
        });
    }
    
    // Gestion du montant personnalisé
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Supprimer la classe active de tous les boutons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Mettre à jour le montant sélectionné
            selectedAmount = parseInt(this.value) || 0;
        });
    }
    
    // Gestion du formulaire de don
    const donationForm = document.getElementById('donation-form');
    const donationPopup = document.getElementById('donation-success');
    const donationAmountSpan = document.getElementById('donation-amount');
    const donorsList = document.getElementById('donors-list');
    
    // Récupérer les statistiques et les dons depuis l'API
    async function fetchDonationStats() {
        try {
            const response = await fetch('/api/stats');
            if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
            
            const stats = await response.json();
            
            // Mettre à jour les éléments du DOM
            const amountRaisedElement = document.getElementById('amount-raised');
            const donorsCountElement = document.getElementById('donors-count');
            const progressFillElement = document.getElementById('progress-fill');
            const progressPercentageElement = document.getElementById('progress-percentage');
            const daysLeftElement = document.getElementById('days-left');
            
            if (amountRaisedElement && donorsCountElement && progressFillElement && progressPercentageElement) {
                // Animer le montant collecté
                animateValue(amountRaisedElement, 0, stats.totalAmount, 1000);
                
                // Mettre à jour le nombre de donateurs
                donorsCountElement.textContent = stats.donorsCount;
                
                // Mettre à jour la progression
                progressFillElement.style.width = `${stats.percentage}%`;
                progressPercentageElement.textContent = `${stats.percentage}%`;
                
                // Mettre à jour les jours restants
                if (daysLeftElement) {
                    daysLeftElement.textContent = stats.daysLeft;
                }
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
    
    async function fetchDonations() {
        try {
            const response = await fetch('/api/donations');
            if (!response.ok) throw new Error('Erreur lors de la récupération des dons');
            
            const data = await response.json();
            
            // Afficher les dons
            displayDonors(data.donations);
        } catch (error) {
            console.error('Erreur:', error);
            // Afficher un message d'erreur
            if (donorsList) {
                donorsList.innerHTML = '<p class="error-message">Une erreur est survenue lors du chargement des dons.</p>';
            }
        }
    }
    
    // Afficher la liste des donateurs
    function displayDonors(donations) {
        if (!donorsList) return;
        
        // Vider la liste
        donorsList.innerHTML = '';
        
        if (!donations || donations.length === 0) {
            donorsList.innerHTML = '<p class="empty-list">Soyez le premier à contribuer à cette noble cause !</p>';
            return;
        }
        
        // Trier les donations par montant (du plus élevé au plus bas)
        const sortedDonations = [...donations].sort((a, b) => b.amount - a.amount);
        
        // Afficher les donations
        sortedDonations.forEach(donation => {
            const donorCard = document.createElement('div');
            donorCard.className = 'donor-card';
            
            donorCard.innerHTML = `
                <div class="donor-info">
                    <h4>${donation.name}</h4>
                    <span class="donor-amount">${donation.amount} DH</span>
                </div>
                ${donation.message ? `<p class="donor-message">"${donation.message}"</p>` : ''}
                <span class="donor-date">${donation.date}</span>
            `;
            
            donorsList.appendChild(donorCard);
        });
    }
    
    // Traiter le formulaire de don
    if (donationForm) {
        donationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Vérifier si un montant a été sélectionné
            if (selectedAmount <= 0) {
                alert('Veuillez sélectionner ou saisir un montant valide.');
                return;
            }
            
            // Récupérer les informations du formulaire
            const donorName = document.getElementById('donor-name').value;
            const donorEmail = document.getElementById('donor-email').value;
            const donorPhone = document.getElementById('donor-phone').value;
            const paymentMethod = document.getElementById('payment-method').value;
            const donorMessage = document.getElementById('donor-message').value;
            const isAnonymous = document.getElementById('anonymous-donation').checked;
            
            // Vérifier les champs requis
            if (!donorName || !donorEmail || !paymentMethod) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            try {
                // Envoyer les données au serveur
                const response = await fetch('/api/donations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: donorName,
                        email: donorEmail,
                        phone: donorPhone,
                        amount: selectedAmount,
                        message: donorMessage,
                        anonymous: isAnonymous,
                        paymentMethod: paymentMethod
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'enregistrement du don');
                }
                
                const newDonation = await response.json();
                
                // Mettre à jour les statistiques et la liste des donateurs
                fetchDonationStats();
                fetchDonations();
                
                // Afficher le popup de confirmation
                if (donationPopup && donationAmountSpan) {
                    donationAmountSpan.textContent = selectedAmount;
                    donationPopup.classList.add('show');
                }
                
                // Réinitialiser le formulaire
                this.reset();
                amountButtons.forEach(btn => btn.classList.remove('active'));
                selectedAmount = 0;
                
                // Afficher les informations de paiement selon la méthode choisie
                displayPaymentInstructions(paymentMethod, selectedAmount, donorEmail);
                
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'enregistrement de votre don. Veuillez réessayer.');
            }
        });
    }
    
    // Afficher les instructions de paiement
    function displayPaymentInstructions(method, amount, email) {
        let instructions = '';
        
        switch(method) {
            case 'bank-transfer':
                instructions = `
                    <h4>Instructions pour le virement bancaire</h4>
                    <p>Veuillez effectuer un virement de ${amount} DH vers le compte suivant :</p>
                    <ul>
                        <li><strong>Banque :</strong> Banque Populaire</li>
                        <li><strong>Titulaire :</strong> Association des Étudiants du Master CCA</li>
                        <li><strong>IBAN :</strong> MA123456789012345678901234</li>
                        <li><strong>Motif :</strong> Don Buffet Master CCA</li>
                    </ul>
                    <p>Un reçu vous sera envoyé à l'adresse ${email} après réception du paiement.</p>
                `;
                break;
            case 'cash':
                instructions = `
                    <h4>Instructions pour le paiement en espèces</h4>
                    <p>Veuillez vous présenter au bureau du Master CCA avec la somme de ${amount} DH :</p>
                    <ul>
                        <li><strong>Adresse :</strong> Faculté d'Économie et de Gestion, USMS, Beni Mellal</li>
                        <li><strong>Horaires :</strong> Du lundi au vendredi, de 9h à 16h</li>
                        <li><strong>Contact :</strong> Prof. Mohammed Amine, Bureau 203</li>
                    </ul>
                    <p>Un reçu vous sera remis immédiatement.</p>
                `;
                break;
            case 'mobile-payment':
                instructions = `
                    <h4>Instructions pour le paiement mobile</h4>
                    <p>Veuillez effectuer un transfert de ${amount} DH via :</p>
                    <ul>
                        <li><strong>Application :</strong> MarocPay / PayPal</li>
                        <li><strong>Numéro/ID :</strong> 0612345678</li>
                        <li><strong>Bénéficiaire :</strong> Association Master CCA</li>
                        <li><strong>Motif :</strong> Don Buffet Master CCA</li>
                    </ul>
                    <p>Un reçu vous sera envoyé à l'adresse ${email} après réception du paiement.</p>
                `;
                break;
        }
        
        // Ajouter les instructions au popup
        const instructionsContainer = document.createElement('div');
        instructionsContainer.className = 'payment-instructions';
        instructionsContainer.innerHTML = instructions;
        
        const popupContent = document.querySelector('.popup-content');
        
        // Supprimer les anciennes instructions si elles existent
        const oldInstructions = popupContent.querySelector('.payment-instructions');
        if (oldInstructions) {
            popupContent.removeChild(oldInstructions);
        }
        
        // Ajouter les nouvelles instructions
        popupContent.insertBefore(instructionsContainer, popupContent.querySelector('.btn'));
    }
    
    // Fermer le popup
    window.closePopup = function() {
        if (donationPopup) {
            donationPopup.classList.remove('show');
        }
    };
    
    // Initialiser les statistiques et la liste des donateurs au chargement
    fetchDonationStats();
    fetchDonations();
    
    // Compte à rebours pour la fin de la collecte
    function updateCountdown() {
        const daysLeftElement = document.getElementById('days-left');
        
        if (daysLeftElement) {
            const endDate = new Date('2024-07-01T00:00:00');
            const now = new Date();
            const diff = endDate - now;
            
            // Calculer le nombre de jours restants
            const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
            
            daysLeftElement.textContent = daysLeft;
        }
    }
    
    // Mettre à jour le compte à rebours
    updateCountdown();
    
    // Mettre à jour le compte à rebours chaque jour
    setInterval(updateCountdown, 86400000); // 24 heures en millisecondes
}); 