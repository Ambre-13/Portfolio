// Vérification d'authentification
(function() {
  const AUTH_KEY = 'portfolio_auth';
  const currentPath = window.location.pathname;
  
  // Ne pas vérifier sur la page de login
  if (currentPath.includes('login') || currentPath.endsWith('/')) {
    return;
  }
  
  const authData = sessionStorage.getItem(AUTH_KEY);
  
  if (!authData) {
    window.location.href = './login.html';
    return;
  }
})();

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

// Gestion du menu hamburger mobile
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const body = document.body;
  
  if (!hamburger || !nav) return;
  
  // Toggle menu principal
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });
  
  // Fermer en cliquant sur l'overlay
  body.addEventListener('click', function(e) {
    if (body.classList.contains('menu-open') && 
        !e.target.closest('.nav') && 
        !e.target.closest('.hamburger')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
      
      // Fermer tous les dropdowns
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Fermer le menu quand on clique sur un lien (sauf dropdowns)
  nav.querySelectorAll('a:not(.dropbtn)').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Fermer tous les dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  });
  
  // Fermer le menu lors du redimensionnement si on passe en desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
      
      // Fermer tous les dropdowns
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

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
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initMobileDropdowns();
  // Attacher les handlers convertis depuis les attributs inline
  if (typeof initInlineHandlers === 'function') initInlineHandlers();

  // Lier les boutons 'fermer' des modales statiques/dynamiques sans inline-onclick
  document.querySelectorAll('#pdfModal button, #imageModal button').forEach(btn => {
    try { btn.removeAttribute('onclick'); } catch (e) {}
    btn.addEventListener('click', function() {
      if (this.closest && this.closest('#pdfModal')) {
        if (typeof closePdfModal === 'function') closePdfModal();
        return;
      }
      if (this.closest && this.closest('#imageModal')) {
        if (typeof closeImageModal === 'function') closeImageModal();
        return;
      }
    });
  });
});

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

