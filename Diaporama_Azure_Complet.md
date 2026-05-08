---
marp: true
theme: default
paginate: true
title: Bloc 2 – Azure : Identités, stockage, réseaux et sécurité
author: Formateur
---

# Bloc 2 – Azure
## Identités, stockage, réseaux et sécurité

- Parcours complet (théorie + démonstrations + TP + évaluation)
- Niveau : débutant à intermédiaire
- Cas fil rouge : CloudCorp
- Version enrichie avec tous les détails pédagogiques du document source

---

# Objectif de ce diaporama

- Expliquer en profondeur chaque concept
- Donner des exemples concrets entreprise
- Guider les manipulations pas à pas
- Préparer les apprenants aux erreurs réelles du terrain
- Faciliter l’évaluation théorique et pratique

---

# Méthode pédagogique recommandée

Pour chaque partie :
1. Expliquer le concept
2. Montrer une démonstration
3. Faire réaliser un TP
4. Contrôler le résultat attendu
5. Faire verbaliser les bonnes pratiques

---

# Plan global du bloc

1. Fondamentaux Azure
2. Gestion des identités (Entra ID)
3. Stockage Azure
4. Réseaux Azure
5. Sécurité Azure
6. Cas professionnel CloudCorp
7. Évaluation du bloc
8. Conclusion et suites

---

# 1. Introduction au bloc
## Objectifs généraux (version détaillée)

- Comprendre l’architecture Azure et sa hiérarchie logique :
  - Groupes de management
  - Souscriptions
  - Groupes de ressources
  - Ressources
- Comprendre l’infrastructure physique :
  - Régions
  - Availability Zones
  - Paires de régions
- Relier identité, stockage, réseau et sécurité dans une vision cohérente

---

# 1. Introduction au bloc
## Compétences visées (version détaillée)

- Administrer utilisateurs et groupes (manuel + dynamique)
- Maîtriser RBAC : rôles, périmètres, principe de moindre privilège
- Déployer un compte de stockage et choisir le bon niveau de redondance
- Concevoir un VNet segmenté et sécurisé
- Mettre en place NSG, MFA, Key Vault, Monitor, Policy
- Proposer une architecture cloud simple et sécurisée

---

# Architecture de référence

- Présentation du framework Microsoft Azure Well-Architected
- Focus principal pour ce bloc :
  - Pilier Sécurité
  - Pilier Fiabilité
- Message clé :
  - Une architecture robuste n’est pas qu’un schéma technique
  - C’est un ensemble de décisions de gouvernance + sécurité + exploitation

---

# Partie 1 – Fondamentaux Azure
## Définition du cloud computing

Le cloud = fourniture de services informatiques via Internet :
- serveurs
- stockage
- bases de données
- réseau
- logiciels
- analyse

Idée clé : la ressource devient un service consommé à la demande.

---

# IaaS, PaaS, SaaS (très détaillé)

IaaS :
- Azure loue le matériel (compute, réseau, stockage)
- Le client gère OS, middleware, runtime, données, applications
- Exemple : Azure VM

PaaS :
- Azure gère matériel + OS + runtime plateforme
- Le client gère code et données
- Exemple : App Service, Azure SQL Database

SaaS :
- Le fournisseur gère tout
- Le client consomme l’application finale
- Exemple : Microsoft 365, Outlook

---

# Responsabilité partagée

Microsoft sécurise le cloud :
- datacenters physiques
- matériel
- réseau cœur

Le client sécurise ce qui est dans le cloud :
- identités
- accès
- données
- configuration
- OS des VM (en IaaS)

Règle simple : plus on est proche de IaaS, plus la responsabilité client augmente.

---

# Avantages cloud (détaillés)

- Financier : CapEx vers OpEx (facturation à l’usage)
- Élasticité : scale-up et scale-out selon charge
- Agilité : déploiement rapide mondial
- Résilience : redondance native
- Innovation : accès rapide à des services avancés

---

# Limites cloud (à enseigner clairement)

- Dépendance à Internet
- Coûts difficiles sans gouvernance stricte
- Souveraineté des données (Cloud Act, RGPD)
- Risque de mauvaise configuration sécurité

Message formateur : le cloud ne supprime pas les responsabilités, il les déplace.

---

# Microsoft Azure en contexte

- Deuxième acteur majeur du cloud public
- Écosystème > 200 services
- Forte intégration Microsoft (Windows, AD, M365)
- Grande présence régionale mondiale
- Capacités hybrides avancées (Azure Arc)

---

# Portail Azure – prise en main guidée

À montrer en direct :
- menu global
- barre de recherche universelle
- sélection tenant/abonnement
- Azure Cloud Shell (Bash/PowerShell)
- création et partage de dashboards

Objectif pédagogique : rendre l’interface familière dès la première séance.

---

# Organisation logique Azure (à mémoriser)

