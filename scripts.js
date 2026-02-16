// Subtle parallax glow on mouse move
const root = document.documentElement;
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  root.style.setProperty('--mx', (x*20).toFixed(2)+'px');
  root.style.setProperty('--my', (y*20).toFixed(2)+'px');
});

// Simple progressive enhancement: add class when JS enabled
document.documentElement.classList.add('js-enabled');

// Gestion des menus déroulants sur mobile
function initMobileDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    
    if (dropbtn) {
      dropbtn.addEventListener('click', function(e) {
        // Sur mobile uniquement (largeur < 768px)
        if (window.innerWidth < 768) {
          e.preventDefault();
          
          // Fermer tous les autres dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });
          
          // Toggle le dropdown actuel
          dropdown.classList.toggle('active');
        }
      });
    }
  });
  
  // Fermer les dropdowns quand on clique ailleurs
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
      if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    }
  });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initMobileDropdowns);

// Gestionnaire du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Animation du bouton pendant l'envoi
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;

      // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
      setTimeout(() => {
        submitBtn.textContent = 'Message envoyé ! ✨';
        submitBtn.style.background = 'linear-gradient(90deg, #4ade80, #22c55e)';

        // Reset après 3 secondes
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
});

// Terminal interactif
document.addEventListener('DOMContentLoaded', function() {
  const terminalContent = document.querySelector('.terminal-content');

  if (terminalContent) {
    // Supprimer le curseur initial
    const initialCursor = document.querySelector('.terminal-cursor');
    if (initialCursor) {
      initialCursor.remove();
    }

    // Étapes du simulateur professionnel
    const steps = [
      {
        delay: 0,
        prompt: 'root@ambre',
        path: '~$',
        command: 'whoami',
        output: 'Ambre Bodie BTS SIO option SISR (Solutions d\'Infrastructures) Future Administratrice Systèmes & Réseaux',
        outputColor: '#b86bff' // Violet clair
      },
      {
        delay: 3000, // 3 secondes plus tard
        prompt: 'root@ambre',
        path: '~$',
        command: 'cat /etc/competences.txt',
        output: '# Systèmes : Windows Server, Linux (Debian/Ubuntu)\n# Réseaux : Cisco, VLAN, Routage, TCP/IP\n# Outils : Active Directory, Virtualisation, Powershell',
        outputColor: '#b86bff' // Violet clair
      },
      {
        delay: 6000, // 6 secondes plus tard
        prompt: 'root@ambre',
        path: '~$',
        command: './lancer-recherche.sh --force',
        output: 'Initialisation... [OK]\nStatut : En Alternance chez Orange\nPrête à rejoindre votre infrastructure !',
        outputColor: '#ff8c00' // Orange vif pour "En Alternance chez Orange"
      },
      {
        delay: 9000, // 9 secondes plus tard
        prompt: 'root@ambre',
        path: '~$',
        command: '',
        output: '',
        showCursor: true
      }
    ];

    let currentStepIndex = 0;

    function executeStep(step) {
      const stepData = steps[step];

      // Créer une nouvelle ligne de commande
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.innerHTML = `
        <span class="terminal-prompt">${stepData.prompt}</span>
        <span class="terminal-path">${stepData.path}</span>
      `;
      terminalContent.appendChild(commandLine);

      if (stepData.command) {
        // Animer la frappe de la commande
        let charIndex = 0;
        const commandSpan = document.createElement('span');
        commandSpan.className = 'terminal-command';
        commandSpan.style.color = '#00ffff'; // Cyan
        commandLine.appendChild(commandSpan);

        function typeCommand() {
          if (charIndex < stepData.command.length) {
            commandSpan.textContent = stepData.command.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCommand, 100);
          } else {
            // Commande terminée, afficher la sortie après un délai
            setTimeout(() => {
              if (stepData.output) {
                const outputDiv = document.createElement('div');
                outputDiv.style.marginTop = '8px';
                outputDiv.style.marginBottom = '8px';
                outputDiv.style.whiteSpace = 'pre-line';

                // Gestion spéciale pour la couleur orange dans "En Alternance chez Orange"
                if (stepData.output.includes('En Alternance chez Orange')) {
                  const parts = stepData.output.split('En Alternance chez Orange');
                  outputDiv.innerHTML = parts[0] +
                    '<span style="color: #ff8c00;">En Alternance chez Orange</span>' +
                    parts[1];
                  outputDiv.style.color = stepData.outputColor || '#ffffff';
                } else {
                  outputDiv.style.color = stepData.outputColor || '#ffffff';
                  outputDiv.textContent = stepData.output;
                }

                terminalContent.appendChild(outputDiv);
              }

              // Passer à l'étape suivante
              currentStepIndex++;
              if (currentStepIndex < steps.length) {
                setTimeout(() => executeStep(currentStepIndex), steps[currentStepIndex].delay - stepData.delay);
              } else if (stepData.showCursor) {
                // Ajouter le curseur final qui clignote
                const finalLine = document.createElement('div');
                finalLine.className = 'terminal-line';
                finalLine.innerHTML = `
                  <span class="terminal-prompt">${stepData.prompt}</span>
                  <span class="terminal-path">${stepData.path}</span>
                  <span class="terminal-cursor"></span>
                `;
                terminalContent.appendChild(finalLine);
              }
            }, 500);
          }
        }

        setTimeout(typeCommand, 300);
      } else if (stepData.showCursor) {
        // Ligne vide avec curseur
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        commandLine.appendChild(cursorSpan);
      }
    }

    // Démarrer la première étape
    executeStep(0);
  }
});