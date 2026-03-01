# HeroCamera - Guide Complet

## 📋 Vue d'ensemble

Le composant `HeroCamera` crée une interface interactive pour découvrir les films du festival avec une métaphore de caméra 3D futuriste.

### Architecture

```
┌─────────────────────────────────────────┐
│           HeroCamera                     │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │      Carrousel 3D (Coverflow)      │ │
│  │   [SD] [SD] [CAMERA] [SD] [SD]    │ │
│  │                                    │ │
│  │   - 5 genres de films              │ │
│  │   - Rotation fluide 3D             │ │
│  │   - Animation insertion            │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │    Hologramme Projeté (bas)        │ │
│  │   ┌─────┐ ┌─────┐ ┌─────┐         │ │
│  │   │Film1│ │Film2│ │Film3│         │ │
│  │   └─────┘ └─────┘ └─────┘         │ │
│  │   + Bouton play sur hover          │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │     Modal Vidéo (au clic)          │ │
│  │   Lecteur vidéo + infos            │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🎮 États & Transitions

### États principaux

```javascript
const [selectedGenreIdx, setSelectedGenreIdx] = useState(0);      // 0-4: genre actuel
const [isInserting, setIsInserting] = useState(false);             // Animation insertion
const [isCameraOn, setIsCameraOn] = useState(false);               // Caméra active
const [hologramVisible, setHologramVisible] = useState(false);     // Hologramme visible
const [selectedMovie, setSelectedMovie] = useState(null);          // Film en lecture
const [rotation, setRotation] = useState(0);                       // Rotation carrousel (deg)
```

### Flux états

```
Aucun film sélectionné
         ↓
[Clic carte SD]
         ↓
isInserting = true (animation 1.2s)
Caméra écran noir → écran cyan
Carte bouge vers caméra
         ↓
Animation complète (1.2s)
         ↓
isCameraOn = true
hologramVisible = true
Afficher 3 films du genre
         ↓
[Clic film]
         ↓
selectedMovie = film choisi
Ouvrir modal vidéo
```

## 🎨 Éléments visuels

### 1. Carrousel 3D (Coverflow)

**Structure:**
- Conteneur perspective: 1200px
- 5 cartes SD disposées en cercle 3D
- Rotation smooth: transform rotateY

**Cartes SD:**
- Dimension: 128px × 160px
- Conteneur noir gradient: `from-gray-700 to-black`
- Bande couleur top: couleur spécifique du genre
- Sélection: ring cyan glow + scale 110%
- Animation hover: scale 105%

**Caméra au centre:**
- Dimension: 256px × 192px
- Boîtier: gradient gray-700 to black
- LED rouge: pulsante
- Écran noir → cyan quand active
- Objectif: lentille gradient bleu
- Fente SD: illumine en orange pendant insertion

### 2. Hologramme (projection)

**Apparence:**
- Grille 3 colonnes, 3 films
- Fond: cyan transparent + blur
- Bordure cyan semi-transparent
- Scan line animée (animation scanning)

**Miniatures films:**
- Dimension: 128px × 96px
- Image cover du film
- Overlay noir gradient bottom
- Bouton play cyan au hover
- Titre cyan glitch en bas

**Animations:**
- Apparition: hologramFloat (3s, infinite)
- Titre: hologramGlitch (2s, infinite)
- Scan: scanLine (3s, linear)

### 3. Modal Vidéo

**Structure:**
- Fixed overlay z-50
- Fond noir backdrop blur
- Carte noire bordure cyan
- Vidéo aspect-video avec controls
- Infos bas: titre, réalisateur, durée, genre

**Fermeture:**
- Bouton close red top-right
- Clic outside overlay

## 🔧 Données

### GENRES

```javascript
{
  name: "Fiction",           // Nom affiché
  icon: "🎭",               // Emoji
  color: "from-blue-600 to-cyan-600",  // Gradient Tailwind
  glow: "text-blue-400"     // Couleur glow
}
```

### DEMO_MOVIES

```javascript
{
  id: 1,
  title: "Titre du film",
  filmmaker: "Réalisateur",
  duration: 60,             // secondes
  genre: "Fiction",
  thumbnail: "image URL",
  video: "video URL"
}
```

## 📱 Responsive Design

- **Desktop (lg):** Carrousel 500px, caméra 256px
- **Tablet (md):** Ajusté dynamiquement
- **Mobile:** Carrousel réduit, hologramme compact

## ⚡ Animations CSS

| Animation | Durée | Effet |
|-----------|-------|-------|
| `cameraInsert` | 1.2s | Carte vers caméra |
| `slotGlow` | 1.2s | Fente s'illumine |
| `hologramAppear` | 0.8s | Apparition hologramme |
| `hologramFloat` | 3s | Flottement doux |
| `hologramGlitch` | 2s | Glitch titre cyan |
| `scanLine` | 3s | Ligne scan descendante |

## 🎯 Interactions

### Clic carte SD
```javascript
handleCardClick(genreIdx)
  ├─ Si autre genre: insertCard(genreIdx)
  └─ Si même genre + isCameraOn: réinsérer