1. Tenant (Entra ID)
2. Management Groups
3. Subscriptions
4. Resource Groups
5. Resources

Point clé : RBAC et Policies héritent des niveaux supérieurs.

---

# Abonnements : double frontière

- Frontière de facturation : une facture par abonnement
- Frontière d’accès : isolation sécurité des environnements

Exemples pédagogiques :
- abonnement Production verrouillé
- abonnement Développement plus permissif

---

# Resource Groups : cycle de vie partagé

Règles à retenir :
- une ressource appartient à un seul RG
- suppression du RG = suppression totale de ses ressources
- pas d’imbrication de RG
- déplacement de ressources possible dans la majorité des cas

Règle d’or : même cycle de vie = même RG.

---

# Tags : gouvernance opérationnelle

- Métadonnées clé/valeur (Owner, Projet, Environnement, CostCenter)
- Utiles pour :
  - refacturation
  - filtrage
  - rapports
  - automatisation

Point important : une ressource ne récupère pas automatiquement les tags du RG.

---

# Coûts et organisation

- Le cloud se paie à l’heure / à la minute
- Un serveur oublié allumé tout le week-end coûte de l’argent
- Importance des conventions de nommage
- Importance des Resource Locks :
  - CanNotDelete
  - ReadOnly

---

# Régions, AZ, paires de régions

- Région : ensemble de datacenters proches
- AZ : datacenters physiquement séparés dans une région
- Paires de régions : reprise après sinistre

Exemple : France Central ↔ France South.

---

# TP Fondamentaux – scénario guidé

Objectif : gouvernance de base

Étapes :
1. Créer un RG cours
2. Ajouter tags obligatoires
3. Activer un verrou CanNotDelete
4. Vérifier dans Activity Log

Validation : ressource bien structurée et protégée contre suppression accidentelle.

---

# Partie 2 – Gestion des identités
## Introduction Entra ID

- Nouveau nom de Azure Active Directory
- IAM cloud (Identity-as-a-Service)
- Vérifie :
  - qui est l’utilisateur (authentification)
  - ce qu’il peut faire (autorisation)
- S’applique à Azure, Microsoft 365 et SaaS tiers

---

# Notion de tenant

- Un tenant représente l’organisation
- Instance dédiée et isolée Entra ID
- Contient les objets d’identité :
  - utilisateurs
  - groupes
  - rôles
  - applications

---

# AD DS local vs Entra ID

AD DS (on-prem) :
- Kerberos, NTLM, LDAP
- structure OU
- GPO

Entra ID (cloud) :
- SAML, OAuth 2.0, OpenID Connect
- structure plate
- gestion appareils via Intune

Pont hybride : Entra Connect.

---

# Utilisateurs, groupes, rôles

- Utilisateur : identité unique (UPN)
- Groupe : gestion des droits en masse
- Rôle : ensemble de permissions

Message fort : ne pas attribuer les droits directement à une personne.

---

# Création des utilisateurs

Méthodes :
- manuelle portail
- import CSV
- PowerShell / Azure CLI
- synchronisation AD local

Point d’attention : cohérence des UPN et nommage.

---

# Gestion mots de passe et SSPR

- Règles de complexité activées par défaut
- Protection contre mots de passe faibles/usuels
- SSPR : autonomie utilisateur pour reset mot de passe

Bénéfice : moins de tickets support IT.

---

# Comptes internes et invités

- Members : internes, cycle de vie complet géré par l’entreprise
- Guests B2B : collaboration inter-entreprises

Cas d’usage : inviter un partenaire sans lui créer un compte interne complet.

---

# Groupes de sécurité

- Dediés à la gestion d’accès
- Pas de boîte mail collaborative
- Utiles pour applications, dossiers, ressources Azure, licences

Bonne pratique : architecture de groupes par rôles métiers.

---

# Groupes Microsoft 365

- Dediés à la collaboration
- Création automatique de :
  - boîte mail partagée
  - calendrier
  - espace SharePoint
  - équipe Teams (selon cas)

---

# RBAC (Role Based Access Control)

Le triptyque RBAC :
- Qui ? principal (user/groupe/app)
- Quoi ? rôle
- Où ? scope (abonnement, RG, ressource)

Rôles classiques : Owner, Contributor, Reader.

---

# Principe du moindre privilège

Définition stricte :
- droits minimaux
- au bon périmètre
- pour la durée nécessaire

Objectif : limiter erreurs, abus, compromission.

---

# Rôles Entra ID vs rôles Azure

Rôles Entra ID :
- administration de l’annuaire
- exemple : Administrateur utilisateurs

Rôles Azure RBAC :
- administration des ressources cloud
- exemple : Contributeur VM

---

# MFA – Authentification multifacteur

- Le mot de passe seul n’est plus suffisant
- Message clé : 99,9% des compromissions stoppées par MFA (ordre de grandeur Microsoft)
- Éviter SMS quand possible (risque SIM Swapping)
- Préférer Authenticator, FIDO2, Windows Hello

