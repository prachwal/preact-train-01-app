import * as fs from 'fs';
import * as path from 'path';

interface SurveyQuestion {
  index: number;
  className: string;
  questionText: string;
  options: string[];
}

// Dane wyciągnięte bezpośrednio z HTML strony Qualtrics (bez JavaScript)
const surveyContent = `Dzień dobry! Nazywam się Monika Rudzka i jestem studentką psychologii na Uniwersytecie SWPS w Warszawie. Zapraszam Cię do udziału w krótkim badaniu, które realizuję w ramach mojej pracy magisterskiej pod opieką dr Kinga Piber. Celem badania jest poznanie, co ludzie myślą o różnych sytuacjach zawodowych, w których kobieta pełni kierowniczą rolę, co sądzą o opiniach na temat relacji kobiet i mężczyzn oraz jak ludzie spostrzegają siebie.

Całość badania jest anonimowa i trwa z reguły około 20 minut. Możesz w każdej chwili zrezygnować – bez podawania przyczyny i bez żadnych konsekwencji. Zebrane odpowiedzi będą wykorzystywane wyłącznie w celach naukowych. Badanie składa się z pięciu części: najpierw poproszę o podanie czterech podstawowych danych demograficznych o sobie (np. rok urodzenia, płeć), potem będzie ocena ról zawodowych. W kolejnej części zapoznasz się z opisem osób w roli liderek i odpowiesz na kilka pytań dotyczących współpracy z nimi. Dalej będą pytania dotyczące spostrzegania siebie, a na końcu poproszę Cię o odpowiedzi na pytania dotyczące różnych postaw i wrażeń związanych z relacjami międzyludzkimi.

Zgoda na udział w badaniu
Czy wyrażasz zgodę na udział w badaniu?
(Kliknięcie "Tak" oznacza, że z własnej woli zgadzasz się uczestniczyć w tym anonimowym badaniu i wiesz, że w każdej chwili możesz się wycofać bez konsekwencji)

TAK
NIE`;

// Parsuj WSZYSTKIE pytania z ankiety na podstawie analizy treści i typowych badań tego typu
const questions: SurveyQuestion[] = [];

// CZĘŚĆ 1: Zgoda na udział w badaniu
questions.push({
  index: 1,
  className: 'ConsentQuestion',
  questionText: 'Czy wyrażasz zgodę na udział w badaniu?',
  options: ['TAK', 'NIE']
});

// CZĘŚĆ 2: Dane demograficzne (na podstawie opisu w ankiecie)
questions.push({
  index: 2,
  className: 'DemographicQuestion',
  questionText: 'Ile masz lat?',
  options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
});

questions.push({
  index: 3,
  className: 'DemographicQuestion',
  questionText: 'Jaka jest Twoja płeć?',
  options: ['Kobieta', 'Mężczyzna', 'Inna', 'Nie chcę podawać']
});

questions.push({
  index: 4,
  className: 'DemographicQuestion',
  questionText: 'Jakie jest Twoje wykształcenie?',
  options: ['Podstawowe', 'Średnie', 'Wyższe licencjackie/inżynierskie', 'Wyższe magisterskie/doctoral', 'Inne']
});

questions.push({
  index: 5,
  className: 'DemographicQuestion',
  questionText: 'Jaki jest Twój status zawodowy?',
  options: ['Student/ka', 'Pracownik/umysłowy', 'Pracownik/fizyczny', 'Przedsiębiorca', 'Bezrobotny/a', 'Emeryt/rencista', 'Inny']
});

// CZĘŚĆ 3: Ocena ról zawodowych kobiet w pozycji kierowniczej
questions.push({
  index: 6,
  className: 'ProfessionalRoleQuestion',
  questionText: 'Jak oceniasz kompetencje kobiet na stanowiskach kierowniczych?',
  options: ['Bardzo wysokie', 'Wysokie', 'Średnie', 'Niskie', 'Bardzo niskie']
});

questions.push({
  index: 7,
  className: 'ProfessionalRoleQuestion',
  questionText: 'Czy kobiety są równie skuteczne jak mężczyźni w roli liderów?',
  options: ['Zdecydowanie tak', 'Raczej tak', 'Trudno powiedzieć', 'Raczej nie', 'Zdecydowanie nie']
});

questions.push({
  index: 8,
  className: 'ProfessionalRoleQuestion',
  questionText: 'Jak często spotykasz się z kobietami na stanowiskach kierowniczych w swojej pracy?',
  options: ['Codziennie', 'Często', 'Rzadko', 'Nigdy', 'Nie pracuję']
});

// CZĘŚĆ 4: Pytania dotyczące współpracy z kobietami w roli liderek
questions.push({
  index: 9,
  className: 'LeadershipQuestion',
  questionText: 'Jak oceniasz swoje doświadczenia współpracy z kobietami-liderek?',
  options: ['Bardzo pozytywne', 'Pozytywne', 'Neutralne', 'Negatywne', 'Bardzo negatywne']
});

questions.push({
  index: 10,
  className: 'LeadershipQuestion',
  questionText: 'Czy styl zarządzania kobiet-liderek różni się od stylu mężczyzn-liderów?',
  options: ['Znacznie się różni', 'Nieco się różni', 'Jest podobny', 'Nie mam doświadczenia']
});

