# Szybki Start - System Zarządzania Profilami

## 📦 Instalacja

```bash
npm install -D tsx
```

## 🚀 Podstawowe Użycie

### 1. Zobacz dostępne profile

```bash
npx tsx generate-batch.ts --list
```

### 2. Sprawdź spójność danych

```bash
npx tsx generate-batch.ts --validate
```

### 3. Synchronizuj profile (jeśli są niezgodności)

```bash
npx tsx generate-batch.ts --sync
```

## 🆕 Tworzenie Nowego Wsadu

### Krok 1: Utwórz szablon wsadu

```bash
npx tsx generate-batch.ts --create-batch "wsad-2024-11-16"
```

To utworzy katalog `batches/wsad-2024-11-16/` z plikami:

- `czesc-1-profile.json` (profile - skopiowane)
- `czesc-2-odpowiedzi.json` (szablon - do wypełnienia)
- `czesc-3-odpowiedzi.json` (szablon - do wypełnienia)
- `czesc-4-odpowiedzi.json` (szablon - do wypełnienia)
- `czesc-5-odpowiedzi.json` (szablon - do wypełnienia)
- `README.md` (instrukcje)

### Krok 2: Wypełnij odpowiedzi

```bash
cd batches/wsad-2024-11-16/
# Edytuj pliki czesc-*-odpowiedzi.json
```

**Uwaga:** Zamień `"// TODO: Uzupełnij odpowiedź"` na właściwe odpowiedzi.

### Krok 3: Waliduj wsad

```bash
npx tsx generate-batch.ts --validate-batch "wsad-2024-11-16"
```

### Krok 4: Użyj wsadu (skopiuj do głównego katalogu)

```bash
cp batches/wsad-2024-11-16/czesc-*-odpowiedzi.json .
```

### Krok 5: Uruchom ankietę

```bash
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

## 📝 Edycja Profili

### Dodanie nowego profilu

1. Edytuj `czesc-1-profile.json`:

```json
{
  "id": 21,
  "label": "Nowy profil",
  "demographics": {
    "consent": "TAK",
    "age": "25-34",
    "gender": "Kobieta",
    "education": "Wyższe licencjackie/inżynierskie",
    "occupation": "Programistka",
    "citySize": "Duże miasto (powyżej 150 tys.)"
  }
}
```

2. Synchronizuj:

```bash
npx tsx generate-batch.ts --sync
```

### Zmiana istniejącego profilu

1. Edytuj odpowiedni profil w `czesc-1-profile.json`
2. Synchronizuj zmiany:

```bash
npx tsx generate-batch.ts --sync
```

**Uwaga:** To zmieni tylko etykiety profili, nie nadpisze odpowiedzi!

## 🔍 Często Używane Komendy

```bash
# Lista profili
npx tsx generate-batch.ts --list

# Walidacja
npx tsx generate-batch.ts --validate

# Synchronizacja po zmianach
npx tsx generate-batch.ts --sync

# Nowy wsad
npx tsx generate-batch.ts --create-batch "nazwa-wsadu"

# Walidacja konkretnego wsadu
npx tsx generate-batch.ts --validate-batch "nazwa-wsadu"

# Pomoc
npx tsx generate-batch.ts
```

## 📊 Struktura Odpowiedzi

### Część 2: Sytuacje zawodowe (5 pytań)

```json
{ "questionNumber": 1, "answer": "Zdecydowanie akceptuję" }
```

Opcje: "Zdecydowanie nie akceptuję", "Raczej nie akceptuję", "Raczej akceptuję", "Zdecydowanie akceptuję"

### Część 3: Preferencje liderek (4 pytania)

```json
{ "questionNumber": 1, "answer": "dyrektorki generalnej" }
```

Opcje zależą od pytania (3 warianty dla każdego)

### Część 4: Samoocena (18 pytań + 2 attention checks)

```json
{ "questionNumber": 1, "answer": "Raczej się zgadzam" }
```

Opcje: "Zdecydowanie się nie zgadzam", "Raczej się nie zgadzam", "Raczej się zgadzam", "Zdecydowanie się zgadzam"

**Attention checks:**

- Pytanie 4: poprawna odpowiedź = "Raczej się zgadzam"
- Pytanie 13: poprawna odpowiedź = "Raczej się zgadzam"

### Część 5: Postawy wobec płci (24 pytania + 2 attention checks)

```json
{ "questionNumber": 1, "answer": "Raczej się zgadzam" }
```

Opcje: "Zdecydowanie się nie zgadzam", "Raczej się nie zgadzam", "Raczej się zgadzam", "Zdecydowanie się zgadzam"

**Attention checks:**

- Pytanie 5: poprawna odpowiedź = "Raczej się nie zgadzam"
- Pytanie 17: poprawna odpowiedź = "Raczej się zgadzam"

## ⚠️ Uwagi

- Zalecane: ~25% respondentów z błędnymi attention checks (realistyczne dane)
- Odpowiedzi powinny być spójne z profilem demograficznym
- Zawsze uruchom `--validate` przed użyciem wsadu
- Backup danych przed `--sync`

## 📚 Więcej Informacji

Zobacz szczegółową dokumentację w pliku `PROFILE-MANAGEMENT.md`.