---

# Accès conditionnel

Moteur : Si condition, alors action.

Exemples :
- si connexion hors pays de confiance → bloquer
- si compte admin → exiger MFA fort
- si risque élevé → exiger contrôle supplémentaire

---

# Comptes break-glass (urgence)

- 2 ou 3 comptes admin globaux d’urgence
- mots de passe très complexes
- exclus de certaines règles CA pour éviter l’auto-blocage total
- identifiants conservés en coffre physique

---

# TP Identité détaillé

Objectif : prouver RBAC en pratique

Étapes :
1. Créer 3 utilisateurs
2. Créer 2 groupes sécurité
3. Affecter utilisateurs aux groupes
4. Attribuer Reader sur abonnement
5. Attribuer Contributor sur un RG unique
6. Test hors RG (échec 403)
7. Test dans RG (succès)

---

# Partie 3 – Stockage Azure
## Pourquoi utiliser le stockage cloud

- Plus de gestion SAN/NAS locale complexe
- Capacité virtuelle illimitée
- Service managé
- Paiement au Go consommé

---

# Résilience et SLA

- Le matériel finit toujours par tomber en panne
- Azure masque une partie de cette complexité
- Introduire SLA (exemple 99,99%)

Point pédagogique : disponibilité n’est pas sauvegarde.

---

# Redondance des données

Principe : la donnée n’est jamais sur un seul disque.

Choix :
- LRS : 3 copies synchrones même datacenter
- ZRS : 3 copies sur 3 zones d’une région
- GRS : LRS + réplication asynchrone région jumelle (6 copies)

---

# Types de stockage

- Blob : données non structurées (images, vidéos, logs, backups, VHD)
- File : partage SMB/NFS cloud
- Queue : messages asynchrones applicatifs
- Table : NoSQL clé/valeur

---

# Compte de stockage

- Ressource parent nécessaire pour Blob/File/Queue/Table
- Détermine :
  - facturation
  - sécurité
  - localisation
  - performances

Règle nommage : unique mondial, minuscules + chiffres.

---

# Performance Standard vs Premium

Standard :
- HDD
- coût bas
- majorité des cas

Premium :
- SSD
- latence faible et stable
- charges de travail exigeantes

---

# Blob Storage : conteneurs

- Conteneur = dossier principal logique
- Compte : conteneurs illimités
- Conteneur : blobs illimités
- Structure plate interne (pseudo-dossiers par nom)

---

# Niveaux d’accès Blob

Hot :
- accès fréquent
- stockage plus cher
- lecture peu coûteuse

Cool :
- accès rare (>=30 jours)
- stockage moins cher
- pénalité en lecture

Archive :
- conservation long terme (>=180 jours)
- stockage très économique

---

# Azure Files

- partage de fichiers serverless
- cas lift-and-shift du lecteur réseau Z:
- accès Windows via script net use
- partage de configuration entre applications

---

# Sécurité stockage : clés

- 2 clés maîtres (Key1, Key2)
- accès de type root
- ne jamais coder en dur
- rotation : changer une clé pendant usage de l’autre

---

# Sécurité stockage : SAS Tokens

- URL d’accès limitée
- contrôle précis :
  - qui (IP)
  - quoi (fichier/conteneur)
  - actions (lecture, écriture, suppression)
  - durée (expiration)

---

# Sécurité stockage : IAM + chiffrement + réseau

- Interne : privilégier Entra ID + RBAC
- Chiffrement au repos activé par défaut
- Possibilité CMK via Key Vault
- Restreindre accès réseau
- Idéal : Private Endpoint, accès public désactivé

---

# TP Stockage ultra détaillé

1. Créer compte stockage dans RG du cours
2. Vérifier onglets Réseau et Protection données
3. Créer conteneur Blob privé
4. Uploader une image
5. Copier URL Blob et tester dans navigateur
6. Observer erreur XML (attendue si privé)
7. Passer tier Hot vers Cool
8. Créer partage Azure Files
9. Cliquer Connect et générer script PowerShell
10. Monter le partage et vérifier lecteur Z:

---

# Partie 4 – Réseaux Azure
## Concepts fondamentaux

- VNet = périmètre de sécurité réseau privé Azure
- Subnet = segmentation logique
- Adressage IP = base du routage
- Communication intra-VNet autorisée par défaut

---

# Plan d’adressage (CIDR)

- Ne jamais créer un VNet au hasard
- Éviter conflit avec réseau local
- Prévoir extension future

Exemple :
- VNet 10.10.0.0/16
- Web 10.10.1.0/24
- App 10.10.2.0/24
- Data 10.10.3.0/24

---

# IP réservées Azure

Dans chaque subnet, Azure réserve 5 IP.

