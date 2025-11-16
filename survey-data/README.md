# 📊 Survey Data - Dane Ankiety Psychologicznej

Ten katalog zawiera wszystkie dane i narzędzia do zarządzania ankietą psychologiczną dotyczącej postaw wobec kobiet w rolach kierowniczych.

## 📁 Struktura Katalogu

```text
survey-data/
├── 📄 czesc-1-profile.json          # 🎯 Profile respondentów (główny plik)
├── 📄 czesc-2-odpowiedzi.json       # Odpowiedzi Część 2: Sytuacje zawodowe
├── 📄 czesc-3-odpowiedzi.json       # Odpowiedzi Część 3: Preferencje liderek
├── 📄 czesc-4-odpowiedzi.json       # Odpowiedzi Część 4: Samoocena
├── 📄 czesc-5-odpowiedzi.json       # Odpowiedzi Część 5: Postawy wobec płci
├── 🔧 generate-batch.ts             # Narzędzie zarządzania
└── 📁 docs/                          # Dokumentacja
    ├── DATA-README.md
    ├── QUICKSTART-PROFILES.md
    ├── PROFILE-MANAGEMENT.md
    ├── JQ-EXAMPLES.md
    └── SYSTEM-SUMMARY.md
```

## 🚀 Szybki Start

### Lista profili

```bash
cd survey-data
npx tsx generate-batch.ts --list
```

### Walidacja spójności

```bash
cd survey-data
npx tsx generate-batch.ts --validate
```

### Synchronizacja profili

```bash
cd survey-data
npx tsx generate-batch.ts --sync
```

### Tworzenie nowego wsadu

```bash
cd survey-data
npx tsx generate-batch.ts --create-batch "nazwa-wsadu"
```

## 📚 Dokumentacja

Szczegółowa dokumentacja znajduje się w katalogu `docs/`:

1. **`docs/DATA-README.md`** - Przegląd systemu zarządzania danymi
2. **`docs/QUICKSTART-PROFILES.md`** - Szybki start dla nowych użytkowników
3. **`docs/PROFILE-MANAGEMENT.md`** - Szczegółowa dokumentacja (450+ linii)
4. **`docs/JQ-EXAMPLES.md`** - Przykłady filtrowania profili z jq
5. **`docs/SYSTEM-SUMMARY.md`** - Kompletne podsumowanie systemu

## 🎯 Główne Pliki

### `czesc-1-profile.json`

**Centralny plik z profilami wszystkich 20 respondentów.**

- Jest źródłem prawdy dla wszystkich profili
- Zawiera pełne dane demograficzne
- Edytuj tylko ten plik, potem użyj `--sync`

### `czesc-*-odpowiedzi.json`

**Pliki z odpowiedziami dla poszczególnych części ankiety.**

- Część 2: 5 pytań (sytuacje zawodowe, karuzela)
- Część 3: 4 pytania (preferencje liderek)
- Część 4: 18 pytań + 2 attention checks (samoocena, karuzela)
- Część 5: 24 pytania + 2 attention checks (postawy wobec płci, karuzela)

### `generate-batch.ts`

**Narzędzie CLI do zarządzania profilami i wsadami.**

Komendy:

- `--list` - Wyświetl wszystkie profile
- `--validate` - Sprawdź spójność profili
- `--sync` - Synchronizuj profile między plikami
- `--create-batch <nazwa>` - Utwórz nowy wsad
- `--validate-batch <nazwa>` - Waliduj wsad

## 🔍 Przykłady Użycia

### Filtrowanie profili z jq

```bash
# Tylko kobiety
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.gender == "Kobieta") | {id, label}'

# Wiek 25-34
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.age == "25-34") | {id, label}'

# Duże miasta
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.citySize == "Duże miasto (powyżej 150 tys.)") | {id, label}'
```

Więcej przykładów: `docs/JQ-EXAMPLES.md`

## 📊 Statystyki

- **Respondentów:** 20
- **Płeć:** 50% kobiet, 50% mężczyzn
- **Wiek:** Głównie 25-44 (65%)
- **Wykształcenie:** 70% wyższe
- **Miasta:** Zrównoważona dystrybucja (35% duże, 35% średnie, 30% małe)

## 🛠️ Workflow

### 1. Dodanie nowego profilu

```bash
# Edytuj czesc-1-profile.json
vim czesc-1-profile.json

# Synchronizuj
npx tsx generate-batch.ts --sync

# Dodaj odpowiedzi do plików czesc-*-odpowiedzi.json
```

### 2. Przygotowanie nowego wsadu

```bash
# Utwórz szablon
npx tsx generate-batch.ts --create-batch "wsad-2024-Q4"

# Wypełnij odpowiedzi w batches/wsad-2024-Q4/

# Waliduj
npx tsx generate-batch.ts --validate-batch "wsad-2024-Q4"

# Aktywuj (skopiuj do survey-data/)
cp batches/wsad-2024-Q4/*.json .
```

### 3. Uruchomienie testów

```bash
# Z głównego katalogu projektu
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

## ⚠️ Uwagi

- **Backup:** Zawsze zrób backup przed `--sync`
- **Attention checks:** Część 4 (Q4, Q13) i Część 5 (Q5, Q17)
- **Walidacja:** Uruchamiaj `--validate` przed użyciem danych
- **Batches:** Katalog `batches/` jest w `.gitignore`

## 🔗 Powiązane Pliki

- **Główne dane:** `dane.json` (w katalogu głównym projektu)
- **Testy:** `e2e/survey-extraction.spec.ts`
- **Konfiguracja:** `.gitignore` (survey-data/ i batches/ są ignorowane)

## 📞 Pomoc

Uruchom bez argumentów, aby zobaczyć pomoc:

```bash
npx tsx generate-batch.ts
```

Lub przeczytaj dokumentację:

```bash
cat docs/QUICKSTART-PROFILES.md
cat docs/PROFILE-MANAGEMENT.md
```
