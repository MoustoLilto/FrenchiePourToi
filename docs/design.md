# Design Plan - FrenchiePourToi

Ce document décrit le système de design, les wireframes et l'inventaire des composants pour l'application FrenchiePourToi. Il s'appuie sur Tailwind CSS et DaisyUI, conformément aux directives du projet.

## 1. Inventaire du Design

Voici la liste des pages, composants et états d'interaction nécessaires pour l'application.

### 1.1 Pages

- [ ] Page d'Accueil (Home)
- [ ] Catalogue des Chiots (Puppy Catalog)
- [ ] Fiche Détail Chiot (Puppy Detail)
- [ ] Profils des Parents (Parent Profile)
- [ ] Formulaire de Réservation (Reservation Form - multi-étapes)
- [ ] Suivi de Réservation (Reservation Tracking)
- [ ] Page "Qui Sommes-Nous" (About Us)
- [ ] Blog - Liste des Articles (Blog List)
- [ ] Blog - Article Détaillé (Blog Post)
- [ ] Page de Contact (Contact Us)
- [ ] Tableau de Bord Administration (Admin Dashboard)
- [ ] Admin - Gestion des Chiots (Admin Puppy Management)
- [ ] Admin - Gestion du Contenu (Admin Content Management - Blog, Qui Sommes-Nous)
- [ ] Admin - Gestion des Réservations (Admin Reservation Management)
- [ ] Page de Connexion (Login - pour Admin)
- [ ] Page 404 (Not Found)

### 1.2 Composants

- [ ] **Navigation & Structure:**
    - [ ] En-tête (Header) : Logo, navigation principale, sélecteur de langue, toggle mode sombre.
    - [ ] Pied de page (Footer) : Liens utiles, informations de contact, copyright.
    - [ ] Fil d'Ariane (Breadcrumbs)
    - [ ] Menu latéral (Sidebar) : Pour filtres du catalogue, navigation admin.
    - [ ] Onglets (Tabs) : Pour organiser le contenu dans des sections (ex: profil parent, admin).
- [ ] **Éléments d'Interface (UI Elements):**
    - [ ] Bouton (Button) : Primaire, secondaire, accent, fantôme, lien, avec icônes.
    - [ ] Champ de Saisie (Input) : Texte, email, mot de passe, nombre, zone de texte, recherche.
    - [ ] Sélecteur (Select/Dropdown) : Pour filtres, options de formulaire.
    - [ ] Case à Cocher (Checkbox)
    - [ ] Bouton Radio (Radio Button)
    - [ ] Interrupteur (Toggle/Switch) : Pour mode sombre, options binaires.
    - [ ] Avatar : Pour profils utilisateurs/parents.
- [ ] **Affichage de Contenu:**
    - [ ] Carte (Card) : Pour chiots, articles de blog, profils parents, témoignages.
    - [ ] Tableau (Table) : Pour listes en admin, comparaison de données.
    - [ ] Modale (Modal) : Pour confirmations, formulaires rapides, alertes, zoom image.
    - [ ] Galerie d'Images/Vidéos (Image/Video Gallery) : Avec carrousel, vignettes.
    - [ ] Lecteur Vidéo (Video Player)
    - [ ] Accordéon (Accordion) : Pour FAQs, sections de contenu repliables.
    - [ ] Badge/Tag : Pour statuts, catégories.
- [ ] **Fonctionnalités Spécifiques:**
    - [ ] Composant de Filtres (Filter Set) : Pour le catalogue de chiots.
    - [ ] Pagination : Pour les listes longues (catalogue, blog, admin).
    - [ ] Indicateur de Chargement (Loading Spinner/Skeleton)
    - [ ] Notification/Toast (Alert/Toast) : Pour messages de succès, erreur, information.
    - [ ] Composant de Paiement (Payment Component) : Intégration Stripe.
    - [ ] Barre de Progression (Progress Bar) : Pour formulaires multi-étapes.