Exemple /24 :
- 256 théoriques
- 251 utilisables

À expliquer explicitement pendant la création du subnet.

---

# NIC et VM

- VM et carte réseau sont deux ressources distinctes
- Avantage : conserver NIC et règles si VM supprimée
- Réattacher NIC à une nouvelle VM si besoin

---

# IP privées vs publiques

IP privée :
- obligatoire
- communication interne VNet
- non routable Internet

IP publique :
- optionnelle et payante
- nécessaire pour exposition externe
- augmente surface d’attaque

---

# Allocation dynamique vs statique

Dynamique :
- IP attribuée au démarrage
- peut changer après stop/deallocate

Statique :
- IP verrouillée
- utile pour dépendances réseau stables

---

# NSG : pare-feu de base Azure

- Filtrage niveau transport (L4)
- Règles entrantes/sortantes
- Priorité de 100 à 4096
- Le plus petit nombre gagne
- Règles par défaut priorité 65000 (non supprimables)

---

# NSG : bonnes pratiques

- Associer NSG au subnet pour cohérence globale
- Utiliser NSG NIC pour exceptions ciblées
- Documenter chaque règle critique
- Éviter règles trop larges

---

# Peering et VPN Gateway

VNet Peering :
- relie 2 VNets
- trafic via backbone privé Microsoft
- pas de transit Internet public

VPN Gateway :
- tunnel chiffré Azure ↔ on-prem
- cas hybride entreprise

---

# Exposition de services

- Load Balancer public devant les serveurs web
- backend en IP privées
- Bastion pour administration sécurisée via portail TLS 443
- JIT pour ouvrir 22/3389 temporairement

---

# Surface d’attaque et accès admin

Interdit : 22/3389 ouverts à 0.0.0.0/0

Minimum :
- restreindre à IP source fixe admin

Idéal :
- retirer IP publique VM
- administrer via Bastion
- activer JIT

---

# TP Réseau détaillé

1. Créer VNet-CloudCorp
2. Créer Subnet-Web et Subnet-BDD
3. Créer NSG
4. Ajouter règle entrante limitée à votre IP
5. Associer NSG à Subnet-Web
6. Déployer VM-Web dans Subnet-Web
7. Déployer VM-BDD sans IP publique
8. Se connecter à VM-Web
9. Tester ping IP privée VM-BDD

Résultat : segmentation fonctionnelle + exposition contrôlée.

---

# Partie 5 – Sécurité Azure
## Principes généraux

- Le cloud est un partenariat sécurité
- Défense en profondeur obligatoire
- Réduction maximale de la surface d’exposition

---

# Défense en profondeur (couches)

- Physique
- Identité (Entra ID)
- Périmètre (DDoS)
- Réseau (NSG)
- Compute (patching VM)
- Application
- Données (chiffrement)

---

# Sécurisation des accès

- MFA généralisée
- RBAC strictement limité
- moindre privilège
- comptes admin dédiés (pas de mail/web quotidien)

---

# Verrouillage des ressources

- CanNotDelete : empêche suppression
- ReadOnly : gel de modification

Utilité : éviter la catastrophe sur ressource critique en production.

---

# Sauvegarde vs réplication

- Réplication = panne matérielle
- Sauvegarde = retour dans le temps

Exemple :
- ransomware chiffre VM
- réplication copie les données chiffrées
- seule la sauvegarde permet récupération saine

---

# Chiffrement et bonnes pratiques

- At Rest : actif par défaut (stockage, disques, DB)
- In Transit : forcer HTTPS/TLS
- CMK possible via Key Vault
- Désactiver accès public inutile
- Préférer Private Endpoints
- Utiliser Managed Identities (pas de secrets en dur)

---

# Microsoft Defender for Cloud

- Tour de contrôle posture sécurité (CSPM)
- Recommandations avec impact et correction guidée
- Secure Score sur 100
- Scan vulnérabilités (offres avancées)

---

# Journalisation et supervision

Activity Log :
- Qui a fait quoi, quand, où (control plane)

Azure Monitor :
- santé/performance ressources (data plane)

Alertes :
- déclenchement proactif (CPU, événements sécurité, etc.)

---

# Log Analytics et SOC

- Centralisation des logs (Monitor + Defender)
- Base d’investigation sécurité
- Première étape avant SIEM (Microsoft Sentinel)

---

# RBAC vs Azure Policy (différence clé)

RBAC = qui a le droit d’agir
Policy = comment les ressources doivent être configurées

Exemple :
- RBAC autorise Bob à créer une VM
- Policy interdit VM hors Europe

---

# Effets de Policy

- Deny : bloque
- Audit : signale
- Append / Modify : complète/corrige

Message clé : même un admin global ne contourne pas une Policy active.

---

# TP Sécurité détaillé

