/**
 * Narzędzie do zarządzania profilami respondentów i generowania wsadów danych
 * 
 * Użycie:
 * 1. Definiuj profile w czesc-1-profile.json
 * 2. Uruchom: npx tsx generate-batch.ts --validate (sprawdzi spójność)
 * 3. Uruchom: npx tsx generate-batch.ts --create-batch "batch-name" (utworzy nowy wsad)
 */

import * as fs from 'fs';
import * as path from 'path';

interface Demographics {
  consent: string;
  age: string;
  gender: string;
  education: string;
  occupation: string;
  citySize: string;
}

interface Profile {
  id: number;
  label: string;
  demographics: Demographics;
}

interface ProfileData {
  czesc_1_z_5: {
    description: string;
    questions: any[];
    profiles: Profile[];
  };
}

interface RespondentAnswers {
  id: number;
  profile: string;
  answers?: { questionNumber: number; answer: string }[];
}

interface SurveySection {
  description: string;
  questions?: any[];
  respondents: RespondentAnswers[];
}

// Wczytaj profile z pliku głównego
function loadProfiles(): Profile[] {
  const profilePath = path.join(process.cwd(), 'czesc-1-profile.json');
  const data: ProfileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
  return data.czesc_1_z_5.profiles;
}

// Wczytaj sekcję ankiety
function loadSurveySection(filename: string): SurveySection | null {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const sectionKey = Object.keys(data).find(key => key.startsWith('czesc_'));
  return sectionKey ? data[sectionKey] : null;
}

// Waliduj spójność profili we wszystkich plikach
function validateProfiles(): boolean {
  console.log('🔍 Sprawdzanie spójności profili...\n');
  
  const masterProfiles = loadProfiles();
  const files = [
    'czesc-2-odpowiedzi.json',
    'czesc-3-odpowiedzi.json',
    'czesc-4-odpowiedzi.json',
    'czesc-5-odpowiedzi.json'
  ];

  let allValid = true;

  for (const file of files) {
    const section = loadSurveySection(file);
    if (!section) {
      console.log(`⚠️  Plik ${file} nie istnieje - pomiń`);
      continue;
    }

    console.log(`📄 ${file}:`);
    
    // Sprawdź czy wszyscy respondenci mają pasujące profile
    for (const respondent of section.respondents) {
      const masterProfile = masterProfiles.find(p => p.id === respondent.id);
      
      if (!masterProfile) {
        console.log(`  ❌ Respondent ID ${respondent.id} nie istnieje w czesc-1-profile.json`);
        allValid = false;
      } else if (masterProfile.label !== respondent.profile) {
        console.log(`  ⚠️  Niezgodność dla ID ${respondent.id}:`);
        console.log(`      Master: "${masterProfile.label}"`);
        console.log(`      Plik:   "${respondent.profile}"`);
        allValid = false;
      } else {
        console.log(`  ✓ Respondent ${respondent.id}: OK`);
      }
    }
    
    // Sprawdź czy nie brakuje respondentów
    const respondentIds = section.respondents.map(r => r.id);
    const missingIds = masterProfiles
      .map(p => p.id)
      .filter(id => !respondentIds.includes(id));
    
    if (missingIds.length > 0) {
      console.log(`  ⚠️  Brakujący respondenci: ${missingIds.join(', ')}`);
      allValid = false;
    }
    
    console.log('');
  }

  if (allValid) {
    console.log('✅ Wszystkie profile są spójne!\n');
  } else {
    console.log('❌ Znaleziono niezgodności. Popraw pliki przed kontynuowaniem.\n');
  }

  return allValid;
}