// Fonctions pour les modales (Images et PDF)
function openImageModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  if (!modal) {
    // Créer la modale si elle n'existe pas
    const newModal = document.createElement('div');
    newModal.id = 'imageModal';
    newModal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 9999; justify-content: center; align-items: center;';
    newModal.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 90%; background: #1a1a1a; border: 2px solid #ff6bb8; border-radius: 15px; box-shadow: 0 0 50px rgba(255, 107, 184, 0.5); overflow: hidden;">
        <button id="imageModalClose" style="position: absolute; top: 15px; right: 15px; background: rgba(255, 107, 184, 0.2); border: 2px solid #ff6bb8; border-radius: 50%; width: 40px; height: 40px; color: #ff6bb8; font-size: 1.5rem; font-weight: bold; cursor: pointer; z-index: 10000; transition: all 0.3s ease;" data-hover-background="rgba(255, 107, 184, 0.4)" data-leave-background="rgba(255, 107, 184, 0.2)" data-hover-transform="rotate(90deg)" data-leave-transform="rotate(0deg)">✕</button>
        <img id="imageContent" src="" style="width: 100%; height: 100%; object-fit: contain;">
      </div>
    `;
    document.body.appendChild(newModal);
    // Wire handlers for dynamically created elements
    if (typeof initInlineHandlers === 'function') initInlineHandlers();
    // Attach explicit close listener for the dynamically created close button
    const dynClose = document.getElementById('imageModalClose');
    if (dynClose) {
      try { dynClose.removeAttribute('onclick'); } catch (e) {}
      dynClose.addEventListener('click', function() {
        if (typeof closeImageModal === 'function') closeImageModal();
      });
    }
  }
  
  const imgContent = document.getElementById('imageContent') || document.querySelector('#imageModal img');
  if (imgContent) {
    imgContent.src = imageSrc;
  }

  const modalEl = document.getElementById('imageModal') || document.querySelector('[style*="imageModal"]');
  if (modalEl) {
    modalEl.style.display = 'flex';
  }
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function openPdfModal(pdfSrc) {
  const modal = document.getElementById('pdfModal');
  if (modal) {
    const pdfViewer = document.getElementById('pdfViewer');
    if (pdfViewer) {
      pdfViewer.src = pdfSrc;
    }
    modal.style.display = 'flex';
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  if (modal) {
    modal.style.display = 'none';
  }
  
  // Fermer aussi en cliquant en dehors
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('pdfModal');
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Initialise les gestionnaires pour les attributs data- convertis
function initInlineHandlers() {
  // Auto-migrate legacy inline onmouseover/onmouseout handlers to data- attributes
  document.querySelectorAll('[onmouseover],[onmouseout]').forEach(el => {
    const onOver = el.getAttribute('onmouseover') || '';
    const onOut = el.getAttribute('onmouseout') || '';
    const assignRegex = /this\.style\.([a-zA-Z]+)\s*=\s*'([^']*)'/g;
    const propToData = (prop) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();

    let m;
    while ((m = assignRegex.exec(onOver)) !== null) {
      const prop = m[1]; const val = m[2];
      el.setAttribute('data-hover-' + propToData(prop), val);
    }
    // reset regex lastIndex for new exec
    assignRegex.lastIndex = 0;
    while ((m = assignRegex.exec(onOut)) !== null) {
      const prop = m[1]; const val = m[2];
      el.setAttribute('data-leave-' + propToData(prop), val);
    }

    // also migrate simple onclick usages (openPdfModal/openImageModal)
    const onClick = el.getAttribute('onclick') || '';
    const pdfMatch = onClick.match(/openPdfModal\('\s*([^']+?)\s*'\)/);
    const imgMatch = onClick.match(/openImageModal\('\s*([^']+?)\s*'\)/);
    if (pdfMatch) el.setAttribute('data-open-pdf', pdfMatch[1]);
    if (imgMatch) el.setAttribute('data-open-image', imgMatch[1]);

    // remove inline handlers to avoid duplication (leave other onclicks like return false)
    try { el.removeAttribute('onmouseover'); } catch (e) {}
    try { el.removeAttribute('onmouseout'); } catch (e) {}
    try { if (/openPdfModal\(|openImageModal\(/.test(onClick)) el.removeAttribute('onclick'); } catch (e) {}
  });
  // Hover/leave style toggles
  const hoverSelector = '[data-hover-boxshadow], [data-hover-background], [data-hover-transform], [data-hover-color], [data-open-pdf], [data-open-image], [data-leave-boxshadow], [data-leave-background], [data-leave-transform], [data-leave-color]';
  document.querySelectorAll(hoverSelector).forEach(el => {
    // Store original inline styles if present
    const orig = {
      boxShadow: el.style.boxShadow || '',
      background: el.style.background || el.style.backgroundColor || '',
      transform: el.style.transform || '',
      color: el.style.color || ''
    };
    if (!el.dataset._origBoxshadow) el.dataset._origBoxshadow = orig.boxShadow;
    if (!el.dataset._origBackground) el.dataset._origBackground = orig.background;
    if (!el.dataset._origTransform) el.dataset._origTransform = orig.transform;
    if (!el.dataset._origColor) el.dataset._origColor = orig.color;

    // Hover in
    el.addEventListener('mouseenter', function() {
      if (this.dataset.hoverBoxshadow) this.style.boxShadow = this.dataset.hoverBoxshadow;
      if (this.dataset.hoverBackground) this.style.background = this.dataset.hoverBackground;
      if (this.dataset.hoverTransform) this.style.transform = this.dataset.hoverTransform;
      if (this.dataset.hoverColor) this.style.color = this.dataset.hoverColor;
    });

    // Hover out
    el.addEventListener('mouseleave', function() {
      if (this.dataset.leaveBoxshadow) this.style.boxShadow = this.dataset.leaveBoxshadow === 'none' ? '' : this.dataset.leaveBoxshadow;
      else this.style.boxShadow = this.dataset._origBoxshadow || '';

      if (this.dataset.leaveBackground) this.style.background = this.dataset.leaveBackground === 'none' ? '' : this.dataset.leaveBackground;
      else this.style.background = this.dataset._origBackground || '';

      if (this.dataset.leaveTransform) this.style.transform = this.dataset.leaveTransform === 'none' ? '' : this.dataset.leaveTransform;
      else this.style.transform = this.dataset._origTransform || '';

      if (this.dataset.leaveColor) this.style.color = this.dataset.leaveColor === 'none' ? '' : this.dataset.leaveColor;
      else this.style.color = this.dataset._origColor || '';
    });
  });

  // Open PDF modals via data-open-pdf
  document.querySelectorAll('[data-open-pdf]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const src = this.dataset.openPdf;
      if (src && typeof openPdfModal === 'function') {
        openPdfModal(src);
      }
    });
  });

  // Open Image modals via data-open-image
  document.querySelectorAll('[data-open-image]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const src = this.dataset.openImage;
      if (src && typeof openImageModal === 'function') {
        openImageModal(src);
      }
    });
  });

  // Prevent default for elements converted from inline "return false;"
  document.querySelectorAll('[data-prevent-default]').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
}