1. Ouvrir Defender for Cloud
2. Lire Secure Score
3. Choisir 1 recommandation à traiter
4. Assigner Policy Allowed locations
5. Créer alerte Create/Update Storage Account
6. Créer groupe d’actions email
7. Test piège : déployer stockage en East US
8. Observer erreur Disallowed by Policy

---

# Partie 6 – Cas professionnel CloudCorp
## Contexte

Vous êtes Admin Cloud Junior chez CloudCorp.

Mission : concevoir, déployer et documenter une infrastructure de base sécurisée.

---

# Infrastructure à réaliser

- Annuaire : groupes Direction et Informatique + utilisateurs
- Stockage : compte + Azure Files sécurisé
- Réseau : VNet segmenté Public/Web et Privé/Data
- Compute : 1 ou 2 VM pour service web
- Sécurité : NSG strict (80/443 web, admin restreinte)
- Supervision : alerte sécurité ou budget

---

# Objectifs de validation

- Ressources bien structurées (noms, tags, RG)
- RBAC cohérent (Informatique contributeur, Direction lecteur facturation)
- Stockage protégé (lock, public off)
- Réseau segmenté et propre
- Ports 22/3389 non ouverts au monde
- Justification technique des choix

---

# Livrables attendus (très précis)

1. Schéma architecture (VNet, subnets, VM, NSG)
2. Tableau ressources (nom, type, région, RG)
3. Plan IP détaillé
4. Matrice des droits
5. Captures (Secure Score, NSG, topologie)
6. Compte rendu technique 1-2 pages avec justification

---

# Partie 7 – Évaluation du bloc
## Théorique

QCM et compréhension :
- IaaS vs PaaS
- choix LRS/ZRS/GRS selon scénario
- IP réservées Azure dans un subnet
- acronymes RBAC, NSG, MFA, VNet
- diagnostic de problème d’accès RDP/SSH

---

# QCM type (corrigé)

1. Modèle où le client gère l’OS ?
- Réponse : IaaS

2. Bonne pratique droits d’accès ?
- Réponse : attribuer via groupe RBAC

3. Tier le moins cher long terme ?
- Réponse : Archive

4. IP réservées par Azure par subnet ?
- Réponse : 5

5. NSG priorité 150 vs 200 ?
- Réponse : la règle 150 s’applique

---

# Questions courtes (attendus formateur)

- Différence haute dispo vs sauvegarde
- Définition moindre privilège
- Différence RBAC vs Policy

Attendu : réponses courtes, exactes, orientées exploitation réelle.

---

# Évaluation pratique

Demandes :
1. Créer utilisateur Audit + groupe Lecteurs-Securite
2. Attribuer Reader sur abonnement
3. Déployer stockage LRS + conteneur privé
4. Créer VNet-Examen 10.1.0.0/16
5. Créer Subnet-App 10.1.1.0/24
6. NSG : HTTPS autorisé, reste bloqué
7. Fournir preuves captures

---

# Critères d’évaluation

- Maîtrise navigation portail
- Rigueur configuration (noms/tags)
- Respect sécurité (pas de 22/3389 ouverts Internet)
- Capacité d’explication orale
- Qualité des documents rendus

---

# Partie 8 – Découpage en séances

Séance 1 : cloud, Azure, gouvernance
Séance 2 : Entra ID, utilisateurs, groupes, RBAC, MFA
Séance 3 : stockage et sécurisation
Séance 4 : VNet, subnet, IP
Séance 5 : NSG, Bastion, peering
Séance 6 : Defender, Monitor, Policy
Séance 7 : cas global CloudCorp
Séance 8 : évaluation + synthèse

---

# Séance 1 – conducteur détaillé

- Casser l’appréhension du cloud
- Expliquer hiérarchie Azure
- Démo portail + Cloud Shell
- TP RG/tags/lock
- Débrief erreurs de gouvernance

---

# Séance 2 – conducteur détaillé

- Entra ID : rôle et périmètre
- AD local vs Entra
- Création users/groups
- RBAC sur scopes différents
- MFA et accès conditionnel
- TP permissions 403

---

# Séance 3 – conducteur détaillé

- Types de stockage et cas d’usage
- LRS/ZRS/GRS
- Blob tiers Hot/Cool/Archive
- Azure Files montage
- RBAC/SAS/Private Endpoint
- TP Blob + Files

---

# Séance 4 – conducteur détaillé

- CIDR et plan IP
- VNet + subnets
- 5 IP réservées Azure
- IP privée/publique dynamique/statique
- TP segmentation

---

# Séance 5 – conducteur détaillé

- NSG : règles et priorités
- Association subnet vs NIC
- RDP/SSH sécurisé
- Bastion/JIT
- VNet peering
- TP connectivité

---

# Séance 6 – conducteur détaillé

- Defender posture
- Secure Score
- Activity Log vs Monitor
- alertes et groupe d’actions
- Policy Deny/Audit
- TP conformité région

---