- [ ] **Spécifiques au Projet (selon `plan.md`):**
    - [ ] `PuppyCardComponent`
    - [ ] `PuppyFiltersComponent`
    - [ ] `PaymentComponent` (déjà listé)
    - [ ] `LoadingComponent` (déjà listé comme Indicateur de Chargement)
    - [ ] `NotificationComponent` (déjà listé comme Notification/Toast)

### 1.3 États d'Interaction

- [ ] Normal (Default)
- [ ] Survol (Hover)
- [ ] Focus (Clavier/Souris)
- [ ] Actif (Active/Selected) : ex: lien de navigation courant, filtre sélectionné.
- [ ] Désactivé (Disabled) : ex: bouton non cliquable, champ non éditable.
- [ ] Erreur (Error) : ex: champ de formulaire invalide.
- [ ] Succès (Success) : ex: confirmation après action.
- [ ] Chargement (Loading) : ex: bouton après soumission, section de contenu en attente.
- [ ] Vide (Empty) : ex: état d'une liste sans éléments.

## 2. Wireframes (Text-Based)

Wireframes pour les pages clés, mettant l'accent sur la structure et la hiérarchie du contenu.

### 2.1 Page d'Accueil (Home)

```
+------------------------------------------------------+
| Header: Logo (G), Nav (Accueil, Chiots, Blog, ...),  |
|         Sélecteur Langue, Toggle Thème (D)           |
+------------------------------------------------------+
| Hero Section:                                        |
|   - Titre Accrocheur                                 |
|   - Texte de présentation                            |
|   - CTA Principal (Voir nos chiots)                  |
|   - Image/Vidéo de fond de haute qualité             |
+------------------------------------------------------+
| Section Chiots Vedettes:                             |
|   - Titre: "Nos Derniers Arrivages" / "À la Une"     |
|   - Grille de 3-4 PuppyCards (Photo, Nom, Race, CTA) |
|   - Lien vers Catalogue Complet                      |
+------------------------------------------------------+
| Section Présentation Élevage (court):                |
|   - Titre: "Qui Sommes-Nous ?"                       |
|   - Texte court sur la philosophie, l'expertise      |
|   - CTA vers Page "Qui Sommes-Nous"                  |
+------------------------------------------------------+
| Section Blog (derniers articles):                    |
|   - Titre: "Nos Conseils d'Experts"                  |
|   - Grille de 2-3 Cartes Article (Image, Titre, Extrait) |
|   - CTA vers Page Blog                               |
+------------------------------------------------------+
| Section Témoignages:                                 |
|   - Titre: "Ce que nos familles disent"              |
|   - Carrousel de 2-3 témoignages (Texte, Auteur)     |
+------------------------------------------------------+
| Footer: Liens (Contact, FAQ), Social, Copyright      |
+------------------------------------------------------+
```

### 2.2 Catalogue des Chiots (Puppy Catalog)

```
+------------------------------------------------------+
| Header                                               |
+------------------------------------------------------+
| Fil d'Ariane: Accueil > Chiots                       |
+------------------------------------------------------+
| Titre Principal: "Découvrez nos Adorables Frenchies" |
+------------------------------------------------------+
| Barre de Contrôle:                                   |
|   - (Gauche) Nombre de résultats "X chiots trouvés"  |
|   - (Droite) Options de Tri (Prix, Âge, Popularité)  |
+------------------------------------------------------+
| Layout Principal (2 colonnes sur Desktop):           |
|                                                      |
|   +-----------------+  +---------------------------+ |
|   | Sidebar Filtres:|  | Grille des Chiots:        | |
|   | - Âge (slider)  |  |                           | |
|   | - Sexe (radio)  |  | [PuppyCard] [PuppyCard]   | |
|   | - Couleur (check)|  | [PuppyCard] [PuppyCard]   | |
|   | - Prix (slider) |  | [PuppyCard] [PuppyCard]   | |
|   | - Disponibilité |  | ...                       | |
|   | - Bouton Reset  |  |                           | |
|   +-----------------+  +---------------------------+ |
|                                                      |
+------------------------------------------------------+
| Pagination (si nécessaire)                           |
+------------------------------------------------------+
| Footer                                               |
+------------------------------------------------------+
```