// Synchronizuj profile we wszystkich plikach
function syncProfiles(): void {
  console.log('🔄 Synchronizacja profili...\n');
  
  const masterProfiles = loadProfiles();
  const files = [
    'czesc-2-odpowiedzi.json',
    'czesc-3-odpowiedzi.json',
    'czesc-4-odpowiedzi.json',
    'czesc-5-odpowiedzi.json'
  ];

  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Plik ${file} nie istnieje - pomiń`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const sectionKey = Object.keys(data).find(key => key.startsWith('czesc_'));
    
    if (!sectionKey) continue;

    console.log(`📝 Aktualizacja ${file}...`);
    
    // Aktualizuj profile
    for (const respondent of data[sectionKey].respondents) {
      const masterProfile = masterProfiles.find(p => p.id === respondent.id);
      if (masterProfile) {
        respondent.profile = masterProfile.label;
      }
    }

    // Zapisz zaktualizowany plik
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`  ✓ Zaktualizowano ${file}`);
  }

  console.log('\n✅ Synchronizacja zakończona!\n');
}

// Generuj szablon nowego wsadu
function createBatchTemplate(batchName: string): void {
  console.log(`📦 Tworzenie szablonu wsadu: ${batchName}\n`);
  
  const masterProfiles = loadProfiles();
  const batchDir = path.join(process.cwd(), 'batches', batchName);
  
  // Utwórz katalog wsadu
  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  // Kopiuj plik profili
  const profilePath = path.join(process.cwd(), 'czesc-1-profile.json');
  const destProfilePath = path.join(batchDir, 'czesc-1-profile.json');
  fs.copyFileSync(profilePath, destProfilePath);
  console.log(`✓ Skopiowano czesc-1-profile.json`);

  // Generuj szablony dla pozostałych części
  const sections = [
    { file: 'czesc-2-odpowiedzi.json', key: 'czesc_2_z_5' },
    { file: 'czesc-3-odpowiedzi.json', key: 'czesc_3_z_5' },
    { file: 'czesc-4-odpowiedzi.json', key: 'czesc_4_z_5' },
    { file: 'czesc-5-odpowiedzi.json', key: 'czesc_5_z_5' }
  ];

  for (const section of sections) {
    const sourcePath = path.join(process.cwd(), section.file);
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Plik ${section.file} nie istnieje - pomiń`);
      continue;
    }

    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
    const sectionData = sourceData[section.key];

    // Utwórz szablon z pustymi odpowiedziami
    const template = {
      [section.key]: {
        description: sectionData.description,
        questions: sectionData.questions,
        answerOptions: sectionData.answerOptions,
        respondents: masterProfiles.map(profile => ({
          id: profile.id,
          profile: profile.label,
          answers: sectionData.questions
            ?.filter((q: any) => !q.isAttentionCheck)
            .map((q: any) => ({
              questionNumber: q.number,
              answer: '// TODO: Uzupełnij odpowiedź'
            })) || []
        }))
      }
    };

    const destPath = path.join(batchDir, section.file);
    fs.writeFileSync(destPath, JSON.stringify(template, null, 2), 'utf-8');
    console.log(`✓ Utworzono szablon ${section.file}`);
  }

  // Utwórz plik README dla wsadu
  const readmePath = path.join(batchDir, 'README.md');
  const readme = `# Wsad: ${batchName}

## Instrukcja wypełniania

1. **czesc-1-profile.json** - Profile są już zdefiniowane (skopiowane z głównego pliku)
2. **czesc-2-odpowiedzi.json** - Uzupełnij odpowiedzi dla części 2 (sytuacje zawodowe)
3. **czesc-3-odpowiedzi.json** - Uzupełnij odpowiedzi dla części 3 (preferencje liderek)
4. **czesc-4-odpowiedzi.json** - Uzupełnij odpowiedzi dla części 4 (samoocena)
5. **czesc-5-odpowiedzi.json** - Uzupełnij odpowiedzi dla części 5 (postawy wobec płci)

## Status wypełnienia

- [ ] Część 2 wypełniona
- [ ] Część 3 wypełniona
- [ ] Część 4 wypełniona
- [ ] Część 5 wypełniona
- [ ] Walidacja przeprowadzona (\`npx tsx generate-batch.ts --validate-batch ${batchName}\`)

## Uwagi

- Zachowaj attention checks (pytania kontrolne) w Części 4 i 5
- Upewnij się, że odpowiedzi są spójne z profilem demograficznym
- Zalecana liczba błędnych attention checks: ~25% respondentów
`;

  fs.writeFileSync(readmePath, readme, 'utf-8');
  console.log(`✓ Utworzono README.md`);

  console.log(`\n✅ Wsad "${batchName}" został utworzony w: batches/${batchName}/`);
  console.log(`\n📋 Następne kroki:`);
  console.log(`   1. Wypełnij odpowiedzi w plikach czesc-*-odpowiedzi.json`);
  console.log(`   2. Uruchom walidację: npx tsx generate-batch.ts --validate-batch ${batchName}`);
  console.log(`   3. Skopiuj gotowe pliki do głównego katalogu projektu\n`);
}

