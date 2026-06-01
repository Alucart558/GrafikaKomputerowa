# 🎨 Grafika Komputerowa

Repozytorium zawierające projekty edukacyjne dotyczące grafiki komputerowej, wykonane w WebGL i JavaScript. Projekty demonstrują zaawansowane techniki renderowania 3D w przeglądarce internetowej.

---

## 📋 Struktura Projektu

```
GrafikaKomputerowa/
├── zajecia_grafika/           # Główny projekt WebGL
│   ├── index.html             # Strona HTML z canvasem
│   ├── script.js              # Główna logika renderowania
│   ├── styles.css             # Style CSS
│   ├── multi_texture.png      # Tekstura dla obiektów 3D
│   └── shaders/               # Shadery GLSL
│       ├── vertexShader.js    # Vertex shader
│       └── fragmentShader.js  # Fragment shader
└── .gitignore
```

---

## 🚀 O Projekcie

### Zajęcia Grafika - WebGL 3D Renderer

Interaktywna aplikacja webowa, która renderuje trójwymiarowy sześcian z teksturą, obracający się w przestrzeni 3D. Projekt demonstruje fundamentalne koncepty grafiki komputerowej.

#### Główne Cechy:
- 🎯 **Renderowanie 3D** za pomocą WebGL 2.0
- 🔄 **Animacja** - sześcian obraca się w czasie rzeczywistym
- 🎨 **Teksturowanie** - aplikacja tekstur na ściany sześcianu
- 📐 **Macierze Transformacji** - model, widok i projekcja
- 🔦 **Depth Testing** - prawidłowe sortowanie głębi obiektów

---

## 📁 Pliki Projektu

### `index.html`
```html
- Canvas o wymiarach 800x600 px
- Ładuje bibliotekę glMatrix do obliczeń macierzowych
- Wczytuje shadery i logikę renderowania
- Zawiera ukryty obraz tekstury
```

### `script.js` (7.6 KB)
**Główna logika renderowania WebGL**

Funkcja `Triangle()`:
- Inicjalizacja kontekstu WebGL2
- Tworzenie i kompilacja shaderów (vertex + fragment)
- Łączenie shaderów w program
- Definiowanie geometrii sześcianu (24 wierzchołki, 36 indeksów)
- Mapowanie tekstury na obiekty 3D
- Pętla animacji z rotacją w oparciu o czas
- Transformacje macierzowe (model, widok, projekcja)

**Klucz Funkcji**:
```javascript
// Inicjalizacja WebGL
const gl = canvas.getContext('webgl2');

// Właściwości geometrii
- squareVerticles: definiuje 24 wierzchołki sześcianu
- squareIndices: definuje 36 trójkątów
- boxTexCoords: mapowanie współrzędnych tekstury
- colors: kolory dla każdej ściany

// Macierze transformacji (glMatrix)
- Model Matrix: rotacja i skalowanie obiektu
- View Matrix: pozycja i kierunek kamery
- Projection Matrix: perspektywa (45°)

// Pętla animacji
requestAnimationFrame(loop) - płynna animacja 60 FPS
```

### `shaders/vertexShader.js`
**Shader wierzchołka** (GLSL)

Odpowiedzialny za:
- Transformację wierzchołków do przestrzeni ekranu
- Przesyłanie współrzędnych tekstury do fragment shadera
- Aplikacja macierzy Model-View-Projection

```glsl
gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
```

### `shaders/fragmentShader.js`
**Fragment shader** (GLSL)

Odpowiedzialny za:
- Pobieranie koloru z tekstury
- Ustawienie ostatecznego koloru piksela

```glsl
gl_FragColor = texture2D(sampler, fragTextCoord);
```

### `styles.css` (272 B)
- Stylizacja tła strony (aqua)
- Ustawienia dla elementów HTML

### `multi_texture.png`
Tekstura 2D (~188 KB) mapowana na ściany sześcianu

---

## 🛠️ Technologie