### 2.3 Fiche Détail Chiot (Puppy Detail)

```
+------------------------------------------------------+
| Header                                               |
+------------------------------------------------------+
| Fil d'Ariane: Accueil > Chiots > [Nom du Chiot]      |
+------------------------------------------------------+
| Layout Principal (potentiellement 2 colonnes):       |
|                                                      |
|   +--------------------------+ +---------------------+ |
|   | Galerie Photos/Vidéos:   | | Informations Chiot: | |
|   | - Image principale       | | - Nom du Chiot (H1) | |
|   | - Vignettes / Carrousel  | | - Prix              | |
|   |                          | | - Statut (Dispo...) | |
|   +--------------------------+ | - CTA Réservation   | |
|                                | - Description (court) | |
|                                +---------------------+ |
|                                                      |
|   Section Détails Complets:                            |
|   - Description détaillée (caractère, etc.)          |
|   - Informations: Âge, Sexe, Couleur, Poids, ID      |
|   - Santé: Vaccins, vermifuge, tests                 |
|                                                      |
|   Section Parents:                                     |
|   - Liens vers Profil Mère (Nom, photo miniature)    |
|   - Liens vers Profil Père (Nom, photo miniature)    |
|                                                      |
|   Section "Vous pourriez aussi aimer":                 |
|   - Grille de 2-3 PuppyCards (autres chiots)         |
+------------------------------------------------------+
| Footer                                               |
+------------------------------------------------------+
```

### 2.4 Formulaire de Réservation (Étape 1 sur N)

```
+------------------------------------------------------+
| Header (simplifié, focus sur la tâche)               |
+------------------------------------------------------+
| Fil d'Ariane: ... > Réservation                      |
+------------------------------------------------------+
| Titre: "Réservez [Nom du Chiot]"                     |
| Barre de Progression: Étape 1 sur 3                  |
+------------------------------------------------------+
| Section Informations Personnelles:                   |
|   - Prénom* (Input)                                  |
|   - Nom* (Input)                                     |
|   - Email* (Input)                                   |
|   - Téléphone* (Input)                               |
|   - Adresse (Input)                                  |
|   - Ville* (Input)                                   |
|   - Code Postal* (Input)                             |
+------------------------------------------------------+
| Section Message (Optionnel):                         |
|   - Zone de texte pour questions/commentaires        |
+------------------------------------------------------+
| Récapitulatif Chiot (miniature):                     |
|   - Photo, Nom, Prix                                 |
+------------------------------------------------------+
| Boutons d'Action:                                    |
|   - (Primaire) "Suivant : Vérification" / "Paiement" |
|   - (Secondaire) "Annuler"                           |
+------------------------------------------------------+
| Footer (simplifié)                                   |
+------------------------------------------------------+
```

## 3. Système de Design (Guidelines)

Basé sur Tailwind CSS et DaisyUI, avec personnalisations pour FrenchiePourToi.

### 3.1 Couleurs (DaisyUI Thèmes)

Le projet utilisera les thèmes DaisyUI (un thème clair par défaut, un thème sombre). Les couleurs sémantiques de DaisyUI seront utilisées.

-   **Primary**: `bg-primary text-primary-content` (Utilisée pour les CTAs principaux, éléments importants)
    -   *Exemple DaisyUI: `primary`*
-   **Secondary**: `bg-secondary text-secondary-content` (Utilisée pour les éléments de support, alternatives)
    -   *Exemple DaisyUI: `secondary`*