// Waliduj konkretny wsad
function validateBatch(batchName: string): void {
  console.log(`🔍 Walidacja wsadu: ${batchName}\n`);
  
  const batchDir = path.join(process.cwd(), 'batches', batchName);
  
  if (!fs.existsSync(batchDir)) {
    console.log(`❌ Wsad "${batchName}" nie istnieje w katalogu batches/\n`);
    return;
  }

  // Zmień kontekst na katalog wsadu
  const originalCwd = process.cwd();
  process.chdir(batchDir);
  
  const isValid = validateProfiles();
  
  // Przywróć oryginalny katalog
  process.chdir(originalCwd);
  
  if (isValid) {
    console.log(`✅ Wsad "${batchName}" jest gotowy do użycia!`);
    console.log(`\n📋 Aby użyć tego wsadu, skopiuj pliki do głównego katalogu:`);
    console.log(`   cp batches/${batchName}/*.json .`);
  }
}

// Wylistuj dostępne profile
function listProfiles(): void {
  console.log('👥 Dostępne profile respondentów:\n');
  
  const profiles = loadProfiles();
  
  profiles.forEach(profile => {
    console.log(`${profile.id.toString().padStart(2, '0')}. ${profile.label}`);
    console.log(`    ${profile.demographics.gender}, ${profile.demographics.age} lat`);
    console.log(`    ${profile.demographics.education}, ${profile.demographics.occupation}`);
    console.log(`    ${profile.demographics.citySize}`);
    console.log('');
  });
  
  console.log(`Łącznie: ${profiles.length} profili\n`);
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📊 Narzędzie do zarządzania profilami i wsadami danych

Użycie:
  npx tsx generate-batch.ts --validate
      Sprawdź spójność profili we wszystkich plikach
  
  npx tsx generate-batch.ts --sync
      Synchronizuj profile z czesc-1-profile.json do wszystkich plików
  
  npx tsx generate-batch.ts --create-batch <nazwa>
      Utwórz szablon nowego wsadu danych
  
  npx tsx generate-batch.ts --validate-batch <nazwa>
      Sprawdź spójność profili w konkretnym wsadzie
  
  npx tsx generate-batch.ts --list
      Wyświetl listę wszystkich profili

Przykłady:
  npx tsx generate-batch.ts --validate
  npx tsx generate-batch.ts --sync
  npx tsx generate-batch.ts --create-batch "wsad-2024-11"
  npx tsx generate-batch.ts --validate-batch "wsad-2024-11"
  npx tsx generate-batch.ts --list
  `);
  process.exit(0);
}

const command = args[0];

switch (command) {
  case '--validate':
    validateProfiles();
    break;
  
  case '--sync':
    syncProfiles();
    break;
  
  case '--create-batch':
    if (args.length < 2) {
      console.log('❌ Podaj nazwę wsadu: --create-batch <nazwa>\n');
      process.exit(1);
    }
    createBatchTemplate(args[1]);
    break;
  
  case '--validate-batch':
    if (args.length < 2) {
      console.log('❌ Podaj nazwę wsadu: --validate-batch <nazwa>\n');
      process.exit(1);
    }
    validateBatch(args[1]);
    break;
  
  case '--list':
    listProfiles();
    break;
  
  default:
    console.log(`❌ Nieznana komenda: ${command}\n`);
    console.log('Uruchom bez argumentów, aby zobaczyć pomoc.\n');
    process.exit(1);
}