# Séance 7 – conducteur détaillé

- Lancement du cas CloudCorp
- Réalisation de l’architecture
- Contrôles sécurité
- Revue croisée des rendus

---

# Séance 8 – conducteur détaillé

- QCM final
- mini-déploiement chronométré
- soutenance orale 5 min
- correction et plan de progression

---

# Check-list formateur avant validation

- RG cohérent
- tags présents
- RBAC minimum
- MFA active
- ports admin non exposés
- logs et alertes actifs
- documentation complète

---

# Erreurs fréquentes à faire corriger

- droits directs utilisateur au lieu des groupes
- usage excessif du rôle Owner
- confusion entre rôle Entra et rôle Azure RBAC
- IP publiques inutiles
- NSG trop permissif
- absence de preuve de tests

---

# Trame de compte rendu étudiant

1. Contexte et objectifs
2. Architecture choisie
3. Configuration sécurité
4. Tests réalisés
5. Résultats et limites
6. Pistes d’amélioration

---

# Conclusion – bilan des acquis

À la fin du bloc, l’apprenant sait :
- naviguer et gouverner Azure
- gérer identités et droits
- déployer stockage sécurisé
- concevoir réseau virtuel segmenté
- appliquer défense en profondeur
- superviser et imposer conformité de base

---

# Ouvertures pédagogiques

- Azure Virtual Machines avancé
- Azure Backup et Site Recovery
- Intune (gestion terminaux)
- Intégration Microsoft 365
- SOC avec Sentinel
- Certifications AZ-900 puis AZ-104

---

# Fin du module
## Questions / Réponses

Merci à tous.

---

# Annexe Masterclass
## Mode d’emploi formateur (ultra détaillé)

- Cette annexe sert de script opérationnel complet pour animer chaque séance.
- Elle complète les slides principales avec :
  - trame orale prête à l’emploi
  - démonstrations détaillées
  - questions de vérification immédiate
  - erreurs typiques + remédiations
  - critères d’évaluation observables

---

# Annexe 1 – Fondamentaux
## Script oral conseillé (10-12 min)

- Commencer par un exemple réel : “ouvrir un serveur en 3 minutes sans achat matériel”.
- Expliquer CapEx vs OpEx avec un cas PME :
  - CapEx : achat serveur + baie + maintenance
  - OpEx : paiement mensuel à l’usage
- Enchaîner sur IaaS/PaaS/SaaS avec une analogie simple :
  - IaaS = louer un appartement vide
  - PaaS = appartement meublé
  - SaaS = hôtel clé en main

---

# Annexe 1 – Fondamentaux
## Démonstration guidée (15 min)

1. Ouvrir portail Azure
2. Montrer la recherche globale
3. Rechercher "Groupes de ressources"
4. Créer un RG de test
5. Ajouter tags `Owner`, `Env`, `CostCenter`
6. Poser un verrou `CanNotDelete`
7. Ouvrir Activity Log et retrouver l’opération

Résultat attendu : l’apprenant visualise gouvernance + traçabilité.

---

# Annexe 1 – Fondamentaux
## Questions de vérification rapide

- Quelle différence entre abonnement et groupe de ressources ?
- Pourquoi la région choisie impacte la conformité ?
- Pourquoi la suppression d’un RG est critique ?
- Une ressource peut-elle appartenir à deux RG ?
- À quel niveau appliquer une Policy pour un effet global ?

---

# Annexe 1 – Fondamentaux
## Erreurs fréquentes et corrections

- Erreur : créer des ressources dans plusieurs RG sans logique.
  - Correction : regrouper par cycle de vie/projet.
- Erreur : oublier les tags.
  - Correction : checklist obligatoire avant validation.
- Erreur : utiliser la mauvaise région.
  - Correction : définir une liste de régions autorisées dès le départ.

---

# Annexe 2 – Identité (Entra ID)
## Script oral conseillé (12-15 min)

- Introduire Entra ID comme "portier du cloud".
- Séparer très clairement :
  - Authentification = qui êtes-vous ?
  - Autorisation = que pouvez-vous faire ?
- Expliquer pourquoi les droits doivent passer par des groupes.
- Expliquer le risque d’un compte admin utilisé pour la bureautique.

---

# Annexe 2 – Identité
## Démo complète RBAC (20 min)

1. Créer 3 utilisateurs de test
2. Créer groupe `GG-IT-Contrib`
3. Ajouter utilisateurs au groupe
4. Assigner rôle `Reader` sur abonnement
5. Assigner rôle `Contributor` sur RG ciblé
6. Se connecter avec un compte de test
7. Tenter création stockage hors RG (échec)
8. Tenter création stockage dans RG (succès)

Message clé : un seul principal, deux scopes, deux comportements différents.

---

# Annexe 2 – Identité
## MFA et accès conditionnel (détaillé)

