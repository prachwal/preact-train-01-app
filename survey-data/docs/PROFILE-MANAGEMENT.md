# System Zarządzania Profilami Respondentów

## 📋 Przegląd

System umożliwia centralne zarządzanie profilami respondentów i łatwe tworzenie nowych wsadów danych do ankiety psychologicznej.

## 🗂️ Struktura Plików

### Pliki Główne

```
czesc-1-profile.json          # 🎯 GŁÓWNY plik z definicjami wszystkich profili
czesc-2-odpowiedzi.json       # Odpowiedzi Część 2: Sytuacje zawodowe (5 pytań, karuzela)
czesc-3-odpowiedzi.json       # Odpowiedzi Część 3: Preferencje liderek (4 pytania)
czesc-4-odpowiedzi.json       # Odpowiedzi Część 4: Samoocena (18 stwierdzeń + 2 attention checks)
czesc-5-odpowiedzi.json       # Odpowiedzi Część 5: Postawy wobec płci (24 pytania + 2 attention checks)
```

### Narzędzia

```
generate-batch.ts             # Skrypt do zarządzania profilami i wsadami
```

### Katalogi Wsadów

```
batches/
  wsad-2024-11/              # Przykładowy wsad
    czesc-1-profile.json
    czesc-2-odpowiedzi.json
    czesc-3-odpowiedzi.json
    czesc-4-odpowiedzi.json
    czesc-5-odpowiedzi.json
    README.md
```

## 🎯 Główny Plik: czesc-1-profile.json

Jest to **jedyne źródło prawdy** dla wszystkich profili respondentów. Zawiera:

```json
{
  "czesc_1_z_5": {
    "description": "Część 1 z 5. Dane demograficzne respondentów.",
    "questions": [...],
    "profiles": [
      {
        "id": 1,
        "label": "Mężczyzna 45–54, duże miasto, pracownik umysłowy",
        "demographics": {
          "consent": "TAK",
          "age": "45-54",
          "gender": "Mężczyzna",
          "education": "Wyższe magisterskie/doctoral",
          "occupation": "Pracownik umysłowy",
          "citySize": "Duże miasto (powyżej 150 tys.)"
        }
      }
      // ... więcej profili
    ]
  }
}
```

### Pola Profilu

- **id**: Unikalny identyfikator respondenta (1-20)
- **label**: Krótki opis profilu (używany we wszystkich innych plikach)
- **demographics**: Szczegółowe dane demograficzne
  - **consent**: Zgoda na uczestnictwo ("TAK"/"NIE")
  - **age**: Przedział wiekowy ("18-24", "25-34", "35-44", "45-54", "55-64", "65+")
  - **gender**: Płeć ("Mężczyzna", "Kobieta", "Inna", "Wolę nie odpowiadać")
  - **education**: Wykształcenie (5 poziomów)
  - **occupation**: Zawód/status zawodowy
  - **citySize**: Wielkość miejscowości zamieszkania (4 kategorie)

## 🛠️ Narzędzie: generate-batch.ts

### Instalacja Zależności

```bash
npm install -D tsx
```

### Dostępne Komendy

#### 1. Walidacja Spójności Profili

```bash
npx tsx generate-batch.ts --validate
```

**Sprawdza:**

- Czy wszystkie pliki czesc-*-odpowiedzi.json mają spójne profile
- Czy ID respondentów pasują do czesc-1-profile.json
- Czy nie brakuje respondentów w żadnym pliku

**Przykładowy output:**

```
🔍 Sprawdzanie spójności profili...

📄 czesc-2-odpowiedzi.json:
  ✓ Respondent 1: OK
  ✓ Respondent 2: OK
  ...
  ✓ Respondent 20: OK

✅ Wszystkie profile są spójne!
```

#### 2. Synchronizacja Profili

```bash
npx tsx generate-batch.ts --sync
```

**Działanie:**

- Pobiera profile z czesc-1-profile.json
- Aktualizuje pole `profile` we wszystkich plikach czesc-*-odpowiedzi.json
- Zachowuje odpowiedzi, zmienia tylko etykiety profili

**Kiedy użyć:**

- Po edycji profili w czesc-1-profile.json
- Po wykryciu niezgodności przez --validate

#### 3. Tworzenie Nowego Wsadu

```bash
npx tsx generate-batch.ts --create-batch "wsad-2024-11"
```

**Tworzy:**

- Katalog `batches/wsad-2024-11/`
- Kopiuje czesc-1-profile.json
- Generuje szablony z pustymi odpowiedziami dla części 2-5
- Tworzy README.md z instrukcjami

**Struktura szablonu:**

