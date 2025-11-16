# Survey Automation Tests - Podsumowanie

## Status

✅ **Testy działają poprawnie** — automatyczne wypełnianie i wysyłanie ankiet Qualtrics z danych JSON.

## Pliki

- `e2e/survey-extraction.spec.ts` — testy Playwright do ekstrakcji i wysyłania ankiet
- `dane.json` — dane respondentów (20 profili z odpowiedziami na 17 pytań)
- `analysis/` — zapisane HTML strony i pytań do analizy selektorów

## Testy dostępne

### 1. Ekstrakcja struktury ankiety

```bash
npx playwright test e2e/survey-extraction.spec.ts -g "extract Qualtrics survey questions" --project=chromium
```

- Zapisuje pełny HTML strony do `analysis/pages/`
- Zapisuje HTML każdego pytania do `analysis/questions/`

### 2. Wysyłanie pojedynczego respondenta

```bash
npx playwright test e2e/survey-extraction.spec.ts -g "submit first respondent answers" --project=chromium
```

- Wczytuje dane pierwszego respondenta z `dane.json`
- Wypełnia 17 pytań na 3 stronach
- Zapisuje screenshot końcowej strony do `analysis/`
- **Czas wykonania:** ~40 sekund

### 3. Wysyłanie wielu respondentów

```bash
npx playwright test e2e/survey-extraction.spec.ts -g "submit multiple respondents" --project=chromium
```

- Wysyła pierwszych 3 respondentów sekwencyjnie
- Każdy respondent: 17 pytań, 3 strony
- **Czas wykonania:** ~80 sekund (dla 3 respondentów)

### 4. Uruchomienie wszystkich testów

```bash
npm run test:e2e
```

## Jak działa wysyłanie

### Strategia wypełniania

System próbuje dopasować odpowiedzi z `dane.json` do elementów na stronie używając:

1. **Qualtrics labels** — szuka `label.SingleAnswer` z dokładnym tekstem
2. **Radio/checkbox inputs** — sprawdza powiązane `label[for]` z inputem
3. **Text inputs** — wypełnia pola tekstowe/numeryczne
4. **Select dropdowns** — wybiera opcje z listy rozwijanej

### Nawigacja

- Strona 1: Zgoda na udział (pytanie 1)
- Strona 2: Dane demograficzne i pytania zawodowe (pytania 2-11)
- Strona 3: Pozostałe pytania (pytania 12-17)
- System automatycznie klika przycisk "Next" po wypełnieniu każdej strony

## Wyniki testów (ostatnie uruchomienie)

### Test 1: Pojedynczy respondent

```
✓ Respondent 1: Mężczyzna 45–54, duże miasto, pracownik umysłowy
  - Page 1: 1 odpowiedź zastosowana (TAK)
  - Page 2: 10 odpowiedzi zastosowanych (Q2-Q11)
  - Page 3: 6 odpowiedzi zastosowanych (Q12-Q17)
  ✓ Test completed. Processed 17 questions
```

### Test 2: Wielu respondentów

```
✓ Respondent 1 completed (17/17 questions)
✓ Respondent 2 completed (17/17 questions)
✓ Respondent 3 completed (17/17 questions)
✓ All 3 respondents submitted successfully
```

## Struktura danych (`dane.json`)

Każdy respondent ma:

- `id` — unikalny identyfikator
- `profile` — opis profilu (płeć, wiek, miasto, zawód)
- `answers` — obiekt z kluczami "1"-"17" i wartościami odpowiedzi

Przykład:

```json
{
  "id": 1,
  "profile": "Mężczyzna 45–54, duże miasto, pracownik umysłowy",
  "answers": {
    "1": "TAK",
    "2": "45-54",
    "3": "Mężczyzna",
    ...
  }
}
```

## Pliki wygenerowane

### Analysis directory

```
analysis/
├── pages/
│   └── page-1.html              # Pełny HTML pierwszej strony ankiety
├── questions/
│   └── page-1-q-1.html          # HTML pierwszego pytania (zgoda)
└── final-page-respondent-1.png  # Screenshot końcowej strony
```

## Selektory Qualtrics (wykryte z HTML)

Kluczowe selektory używane w testach:

- Pytania: `.QuestionOuter`, `[questionid]`
- Radio buttons: `input[type="radio"][id^="QR~"]`
- Labels: `label.SingleAnswer`, `label[for^="QR~"]`
- Przycisk Next: `#NextButton`
- Text inputs: `input[type="text"]`, `input[type="number"]`

## Rozszerzanie testów

### Wysyłanie wszystkich 20 respondentów

Zmień w teście `submit multiple respondents`:

```typescript
const testRespondents = respondents.slice(0, 20); // zamiast .slice(0, 3)
```

### Dodawanie nowych respondentów

Edytuj `dane.json` i dodaj nowy obiekt do tablicy `respondents`:

```json
{
  "id": 21,
  "profile": "Twój profil",
  "answers": {
    "1": "TAK",
    "2": "18-24",
    ...
  }
}
```

## Troubleshooting

### Test timeout

Zwiększ timeout w `test.setTimeout()`:

```typescript
test.setTimeout(180000); // 3 minuty
```

### Odpowiedzi nie są aplikowane

1. Sprawdź dokładne dopasowanie tekstu w `dane.json`
2. Uruchom test z `--headed` aby zobaczyć co się dzieje:

   ```bash
   npx playwright test ... --headed
   ```

### Selektor nie działa

1. Uruchom ekstrakcję HTML: test `extract Qualtrics survey questions`
2. Sprawdź `analysis/questions/*.html` dla nowych struktur
3. Zaktualizuj funkcję `applyAnswer()` w teście

## Uwagi techniczne

- **Playwright version:** zgodna z `package.json`
- **Przeglądarki:** Chromium (Firefox i WebKit mogą mieć problemy z Qualtrics)
- **Headless mode:** domyślnie włączony (szybszy)
- **Retry:** testy nie mają automatycznego retry dla błędów
- **Parallel execution:** obecnie wyłączone (sekwencyjne wysyłanie)

## Następne kroki (opcjonalne)

1. Dodać parametryzację URL ankiety
2. Eksportować wyniki do CSV
3. Dodać walidację odpowiedzi przed wysłaniem
4. Zaimplementować retry logic dla błędów sieciowych
5. Dodać raportowanie postępu w czasie rzeczywistym