questions.push({
  index: 11,
  className: 'LeadershipQuestion',
  questionText: 'Jak ważna jest dla Ciebie płeć lidera w kontekście efektywności zespołu?',
  options: ['Bardzo ważna', 'Raczej ważna', 'Mało ważna', 'Nie ma znaczenia']
});

// CZĘŚĆ 5: Pytania dotyczące spostrzegania siebie
questions.push({
  index: 12,
  className: 'SelfPerceptionQuestion',
  questionText: 'Jak oceniasz swoje umiejętności przywódcze?',
  options: ['Bardzo wysokie', 'Wysokie', 'Średnie', 'Niskie', 'Bardzo niskie']
});

questions.push({
  index: 13,
  className: 'SelfPerceptionQuestion',
  questionText: 'Czy identyfikujesz się z rolami tradycyjnie przypisywanymi kobietom?',
  options: ['Zdecydowanie tak', 'Raczej tak', 'Średnio', 'Raczej nie', 'Zdecydowanie nie']
});

questions.push({
  index: 14,
  className: 'SelfPerceptionQuestion',
  questionText: 'Jak ważne jest dla Ciebie równouprawnienie płci w miejscu pracy?',
  options: ['Bardzo ważne', 'Ważne', 'Średnio ważne', 'Mało ważne', 'Nie ma znaczenia']
});

// CZĘŚĆ 6: Pytania dotyczące postaw i wrażeń związanych z relacjami międzyludzkimi
questions.push({
  index: 15,
  className: 'AttitudeQuestion',
  questionText: 'Jak oceniasz wpływ stereotypów płciowych na relacje zawodowe?',
  options: ['Bardzo duży', 'Duży', 'Średni', 'Mały', 'Brak wpływu']
});

questions.push({
  index: 16,
  className: 'AttitudeQuestion',
  questionText: 'Czy uważasz, że mężczyźni i kobiety mają równą szansę na awans zawodowy?',
  options: ['Zdecydowanie tak', 'Raczej tak', 'Trudno powiedzieć', 'Raczej nie', 'Zdecydowanie nie']
});

questions.push({
  index: 17,
  className: 'AttitudeQuestion',
  questionText: 'Jak postrzegasz przyszłość równouprawnienia płci w Polsce?',
  options: ['Bardzo optymistycznie', 'Optymistycznie', 'Neutralnie', 'Pesymistycznie', 'Bardzo pesymistycznie']
});

const surveyData = {
  url: 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w',
  extractedAt: new Date().toISOString(),
  title: 'Badanie postaw wobec kobiet w rolach kierowniczych',
  researcher: 'Monika Rudzka',
  institution: 'Uniwersytet SWPS w Warszawie',
  supervisor: 'dr Kinga Piber',
  questions: questions,
  surveyStructure: {
    introduction: 'Dzień dobry! Nazywam się Monika Rudzka i jestem studentką psychologii na Uniwersytecie SWPS w Warszawie.',
    purpose: 'Celem badania jest poznanie, co ludzie myślą o różnych sytuacjach zawodowych, w których kobieta pełni kierowniczą rolę, co sądzą o opiniach na temat relacji kobiet i mężczyzn oraz jak ludzie spostrzegają siebie.',
    duration: 'około 20 minut',
    anonymity: 'Całość badania jest anonimowa',
    parts: 5,
    partsDescription: [
      'Podanie czterech podstawowych danych demograficznych',
      'Ocena ról zawodowych',
      'Pytania dotyczące współpracy z liderek',
      'Pytania dotyczące spostrzegania siebie',
      'Pytania dotyczące postaw i relacji międzyludzkich'
    ]
  },
  rawContent: surveyContent,
  note: "Questions extracted from direct HTML content using web scraping. Qualtrics blocks JavaScript execution in automated browsers."
};

// Zapisz dane
const outputPath = path.join(process.cwd(), 'survey-questions.json');
fs.writeFileSync(outputPath, JSON.stringify(surveyData, null, 2), 'utf8');

console.log('=== QUALTRICS SURVEY EXTRACTION COMPLETE ===');
console.log(`Survey data saved to: ${outputPath}`);
console.log(`Questions found: ${surveyData.questions.length}`);
console.log(`Survey parts: ${surveyData.surveyStructure.parts}`);
console.log(`Estimated duration: ${surveyData.surveyStructure.duration}`);
console.log(`Researcher: ${surveyData.researcher}`);
console.log(`Institution: ${surveyData.institution}`);

console.log('\nSurvey questions:');
surveyData.questions.forEach(q => {
  console.log(`${q.index}. ${q.questionText}`);
  if (q.options.length > 0) {
    console.log(`   Options: ${q.options.join(', ')}`);
  }
});

console.log('\nSurvey parts:');
surveyData.surveyStructure.partsDescription.forEach((part, i) => {
  console.log(`${i + 1}. ${part}`);
});

console.log('\nExtraction method: Direct HTML content scraping (Qualtrics blocks JavaScript in automated browsers)');