```json
{
  "czesc_2_z_5": {
    "description": "...",
    "questions": [...],
    "respondents": [
      {
        "id": 1,
        "profile": "Mężczyzna 45–54, duże miasto, pracownik umysłowy",
        "answers": [
          { "questionNumber": 1, "answer": "// TODO: Uzupełnij odpowiedź" }
        ]
      }
    ]
  }
}
```

#### 4. Walidacja Konkretnego Wsadu

```bash
npx tsx generate-batch.ts --validate-batch "wsad-2024-11"
```

**Sprawdza:**

- Spójność profili wewnątrz wsadu
- Czy wszystkie odpowiedzi są wypełnione
- Czy struktura jest poprawna

#### 5. Lista Profili

```bash
npx tsx generate-batch.ts --list
```

**Wyświetla:**

```
👥 Dostępne profile respondentów:

01. Mężczyzna 45–54, duże miasto, pracownik umysłowy
    Mężczyzna, 45-54 lat
    Wyższe magisterskie/doctoral, Pracownik umysłowy
    Duże miasto (powyżej 150 tys.)

02. Kobieta 25–34, średnie miasto, studentka
    Kobieta, 25-34 lat
    Wyższe licencjackie/inżynierskie, Studentka
    Średnie miasto (do 150 tys.)

...

Łącznie: 20 profili
```

## 📝 Workflow: Przygotowanie Nowego Wsadu

### Krok 1: Utwórz Wsad

```bash
npx tsx generate-batch.ts --create-batch "wsad-2024-11"
```

### Krok 2: Wypełnij Odpowiedzi

Przejdź do `batches/wsad-2024-11/` i uzupełnij odpowiedzi w każdym pliku:

**czesc-2-odpowiedzi.json** (5 pytań × 20 respondentów = 100 odpowiedzi)

- Sytuacje zawodowe z kobietami w rolach kierowniczych
- Skala: "Zdecydowanie nie akceptuję" → "Zdecydowanie akceptuję"

**czesc-3-odpowiedzi.json** (4 pytania × 20 respondentów = 80 odpowiedzi)

- Preferencje dotyczące liderek i stylów zarządzania
- Wybór jednej z trzech opcji

**czesc-4-odpowiedzi.json** (18 pytań + 2 attention checks × 20 = 400 odpowiedzi)

- Samoocena i wartość własna
- Skala Likerta: "Zdecydowanie się nie zgadzam" → "Zdecydowanie się zgadzam"
- **UWAGA:** Pytania 4 i 13 to attention checks (odpowiedź: "Raczej się zgadzam")

**czesc-5-odpowiedzi.json** (24 pytania + 2 attention checks × 20 = 520 odpowiedzi)

- Postawy wobec płci (hostile & benevolent sexism)
- Skala Likerta: "Zdecydowanie się nie zgadzam" → "Zdecydowanie się zgadzam"
- **UWAGA:** Pytania 5 i 17 to attention checks (odpowiedzi: "Raczej się nie zgadzam", "Raczej się zgadzam")

### Krok 3: Waliduj Wsad

```bash
npx tsx generate-batch.ts --validate-batch "wsad-2024-11"
```

### Krok 4: Skopiuj do Głównego Katalogu

```bash
cp batches/wsad-2024-11/czesc-*-odpowiedzi.json .
```

### Krok 5: Uruchom Ankietę

```bash
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

## 🎨 Zarządzanie Profilami

### Dodanie Nowego Profilu

1. Edytuj `czesc-1-profile.json`:

```json
{
  "id": 21,
  "label": "Kobieta 18–24, wieś, uczennica",
  "demographics": {
    "consent": "TAK",
    "age": "18-24",
    "gender": "Kobieta",
    "education": "Średnie",
    "occupation": "Uczennica",
    "citySize": "Wieś"
  }
}
```

2. Synchronizuj zmiany:

```bash
npx tsx generate-batch.ts --sync
```

3. Uzupełnij odpowiedzi dla nowego profilu w plikach czesc-2 do czesc-5

### Modyfikacja Istniejącego Profilu

1. Edytuj odpowiedni profil w `czesc-1-profile.json`
2. Uruchom synchronizację:

```bash
npx tsx generate-batch.ts --sync
```

3. **UWAGA:** Zmienia tylko etykiety, nie nadpisuje odpowiedzi

### Usunięcie Profilu

1. Usuń profil z `czesc-1-profile.json`
2. Usuń odpowiadające wpisy z wszystkich plików czesc-*-odpowiedzi.json
3. Zwaliduj:

```bash
npx tsx generate-batch.ts --validate
```

## ⚠️ Uwagi i Best Practices

### Attention Checks

- **Część 4:** Pytania 4 i 13 - poprawna odpowiedź: "Raczej się zgadzam"
- **Część 5:** Pytania 5 i 17 - poprawne odpowiedzi: "Raczej się nie zgadzam", "Raczej się zgadzam"
- Zalecane: ~25% respondentów z błędnymi attention checks (realistyczne dane)

### Spójność Psychologiczna

- Odpowiedzi powinny być zgodne z profilem demograficznym
- Wykształcenie + wiek wpływają na postawy wobec płci
- Zawód wpływa na akceptację kobiet w rolach kierowniczych
- Wielkość miasta koreluje z liberalnymi poglądami

### Wersjonowanie Wsadów

```
batches/
  wsad-2024-11-01/          # Pierwszy wsad listopada 2024
  wsad-2024-11-02/          # Drugi wsad listopada 2024
  wsad-pilot/               # Dane pilotażowe
  wsad-final/               # Finalne dane badania
