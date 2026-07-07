# Portfolio — Léa Abeni

Site portfolio one-page pour Léa Abeni, spécialiste en automatisation
no-code (Make.com) pour entrepreneurs et freelances francophones (Bénin,
France, Belgique, Canada).

HTML / CSS / JavaScript vanilla — aucun framework, aucune dépendance à
installer.

## Structure

```
portfolio-lea-abeni/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── README.txt        (où glisser vos images)
│   ├── photo-lea.jpg      (à ajouter — photo de profil)
│   └── projet-*.jpg       (à ajouter — captures des scénarios Make.com)
└── README.md
```

## Prévisualiser en local

Aucune installation n'est nécessaire. Deux options :

1. **Ouvrir directement le fichier** : double-cliquez sur `index.html`
   (ou ouvrez-le depuis votre navigateur).
2. **Servir le dossier via un petit serveur local** (recommandé pour que
   les chemins d'images fonctionnent de façon identique à la production) :

   ```bash
   cd portfolio-lea-abeni
   python3 -m http.server 8000
   ```

   Puis ouvrez http://localhost:8000 dans votre navigateur.

## Déployer gratuitement

### Netlify (drag & drop)

1. Rendez-vous sur https://app.netlify.com/drop
2. Glissez-déposez le dossier `portfolio-lea-abeni` (celui qui contient
   `index.html`) directement dans la page.
3. Netlify vous fournit une URL en quelques secondes.
4. Le formulaire de contact utilise déjà `data-netlify="true"` : Netlify
   détecte et active automatiquement la collecte des messages. Retrouvez-les
   ensuite dans l'onglet **Forms** de votre tableau de bord Netlify.

### Vercel

1. Créez un compte sur https://vercel.com
2. Utilisez `vercel` en CLI ou l'import via l'interface web, en pointant
   vers le dossier `portfolio-lea-abeni`.
3. Aucune configuration de build n'est nécessaire (site statique).

   Note : Netlify Forms est propre à Netlify. Sur Vercel, le formulaire de
   contact ne collectera pas les messages automatiquement — il faudra le
   relier à un service tiers (Formspree, EmailJS, etc.).

### GitHub Pages

1. Poussez le contenu du dossier `portfolio-lea-abeni` à la racine d'un
   dépôt GitHub (ou dans un dossier `/docs`).
2. Dans les paramètres du dépôt, activez **Pages** et sélectionnez la
   branche et le dossier correspondants.
3. Le site sera disponible à l'URL fournie par GitHub quelques minutes
   après l'activation.

   Note : comme pour Vercel, le formulaire de contact nécessitera un
   service tiers pour fonctionner (GitHub Pages ne traite pas les
   formulaires).

## Personnaliser le contenu

- **Textes** (hero, à propos, etc.) : directement dans `index.html`.
- **Projets** : dans le tableau `projects` en haut de `script.js` — ajoutez,
  modifiez ou supprimez un objet pour changer le contenu affiché, sans
  toucher au HTML.
- **Images** : voir `assets/README.txt` pour les noms de fichiers attendus.
- **Liens réseaux sociaux** : remplacez les URLs placeholder
  (`https://linkedin.com/in/VOTRE-LIEN`, `https://facebook.com/VOTRE-LIEN`)
  dans `index.html` par vos vrais liens (section Contact et pied de page).
- **Couleurs et polices** : toutes les valeurs de la charte graphique sont
  centralisées dans le bloc `:root` en haut de `style.css`.