-   **Accent**: `bg-accent text-accent-content` (Utilisée pour attirer l'attention, highlights)
    -   *Exemple DaisyUI: `accent`*
-   **Neutral**: `bg-neutral text-neutral-content` (Utilisée pour les fonds neutres, textes)
    -   *Exemple DaisyUI: `neutral`*
-   **Base**:
    -   `bg-base-100`: Couleur de fond principale de la page.
    -   `bg-base-200`: Couleur de fond légèrement contrastée.
    -   `bg-base-300`: Couleur de fond plus contrastée.
    -   `text-base-content`: Couleur de texte principale sur les fonds `base`.
-   **Info**: `bg-info text-info-content` (Pour messages informatifs)
-   **Success**: `bg-success text-success-content` (Pour messages de succès)
-   **Warning**: `bg-warning text-warning-content` (Pour avertissements)
-   **Error**: `bg-error text-error-content` (Pour messages d'erreur)

Les thèmes clair et sombre seront configurés dans `src/styles/styles.css` via DaisyUI. On utilise la configuration via css de tailwindCss 4. Le thème par défaut pourrait être "light" ou un thème personnalisé dérivé de "light" (ex: "frenchieLight") et "dark" ou "frenchieDark".

### 3.2 Typographie

Utilisation des classes utilitaires de Tailwind CSS. Police à définir (ex: Inter, Nunito Sans, ou une police plus élégante si souhaité).

| Rôle             | Classe Tailwind (Exemple)                      | Notes                                     |
| ---------------- | ---------------------------------------------- | ----------------------------------------- |
| Titre H1         | `text-4xl lg:text-5xl font-bold`               | Pour les titres de page principaux        |
| Titre H2         | `text-3xl lg:text-4xl font-semibold`           | Pour les sections importantes             |
| Titre H3         | `text-2xl lg:text-3xl font-semibold`           | Sous-sections                             |
| Titre H4         | `text-xl lg:text-2xl font-medium`              | Petits titres                             |
| Corps de texte   | `text-base font-normal leading-relaxed`        | Paragraphes, descriptions                 |
| Texte secondaire | `text-sm text-base-content/80`                 | Légendes, informations moins importantes  |
| Lien             | `link link-hover link-primary`                 | Liens standards                           |
| Label Formulaire | `text-sm font-medium`                          | Étiquettes des champs de formulaire       |

### 3.3 Espacement

Utilisation de l'échelle d'espacement de Tailwind CSS. Adopter une approche cohérente.

-   **Grille de base**: `4px` (Tailwind `1` = `0.25rem`)
-   **Petits espacements**: `p-1`, `p-2`, `m-1`, `m-2` (4px, 8px) - Pour intérieur des petits composants.
-   **Espacements moyens**: `p-4`, `p-6`, `m-4`, `m-6` (16px, 24px) - Pour padding des cartes, marges entre éléments.
-   **Grands espacements**: `p-8`, `p-10`, `m-8`, `m-10` (32px, 40px) - Pour padding de sections, marges entre sections.
-   **Gaps dans les grilles/flex**: `gap-2`, `gap-4`, `gap-6`, `gap-8`

### 3.4 Composants (Implémentation DaisyUI + Tailwind)

| Composant                     | Classes DaisyUI + Tailwind (Exemples)                                    | Notes                                                                          |
| ----------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Bouton (Button)**           | `btn` (base)                                                             | `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-link`, `btn-outline`, `btn-sm`, `btn-lg`, `btn-square`, `btn-circle`, `loading` |
| **Champ de Saisie (Input)**   | `input input-bordered w-full`                                            | `input-primary`, `input-sm`, `input-lg`, `textarea textarea-bordered`        |
| **Sélecteur (Select)**        | `select select-bordered w-full`                                          | `select-primary`, etc.                                                         |
| **Case à Cocher (Checkbox)**  | `checkbox`                                                               | `checkbox-primary`, `checkbox-sm`, `checkbox-lg`                               |
| **Bouton Radio (Radio)**      | `radio`                                                                  | `radio-primary`, etc.                                                          |
| **Carte (Card)**              | `card bg-base-100 shadow-xl`                                             | `card-body`, `card-title`, `card-actions`, `image-full`                        |
| **Tableau (Table)**           | `table w-full`                                                           | `table-zebra`, `table-pin-rows`, `table-pin-cols`                              |
| **Modale (Modal)**            | `modal`, (contrôlé par JS/checkbox) `modal-open`                         | `modal-box`, `modal-action`, `modal-backdrop`                                  |
| **En-tête (Navbar/Header)**   | `navbar bg-base-100 shadow-md`                                           | `navbar-start`, `navbar-center`, `navbar-end`, `menu menu-horizontal`          |
| **Menu Latéral (Drawer/Sidebar)** | `drawer`, `drawer-content`, `drawer-side`, `drawer-overlay`, `menu bg-base-200 w-80 p-4` | Pour filtres, navigation mobile/admin.                                       |
| **Fil d'Ariane (Breadcrumbs)**| `breadcrumbs text-sm`                                                    | `ul > li > a`                                                                  |
| **Pagination**                | `join` (pour groupe de boutons), `btn join-item`                         |                                                                                |
| **Notification (Alert)**      | `alert shadow-lg`                                                        | `alert-info`, `alert-success`, `alert-warning`, `alert-error`                  |
| **Indicateur Chargement**     | `loading loading-spinner loading-lg` (ou `loading-dots`, `loading-ring`) |                                                                                |
| **Avatar**                    | `avatar` -> `div.w-24.rounded-full` -> `img`                             | `online`, `offline`, `placeholder`                                             |
| **Badge**                     | `badge`                                                                  | `badge-primary`, `badge-outline`, etc.                                         |
| **Accordéon (Collapse)**      | `collapse bg-base-200`                                                   | `collapse-title`, `collapse-content`, `collapse-arrow`, `collapse-plus`        |
| **Onglets (Tabs)**            | `tabs`                                                                   | `tabs-lifted`, `tabs-boxed`, `tab tab-active`                                  |

### 3.5 Accessibilité (A11y)

-   **Contraste des couleurs**: Assurer un ratio de contraste minimum de 4.5:1 pour le texte normal et 3:1 pour le grand texte (WCAG AA). Utiliser des outils pour vérifier.
-   **Navigation Clavier**: Tous les éléments interactifs doivent être accessibles et utilisables via le clavier.
    -   DaisyUI gère bien les `focus-visible` (souvent `focus:ring` ou styles de focus spécifiques au composant). S'assurer que les `focus-visible:outline-none` sont utilisés judicieusement.
    -   Classes de focus de Tailwind: `focus:ring-2 focus:ring-offset-2 focus:ring-primary`.
-   **Étiquettes ARIA**:
    -   Utiliser `aria-label` pour les boutons icônes ou éléments non textuels.
    -   S'assurer que les champs de formulaire ont des `label` associés correctement (via `for` et `id` ou en encapsulant).
    -   Utiliser les rôles ARIA appropriés pour les composants complexes (modales, onglets, accordéons) si DaisyUI ne les fournit pas nativement de manière complète.
-   **Texte Alternatif**: Fournir un texte alternatif descriptif pour toutes les images (`alt` attribute).
-   **Structure Sémantique**: Utiliser les éléments HTML sémantiques (`<nav>`, `<main>`, `<aside>`, `<article>`, `<section>`, `<h1>`-`<h6>`).
-   **Préférences Utilisateur**: Respecter les préférences de mouvement réduit (`prefers-reduced-motion`).

### 3.6 Mode Sombre

-   Le mode sombre sera géré par DaisyUI en spécifiant un thème `dark` (ex: `data-theme="dark"` sur `<html>`).
-   Un service Angular (`ThemeService`) permettra de basculer entre les thèmes et de sauvegarder la préférence utilisateur (localStorage).
-   S'assurer que toutes les couleurs personnalisées (si utilisées en dehors de DaisyUI) ont des variantes pour le mode sombre ou s'adaptent bien.

### 3.7 Internationalisation (i18n)

-   Bien que principalement une préoccupation de contenu, le design doit permettre aux textes de différentes longueurs de s'adapter sans casser la mise en page.
-   Les sélecteurs de langue doivent être clairs et accessibles.
-   Attention à la direction du texte (LTR pour français/anglais).

--- 
