# 📊 Dane Ankiety - Survey Data

Wszystkie dane i narzędzia do zarządzania ankietą psychologiczną znajdują się w katalogu **`survey-data/`**.

## 🚀 Szybki Start

```bash
# Przejdź do katalogu z danymi
cd survey-data

# Lista profili respondentów
npx tsx generate-batch.ts --list

# Walidacja spójności danych
npx tsx generate-batch.ts --validate
```

## 📁 Co Znajduje się w `survey-data/`

- **`czesc-1-profile.json`** - Profile 20 respondentów (główny plik)
- **`czesc-2-odpowiedzi.json`** - Odpowiedzi Część 2 (sytuacje zawodowe)
- **`czesc-3-odpowiedzi.json`** - Odpowiedzi Część 3 (preferencje liderek)
- **`czesc-4-odpowiedzi.json`** - Odpowiedzi Część 4 (samoocena)
- **`czesc-5-odpowiedzi.json`** - Odpowiedzi Część 5 (postawy wobec płci)
- **`generate-batch.ts`** - Narzędzie do zarządzania profilami i wsadami
- **`docs/`** - Pełna dokumentacja (5 plików)

## 📚 Dokumentacja

Szczegółowa dokumentacja znajduje się w `survey-data/docs/`:

- **`QUICKSTART-PROFILES.md`** - Szybki start (10 minut)
- **`PROFILE-MANAGEMENT.md`** - Szczegółowa dokumentacja
- **`JQ-EXAMPLES.md`** - Przykłady filtrowania profili
- **`DATA-README.md`** - Przegląd systemu
- **`SYSTEM-SUMMARY.md`** - Kompletne podsumowanie

## 🔧 Typowe Zadania

### Zarządzanie Profilami
```bash
cd survey-data

# Dodaj/edytuj profile w czesc-1-profile.json
vim czesc-1-profile.json

# Synchronizuj zmiany
npx tsx generate-batch.ts --sync
```

### Tworzenie Nowego Wsadu
```bash
cd survey-data

# Utwórz szablon
npx tsx generate-batch.ts --create-batch "wsad-nazwa"

# Wypełnij odpowiedzi w batches/wsad-nazwa/

# Waliduj
npx tsx generate-batch.ts --validate-batch "wsad-nazwa"
```

### Uruchomienie Testów
```bash
# Z głównego katalogu projektu
npx playwright test e2e/survey-extraction.spec.ts:1030 --project=chromium
```

## 📖 Więcej Informacji

Zobacz pełny README w katalogu `survey-data/`:
```bash
cat survey-data/README.md
```

Lub dokumentację:
```bash
cat survey-data/docs/QUICKSTART-PROFILES.md
```

