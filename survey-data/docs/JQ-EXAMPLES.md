# Przykłady Filtrowania Profili z jq

## 📋 Podstawowe Filtrowanie

### Wszystkie profile (tylko ID i label)

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | {id: .id, label: .label}'
```

### Tylko etykiety profili

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[].label'
```

### Tylko ID profili

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[].id'
```

## 👤 Filtrowanie po Płci

### Tylko kobiety

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.gender == "Kobieta") | {id: .id, label: .label}'
```

### Tylko mężczyźni

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.gender == "Mężczyzna") | {id: .id, label: .label}'
```

### Liczba kobiet vs mężczyzn

```bash
echo "Kobiety: $(cat czesc-1-profile.json | jq '[.czesc_1_z_5.profiles[] | select(.demographics.gender == "Kobieta")] | length')"
echo "Mężczyźni: $(cat czesc-1-profile.json | jq '[.czesc_1_z_5.profiles[] | select(.demographics.gender == "Mężczyzna")] | length')"
```

## 🎂 Filtrowanie po Wieku

### Wiek 25-34

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.age == "25-34") | {id: .id, label: .label}'
```

### Wiek 45+

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.age == "45-54" or .demographics.age == "55-64" or .demographics.age == "65+") | {id: .id, label: .label}'
```

### Młodzi (18-34)

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.age == "18-24" or .demographics.age == "25-34") | {id: .id, label: .label}'
```

## 🎓 Filtrowanie po Wykształceniu

### Wyższe magisterskie

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.education == "Wyższe magisterskie/doctoral") | {id: .id, label: .label}'
```

### Wykształcenie wyższe (wszystkie poziomy)

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.education | contains("Wyższe")) | {id: .id, label: .label}'
```

### Wykształcenie zawodowe lub średnie

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.education == "Zawodowe" or .demographics.education == "Średnie") | {id: .id, label: .label}'
```

## 🏙️ Filtrowanie po Wielkości Miasta

### Duże miasta

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.citySize == "Duże miasto (powyżej 150 tys.)") | {id: .id, label: .label}'
```

### Małe miasta i wieś

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.citySize == "Małe miasto (do 50 tys.)" or .demographics.citySize == "Wieś") | {id: .id, label: .label}'
```

## 💼 Filtrowanie po Zawodzie

### Zawody "wysokiego statusu" (menedżerowie, lekarze, prawnicy, IT)

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.occupation | test("menedżer|lekar|prawni|IT|konsult|inżynier|analityk"; "i")) | {id: .id, label: .label}'
```

### Studenci

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.occupation | test("student"; "i")) | {id: .id, label: .label}'
```

### Pracownicy fizyczni i rzemieślnicy

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.occupation | test("fizyczny|rzemieślnik|kierowca"; "i")) | {id: .id, label: .label}'
```

## 🔍 Kombinowane Filtrowanie

### Kobiety 25-34 z dużych miast

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.gender == "Kobieta" and .demographics.age == "25-34" and .demographics.citySize == "Duże miasto (powyżej 150 tys.)") | {id: .id, label: .label}'
```

### Mężczyźni z wykształceniem wyższym magisterskim

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.demographics.gender == "Mężczyzna" and .demographics.education == "Wyższe magisterskie/doctoral") | {id: .id, label: .label}'
```

### Osoby 45+ z małych miast lub wsi

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select((.demographics.age == "45-54" or .demographics.age == "55-64" or .demographics.age == "65+") and (.demographics.citySize == "Małe miasto (do 50 tys.)" or .demographics.citySize == "Wieś")) | {id: .id, label: .label}'
```

## 📊 Statystyki

### Dystrybucja płci

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.gender) | map({gender: .[0].demographics.gender, count: length})'
```

### Dystrybucja wieku

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.age) | map({age: .[0].demographics.age, count: length})'
```

### Dystrybucja wykształcenia

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.education) | map({education: .[0].demographics.education, count: length})'
```

### Dystrybucja wielkości miasta

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.citySize) | map({citySize: .[0].demographics.citySize, count: length})'
```

### Wszystkie statystyki razem

```bash
echo "=== Płeć ==="
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.gender) | map({gender: .[0].demographics.gender, count: length})'

echo -e "\n=== Wiek ==="
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.age) | map({age: .[0].demographics.age, count: length})'

echo -e "\n=== Wykształcenie ==="
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.education) | map({education: .[0].demographics.education, count: length})'

echo -e "\n=== Wielkość miasta ==="
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles | group_by(.demographics.citySize) | map({citySize: .[0].demographics.citySize, count: length})'
```

## 🔧 Filtrowanie w Innych Plikach

### Znaleźć respondentów z danym profilem w czesc-2-odpowiedzi.json

```bash
cat czesc-2-odpowiedzi.json | jq '.czesc_2_z_5.respondents[] | select(.profile | contains("IT specialist")) | {id: .id, profile: .profile}'
```

### Znaleźć wszystkich respondentów z danym ID w czesc-5-odpowiedzi.json

```bash
cat czesc-5-odpowiedzi.json | jq '.czesc_5_z_5.respondents[] | select(.id == 1)'
```

### Wyciągnąć odpowiedzi konkretnego respondenta z czesc-2

```bash
cat czesc-2-odpowiedzi.json | jq '.czesc_2_z_5.respondents[] | select(.id == 1) | .answers'
```

## 🎯 Eksport do CSV

### Podstawowa lista profili (CSV-like)

```bash
echo "ID,Płeć,Wiek,Wykształcenie,Zawód,Miasto"
cat czesc-1-profile.json | jq -r '.czesc_1_z_5.profiles[] | [.id, .demographics.gender, .demographics.age, .demographics.education, .demographics.occupation, .demographics.citySize] | @csv'
```

### Eksport tylko ID i etykiet

```bash
echo "ID,Profil"
cat czesc-1-profile.json | jq -r '.czesc_1_z_5.profiles[] | [.id, .label] | @csv'
```

## 🔍 Wyszukiwanie po Tekście

### Profil zawiera słowo "menedżer"

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.label | test("menedżer"; "i")) | {id: .id, label: .label}'
```

### Profil zawiera słowo "duże miasto"

```bash
cat czesc-1-profile.json | jq '.czesc_1_z_5.profiles[] | select(.label | contains("duże miasto")) | {id: .id, label: .label}'
```

## 💡 Przydatne Aliasy (dodaj do ~/.bashrc)

```bash
# Lista wszystkich profili
alias profiles-list='cat czesc-1-profile.json | jq ".czesc_1_z_5.profiles[] | {id: .id, label: .label}"'

# Tylko kobiety
alias profiles-women='cat czesc-1-profile.json | jq ".czesc_1_z_5.profiles[] | select(.demographics.gender == \"Kobieta\") | {id: .id, label: .label}"'

# Tylko mężczyźni
alias profiles-men='cat czesc-1-profile.json | jq ".czesc_1_z_5.profiles[] | select(.demographics.gender == \"Mężczyzna\") | {id: .id, label: .label}"'

# Statystyki
alias profiles-stats='echo "=== Płeć ===" && cat czesc-1-profile.json | jq ".czesc_1_z_5.profiles | group_by(.demographics.gender) | map({gender: .[0].demographics.gender, count: length})"'
```

## 📚 Więcej Informacji

- **jq manual:** <https://stedolan.github.io/jq/manual/>
- **jq play (online):** <https://jqplay.org/>
- **Tutorial jq:** <https://stedolan.github.io/jq/tutorial/>