| Technologia | Udział | Zastosowanie |
|-----------|--------|--------------|
| **Java** | 73.9% | Backend, przetwarzanie |
| **JavaScript** | 23.7% | Logika WebGL, animacja |
| **HTML** | 1.6% | Struktura strony |
| **CSS** | 0.8% | Stylizacja |

### Biblioteki:
- **WebGL 2.0** - Rendering grafiki
- **glMatrix 3.x** - Operacje macierzowe (vec3, quat, mat4)

---

## 🎓 Koncepty Edukacyjne

Projekt demonstruje:

1. **Architektura WebGL**
   - Tworzenie kontekstu WebGL
   - Kompilacja shaderów
   - Linkowanie programu

2. **Geometria 3D**
   - Definiowanie wierzchołków
   - Indeksowanie dla efektywności
   - Element Array Buffers

3. **Transformacje**
   - Model Matrix (rotacja, skalowanie)
   - View Matrix (pozycja kamery)
   - Projection Matrix (perspektywa)

4. **Teksturowanie**
   - Bindowanie tekstury
   - Mapowanie współrzędnych UV
   - Parametry samplers

5. **Animacja**
   - `requestAnimationFrame` dla płynności
   - Interpolacja czasu
   - Quaterniony do rotacji

6. **Optymalizacja**
   - Depth testing (`gl.DEPTH_TEST`)
   - Culling twarzy (`gl.CULL_FACE`)
   - Static buffers

---

## 🚀 Uruchomienie

### Wymagania:
- Przeglądarka z obsługą WebGL 2.0 (Chrome, Firefox, Safari, Edge)
- Dostęp do internetu (glMatrix z CDN)

### Kroki:
1. Klonuj repozytorium:
   ```bash
   git clone https://github.com/Alucart558/GrafikaKomputerowa.git
   ```

2. Otwórz `zajecia_grafika/index.html` w przeglądarce lub zacznij lokalny serwer:
   ```bash
   cd zajecia_grafika
   python -m http.server 8000
   # lub dla Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Przejdź do `http://localhost:8000`

---

## 💡 Zmienne i Parametry

### Konfiguracja Kamery
```javascript
glm.mat4.lookAt(mView, [0,0,-10], [0,0,0], [0,1,0]);
// Pozycja: (0, 0, -10)
// Cel: (0, 0, 0)
// Wektor up: (0, 1, 0)

glm.mat4.perspective(mProj, glm.glMatrix.toRadian(45), 
                     canvas.width/canvas.height, 0.1, 1000.0);
// FOV: 45°
// Aspect ratio: 800/600
// Near plane: 0.1
// Far plane: 1000.0
```

### Kolory Ścian
```javascript
Każda ściana sześcianu ma 4 wierzchołki z różnymi kolorami:
- Ściana góra: czerwony, zielony, niebieski, żółty
- Ściana lewa: ciemny czerwony, cyan, niebieski, żółty
- Ściana prawa: czerwony, zielony, niebieski, żółty
// ... i tak dalej dla pozostałych ścian
```

### Rotacja
```javascript
let rotation_direction = [0, 1, 0];  // Obrót wokół osi Y
let angle = performance.now() / 1000; // Kąt w funkcji czasu
```

---

## 🔧 Debugging

### Sprawdzenie Kompilacji Shaderów
```javascript
function checkShaderCompile(shader) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('shader not compiled', gl.getShaderInfoLog(shader));
    }
}
```

### Sprawdzenie Linkowania Programu
```javascript
function checkLink(program) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    }
}
```

---

## 📚 Zasoby

- [WebGL Tutorial - Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [glMatrix Documentation](http://glmatrix.net/)
- [OpenGL ES 3.0 Spec](https://www.khronos.org/opengl/wiki/OpenGL_ES)
- [Shader Language GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)

---

## 👤 Autor

**Alucart558**

---

## 📝 Licencja

Projekty edukacyjne do celów nauki grafiki komputerowej.

---

**Ostatnia aktualizacja**: Czerwiec 2026  
**Wersja WebGL**: 2.0  
**Status**: ✅ Aktywny
