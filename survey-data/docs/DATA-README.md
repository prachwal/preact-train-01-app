# 📊 System Zarządzania Danymi Ankiety

Ten projekt zawiera zautomatyzowany system zarządzania profilami respondentów i danymi ankiety psychologicznej dotyczącej postaw wobec kobiet w rolach kierowniczych.

## 🎯 Główne Pliki

### Profile Respondentów

- **`czesc-1-profile.json`** - 🎯 Główny plik z definicjami wszystkich 20 profili respondentów

### Odpowiedzi Ankiety

- **`czesc-2-odpowiedzi.json`** - Część 2: Sytuacje zawodowe (5 pytań karuzeli)
- **`czesc-3-odpowiedzi.json`** - Część 3: Preferencje liderek (4 pytania)
- **`czesc-4-odpowiedzi.json`** - Część 4: Samoocena (18 stwierdzeń + 2 attention checks)
- **`czesc-5-odpowiedzi.json`** - Część 5: Postawy wobec płci (24 pytania + 2 attention checks)

### Narzędzia

- **`generate-batch.ts`** - Skrypt do zarządzania profilami i tworzenia wsadów danych

### Testy

- **`e2e/survey-extraction.spec.ts`** - Automatyczne wypełnianie ankiety dla wszystkich respondentów

## 🚀 Szybki Start

### Sprawdzenie spójności profili

```bash
npx tsx generate-batch.ts --validate
```

### Lista wszystkich profili

```bash
npx tsx generate-batch.ts --list
```

### Uruchomienie ankiety dla wszystkich 20 respondentów

```bash
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

## 📚 Dokumentacja

- **`QUICKSTART-PROFILES.md`** - Szybki start dla nowego systemu zarządzania profilami
- **`PROFILE-MANAGEMENT.md`** - Szczegółowa dokumentacja systemu zarządzania profilami

## 🔧 Typowe Zadania

### Dodanie nowego profilu

1. Edytuj `czesc-1-profile.json`
2. Uruchom `npx tsx generate-batch.ts --sync`
3. Dodaj odpowiedzi do plików czesc-*-odpowiedzi.json

### Utworzenie nowego wsadu danych

```bash
npx tsx generate-batch.ts --create-batch "nazwa-wsadu"
cd batches/nazwa-wsadu/
# Wypełnij odpowiedzi
npx tsx generate-batch.ts --validate-batch "nazwa-wsadu"
```

### Naprawa niezgodności profili

```bash
npx tsx generate-batch.ts --sync
```

## 📊 Statystyki

- **Respondentów:** 20
- **Części ankiety:** 5
- **Łączna liczba pytań:** ~51 (consent + 4 demograficzne + 5 + 4 + 18 + 24)
- **Attention checks:** 4 (pytania kontrolne w częściach 4 i 5)
- **Czas wypełnienia (automatycznie):** ~2.3 min/respondent = ~46 min łącznie

## ⚠️ Uwagi

- Wszystkie profile są centralnie zarządzane w `czesc-1-profile.json`
- Zawsze uruchamiaj `--validate` przed uruchomieniem testów
- Profile są automatycznie synchronizowane między plikami
- Katalog `batches/` jest w `.gitignore` (może zawierać dane wrażliwe)

## 🛠️ Wymagania

```bash
npm install -D tsx playwright
```

## 📞 Wsparcie

W razie problemów:

1. Uruchom `npx tsx generate-batch.ts --validate`
2. Sprawdź logi błędów
3. Zobacz dokumentację w `PROFILE-MANAGEMENT.md`