```

### Insertion carte
```javascript
insertCard(genreIdx)
  ├─ isInserting = true (animation 1.2s)
  ├─ Après 1.2s:
  │  ├─ isCameraOn = true
  │  ├─ hologramVisible = true
  │  └─ setFilteredMovies(genre)
  └─ Afficher hologramme
```

### Clic film
```javascript
setSelectedMovie(film)
  └─ Ouvrir modal vidéo
```

### Clic close modal
```javascript
setSelectedMovie(null)
  └─ Fermer modal
```

## 🌈 Couleurs Tailwind utilisées

- **Primaire**: violet, cyan, blue
- **Accents**: orange (fente SD), red (close)
- **Fond**: black, gray-700, gray-800
- **Texte**: white, cyan-300, cyan-400
- **Glows**: shadow-cyan-500

## 📦 Props & Exports

```javascript
export function HeroCamera() {
  // Pas de props requises
  // Données: DEMO_MOVIES, GENRES (internes)
  // État: 5 useState hooks
}
```

## 🔌 Intégration API

Remplacer `DEMO_MOVIES` et `GENRES`:

```javascript
// Dans useEffect ou avant render:
useEffect(() => {
  // fetch('/api/genres')
  // fetch('/api/movies')
}, []);
```

## 🎬 Exemple d'utilisation

```jsx
import { HeroCamera } from './components/sections/HeroCamera';

export function HomePage() {
  return (
    <main>
      <HeroCamera />
      {/* Autres sections */}
    </main>
  );
}
```

## 🐛 Débogage

Console logs disponibles:
- Clic carte: `console.log('Card clicked:', genreIdx)`
- Insertion: `console.log('Inserting card...')`
- Activation: `console.log('Camera on!')`
- Sélection film: `console.log('Film selected:', movie)`

## ⚙️ Performance

- CSS transforms pour animations fluides
- Pas de librairies externes (CSS only)
- Transform GPU-accelerated (translate, rotate, scale)
- Z-index: modal (50) > hologramme (30) > caméra (20)

## 🎓 Concepts clés

1. **3D Perspective**: `perspective: 1200px` sur conteneur
2. **Transform preserve-3d**: Maintain 3D space through children
3. **Cubic-bezier animations**: Easing customisé
4. **Conditional rendering**: Hologramme selon states
5. **Event propagation**: stopPropagation sur modal

## 📝 Notes de développement

- LED rouge caméra: `animate-pulse` (built-in Tailwind)
- Couleurs dynamiques: `style={{ background: ... }}`
- Gradient extraction: Tailwind color tokens
- Z-index: 50 (modal) > 30 (holo) > 20 (caméra) > 10 (carrousel)

---

**Dernière mise à jour**: Février 2026
**Version**: 1.0
**Status**: Production-ready ✅