```

### Backup i Kontrola Wersji

- Commituj `czesc-1-profile.json` do git
- Katalog `batches/` dodaj do `.gitignore` (jeśli zawiera dane wrażliwe)
- Zachowaj kopie zapasowe przed synchronizacją

## 🚀 Przykładowe Scenariusze

### Scenariusz 1: Rozpoczęcie Nowego Badania

```bash
# 1. Zdefiniuj profile
vim czesc-1-profile.json

# 2. Utwórz wsad
npx tsx generate-batch.ts --create-batch "badanie-2024-Q4"

# 3. Wypełnij odpowiedzi
cd batches/badanie-2024-Q4/
# ... edycja plików ...

# 4. Waliduj
npx tsx generate-batch.ts --validate-batch "badanie-2024-Q4"

# 5. Aktywuj wsad
cd ../..
cp batches/badanie-2024-Q4/*.json .

# 6. Uruchom ankietę
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

### Scenariusz 2: Poprawienie Błędów w Profilach

```bash
# 1. Wykryj niezgodności
npx tsx generate-batch.ts --validate

# 2. Popraw w głównym pliku
vim czesc-1-profile.json

# 3. Synchronizuj
npx tsx generate-batch.ts --sync

# 4. Zweryfikuj
npx tsx generate-batch.ts --validate
```

### Scenariusz 3: Dodanie Nowych Respondentów

```bash
# 1. Dodaj profile (ID 21-30)
vim czesc-1-profile.json

# 2. Utwórz wsad tylko dla nowych profili
npx tsx generate-batch.ts --create-batch "wsad-nowi-respondenci"

# 3. Ręcznie usuń respondentów 1-20 z wygenerowanych plików
# 4. Wypełnij odpowiedzi dla respondentów 21-30
# 5. Połącz z głównymi plikami (merge JSON)
```

## 📊 Statystyki Profili

Aktualna dystrybucja (20 profili):

**Płeć:**

- Kobiety: 10 (50%)
- Mężczyźni: 10 (50%)

**Wiek:**

- 18-24: 0
- 25-34: 7 (35%)
- 35-44: 6 (30%)
- 45-54: 5 (25%)
- 55-64: 2 (10%)
- 65+: 0

**Wykształcenie:**

- Podstawowe: 0
- Zawodowe: 3 (15%)
- Średnie: 3 (15%)
- Wyższe licencjackie: 4 (20%)
- Wyższe magisterskie: 10 (50%)

**Wielkość miejscowości:**

- Wieś: 0
- Małe miasto: 6 (30%)
- Średnie miasto: 7 (35%)
- Duże miasto: 7 (35%)

## 🔧 Rozwiązywanie Problemów

### Problem: "Expected comma or closing brace"

**Rozwiązanie:** Sprawdź składnię JSON w czesc-1-profile.json. Użyj `jq` lub walidatora JSON.

### Problem: Niezgodne profile między plikami

**Rozwiązanie:**

```bash
npx tsx generate-batch.ts --validate  # Zidentyfikuj różnice
npx tsx generate-batch.ts --sync      # Automatyczna synchronizacja
```

### Problem: Brakujący respondenci w wsadzie

**Rozwiązanie:** Sprawdź czy wszystkie ID z czesc-1-profile.json są w plikach odpowiedzi. Użyj `--validate-batch`.

### Problem: Skrypt się nie uruchamia

**Rozwiązanie:**

```bash
npm install -D tsx typescript @types/node
npx tsx generate-batch.ts --help
```

## 📚 Dodatkowe Zasoby

- **Dokumentacja Playwright:** <https://playwright.dev/>
- **Walidator JSON:** <https://jsonlint.com/>
- **jq (CLI JSON processor):** <https://stedolan.github.io/jq/>

## 📞 Wsparcie

W razie problemów:

1. Uruchom `npx tsx generate-batch.ts --validate`
2. Sprawdź logi błędów
3. Zweryfikuj strukturę JSON
4. Użyj `--list` aby zobaczyć aktualny stan profili