- Forcer l’enrôlement MFA dès première connexion.
- Préférer Authenticator / FIDO2.
- Expliquer pourquoi SMS est moins robuste.
- Construire une policy conditionnelle type :
  - Si rôle administrateur
  - Alors MFA obligatoire + appareil conforme

---

# Annexe 2 – Identité
## Break-glass (procédure)

- Créer 2 comptes d’urgence maximum.
- Générer mots de passe longs et hors gestionnaire partagé courant.
- Stocker les secrets dans un coffre physique contrôlé.
- Exclure ces comptes des politiques risquant l’auto-blocage total.
- Auditer mensuellement leur non-utilisation.

---

# Annexe 2 – Identité
## Erreurs critiques à pénaliser

- Rôle `Owner` attribué pour “aller vite”.
- Compte invité avec privilèges excessifs.
- MFA non activée sur compte administrateur.
- Attribution directe des droits à un utilisateur au lieu d’un groupe.

---

# Annexe 3 – Stockage
## Script oral conseillé (12 min)

- Expliquer la différence entre disponibilité, redondance et sauvegarde.
- Donner le cas réel : suppression accidentelle + réplication.
- Faire verbaliser : “la redondance ne remplace pas la sauvegarde”.

---

# Annexe 3 – Stockage
## Atelier Blob détaillé (20 min)

1. Créer compte stockage (`standard`, `LRS`)
2. Vérifier paramètres réseau et protection données
3. Créer conteneur privé
4. Uploader une image
5. Copier URL blob
6. Tester accès navigateur (erreur attendue)
7. Modifier tier Hot → Cool
8. Revenir dans métriques/transactions

Objectif : lier sécurité + coût + exploitation.

---

# Annexe 3 – Stockage
## Atelier Azure Files détaillé (15 min)

1. Créer partage de fichiers
2. Ouvrir `Connect`
3. Choisir script PowerShell
4. Exécuter le script sur machine locale
5. Vérifier apparition lecteur réseau
6. Créer/supprimer fichier test

Point d’explication : protocole SMB et cas d’usage lift-and-shift.

---

# Annexe 3 – Stockage
## SAS vs clés d’accès (comparatif)

- Clé d’accès :
  - accès global puissant
  - à éviter dans les usages quotidiens
- SAS :
  - accès limité
  - borné dans le temps
  - plus adapté au partage temporaire

Bonne pratique : interne via RBAC Entra ID, externe via SAS court.

---

# Annexe 3 – Stockage
## Erreurs fréquentes

- Conteneur rendu public sans besoin métier.
- Clé d’accès copiée dans un script applicatif.
- Aucun plan de rotation des clés.
- Mauvais choix de tier (Hot partout) entraînant surcoûts.

---

# Annexe 4 – Réseau
## Script oral conseillé (12 min)

- Définir VNet comme périmètre privé de l’entreprise.
- Expliquer la segmentation (Web/App/Data) comme principe de réduction de risque.
- Expliquer que toute IP publique expose la ressource aux scans automatiques.

---

# Annexe 4 – Réseau
## TP VNet + NSG (25 min)

1. Créer VNet `10.10.0.0/16`
2. Créer `Subnet-Web 10.10.1.0/24`
3. Créer `Subnet-BDD 10.10.2.0/24`
4. Créer NSG dédié Web
5. Règle entrante RDP/SSH limitée à IP formateur
6. Associer NSG au subnet Web
7. Déployer VM-Web (IP publique)
8. Déployer VM-BDD (sans IP publique)
9. Tester communication privée VM-Web → VM-BDD

Résultat attendu : administration contrôlée, backend non exposé.

---

# Annexe 4 – Réseau
## NSG : exercice de priorité

Cas :
- Règle A priorité 110 : deny port 80
- Règle B priorité 120 : allow port 80

Question : résultat ?
- Réponse : trafic bloqué (règle 110 l’emporte).

Objectif : ancrer la logique d’évaluation des règles.

---

# Annexe 4 – Réseau
## RDP/SSH sécurisé : standard minimal

- Jamais de source `0.0.0.0/0` sur 22/3389.
- Limiter source à IP fixe admin si besoin temporaire.
- Préférer Bastion + JIT.
- Retirer IP publique des VM sensibles.

---

# Annexe 4 – Réseau
## Erreurs fréquentes réseau

- Plan CIDR en conflit avec réseau on-prem.
- NSG posé sur mauvaise couche (NIC au lieu subnet attendu).
- Oubli de documenter les règles et leur justification.
- IP publique attribuée “par défaut” sans besoin.

---

# Annexe 5 – Sécurité
## Script oral conseillé (15 min)

- Introduire la défense en profondeur comme seule approche réaliste.
- Montrer que “sécurisé” = identité + réseau + données + supervision.
- Faire comprendre que logs et alertes sont non négociables en production.

---

# Annexe 5 – Sécurité
## TP Defender + Policy + Monitor (30 min)

1. Ouvrir Defender for Cloud
2. Lire Secure Score et top recommandations
3. Traiter une recommandation prioritaire
4. Assigner Policy `Allowed locations`
5. Tenter déploiement en région interdite
6. Observer blocage `Disallowed by Policy`
7. Créer alerte `Create/Update Storage Account`
8. Associer groupe d’actions email

---

# Annexe 5 – Sécurité
## Activity Log vs Monitor (explication pédagogique)

- Activity Log :
  - plan de contrôle
  - qui a modifié quoi
- Monitor :
  - plan de données
  - santé et performance des ressources

Formule à faire retenir :
- Activity Log = gouvernance des actions
- Monitor = opérationnel des services

---

# Annexe 5 – Sécurité
## Secure by default (checklist)

- MFA active
- RBAC minimum
- ports admin fermés Internet
- accès public PaaS désactivé si inutile
- secrets retirés du code
- managed identity utilisée
- logs centralisés actifs
- alertes critiques configurées

---

# Annexe 5 – Sécurité
## Erreurs majeures à sanctionner

- VM admin avec 3389/22 ouverts monde.
- Stockage public non justifié.
- Absence de traces exploitables.
- Déploiement hors région autorisée.

---

# Annexe 6 – Cas CloudCorp
## Conduite du cas (mode projet)

Étape 1 : cadrage
- objectifs fonctionnels
- contraintes sécurité

Étape 2 : conception
- schéma logique
- plan IP
- matrice RBAC

Étape 3 : implémentation
- création ressources
- contrôles sécurité

Étape 4 : validation
- tests techniques
- preuves captures
- soutenance

---

# Annexe 6 – Matrice de droits (modèle)

Exemple cible :
- Groupe `Direction` : Reader facturation
- Groupe `Informatique` : Contributor sur RG projet
- Groupe `Audit` : Reader abonnement

Points à vérifier :
- pas de rôle Owner inutile
- scopes cohérents
- justification métier documentée

---

# Annexe 6 – Plan d’adressage (modèle)

- VNet : `10.20.0.0/16`
- Subnet-Web : `10.20.1.0/24`
- Subnet-App : `10.20.2.0/24`
- Subnet-Data : `10.20.3.0/24`
- Subnet-Management : `10.20.10.0/24`

Vérifications :
- pas de chevauchement
- capacité suffisante
- documentation mise à jour

---

# Annexe 7 – Évaluation
## Barème détaillé (proposition)

Théorie (40%)
- compréhension concepts : 15
- sécurité : 15
- gouvernance/coûts : 10

Pratique (60%)
- déploiement correct : 20
- sécurité appliquée : 20
- documentation preuves : 10
- soutenance : 10

---

# Annexe 7 – Rubrique de soutenance (5 minutes)

Question 1 :
- Pourquoi ce découpage réseau ?

Question 2 :
- Pourquoi ces rôles RBAC à ces scopes ?

Question 3 :
- Comment prouvez-vous la conformité sécurité ?

Question 4 :
- Si un audit arrive demain, que montrez-vous en premier ?

---

# Annexe 7 – Critères d’excellence

- Architecture claire et argumentée
- Sécurité proactive, pas uniquement réactive
- Documentation propre, lisible, exploitable
- Capacité à expliquer les compromis (coût, sécurité, exploitation)

---

# Annexe 8 – Préparation certification
## Liens pédagogiques à travailler en classe

- AZ-900 : vocabulaire cloud et fondamentaux Azure
- AZ-104 : administration Azure opérationnelle

Routine recommandée :
- 10 questions QCM en début de séance
- 10 minutes correction collective argumentée

---

# Annexe 8 – Banque de questions bonus (diagnostic)

1. Pourquoi ZRS peut être préféré à LRS dans certains cas sans aller jusqu’à GRS ?
2. Dans quel cas Contributor sur abonnement devient dangereux ?
3. Pourquoi un Private Endpoint réduit-il la surface d’attaque ?
4. Que se passe-t-il si une Policy Deny est assignée au mauvais niveau ?
5. Comment prouver qu’un accès est bien limité au moindre privilège ?

---

# Annexe 8 – Correctifs attendus (niveau expert)

- Utiliser groupes de sécurité nommés par fonction métier.
- Introduire revue périodique des rôles (access review).
- Centraliser journaux dans Log Analytics.
- Définir alertes prioritaires (sécurité + disponibilité + coût).
- Formaliser procédure d’escalade incident.

---

# Annexe finale – Message de clôture formateur

- Ce bloc valide les bases du métier d’administrateur cloud.
- La valeur professionnelle vient de la rigueur :
  - design propre
  - sécurité systématique
  - preuves et documentation
- L’objectif n’est pas seulement de “faire marcher”, mais de “faire marcher de manière gouvernée et sécurisée”.

