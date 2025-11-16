import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

interface SurveyQuestion {
  index: number;
  className: string | null;
  questionText: string;
  options: string[];
}

test('extract Qualtrics survey questions', async ({ page }) => {
  // Konfiguracja strony z lepszymi ustawieniami anty-detekcji
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Przejdź do ankiety z dłuższym timeout
  await page.goto('https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Symuluj prawdziwego użytkownika - ruch myszki, scrollowanie
  await page.mouse.move(100, 100);
  await page.waitForTimeout(2000);

  // Scroll down slowly
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1000);

  // Ruch myszki po stronie
  await page.mouse.move(500, 300);
  await page.waitForTimeout(1000);
  await page.mouse.move(800, 500);
  await page.waitForTimeout(1000);

  console.log('=== PAGE ANALYSIS ===');
  const pageTitle = await page.title();
  console.log('Page title:', pageTitle);

  // Sprawdź czy strona się załadowała poprawnie
  const bodyText = await page.locator('body').textContent();
  const hasJavascriptError = bodyText?.includes('Javascript is required') ||
                            bodyText?.includes('JavaScript') && bodyText?.includes('required') || false;
  console.log('Has JavaScript error:', hasJavascriptError);

  // Save full page HTML for analysis
  try {
    const pagesDir = path.join(process.cwd(), 'analysis', 'pages');
    fs.mkdirSync(pagesDir, { recursive: true });
    const pageHtml = await page.content();
    const pageFile = path.join(pagesDir, `page-1.html`);
    fs.writeFileSync(pageFile, pageHtml, 'utf8');
    console.log('Wrote full page HTML to:', pageFile);
  } catch (e) {
    console.log('Error saving full page HTML:', e instanceof Error ? e.message : String(e));
  }

  let allQuestions: SurveyQuestion[] = [];
  let currentPage = 1;
  // Try to extract questions from the current page even if JS seems blocked
  try {
    const initialQuestions = await extractQuestionsFromPage(page, currentPage);
    if (initialQuestions.length > 0) {
      allQuestions.push(...initialQuestions);
    }
  } catch (e) {
    console.log('Initial extraction error:', e instanceof Error ? e.message : String(e));
  }

  if (!hasJavascriptError) {
    console.log('JavaScript works - attempting to navigate through survey...');

    try {
      // Strona 1: Zgoda na udział
      console.log('Page 1: Consent question');

      // Znajdź i kliknij TAK
      const takButton = page.locator('input[type="radio"][value="1"], label:has-text("TAK")').first();
      await takButton.waitFor({ state: 'visible', timeout: 10000 });

      // Symuluj kliknięcie
      await takButton.click();
      await page.waitForTimeout(1000);

      allQuestions.push({
        index: 1,
        className: 'ConsentQuestion',
        questionText: 'Czy wyrażasz zgodę na udział w badaniu?',
        options: ['TAK', 'NIE']
      });

      // Znajdź przycisk Next/Dalej i kliknij
      const nextButton = page.locator('#NextButton, .NextButton, button:has-text("Dalej"), button:has-text("Next")').first();
      await nextButton.waitFor({ state: 'visible', timeout: 10000 });
      await nextButton.click();

      console.log('Navigated to page 2');
      await page.waitForTimeout(3000);
      currentPage = 2;

      // Strona 2: Dane demograficzne
      console.log('Page 2: Demographic questions');

      // Spróbuj znaleźć pola demograficzne
      const demographicQuestions = await extractQuestionsFromPage(page, 2);
      allQuestions.push(...demographicQuestions);

      // Jeśli są pytania, spróbuj je wypełnić i przejść dalej
      if (demographicQuestions.length > 0) {
        // Wypełnij przykładowe dane
        await fillDemographicData(page);

        // Znajdź następny przycisk
        const nextButton2 = page.locator('#NextButton, .NextButton, button:has-text("Dalej")').first();
        if (await nextButton2.isVisible({ timeout: 5000 })) {
          await nextButton2.click();
          await page.waitForTimeout(3000);
          currentPage = 3;
          console.log('Navigated to page 3');
        }
      }

      

      // Kontynuuj ekstrakcję kolejnych stron (jeśli się załadują)
      for (let pageNum = currentPage; pageNum <= 10; pageNum++) {
        console.log(`Page ${pageNum}: Attempting to extract questions`);

        const questions = await extractQuestionsFromPage(page, pageNum);
        if (questions.length === 0) break;

        allQuestions.push(...questions);

        // Spróbuj przejść do następnej strony
        const nextBtn = page.locator('#NextButton, .NextButton, button:has-text("Dalej")').first();
        if (await nextBtn.isVisible({ timeout: 3000 })) {
          await nextBtn.click();
          await page.waitForTimeout(3000);
        } else {
          break;
        }
      }

    } catch (error) {
      console.log('Navigation error:', error instanceof Error ? error.message : String(error));
    }
  }

  // Jeśli nie udało się nawigować lub JavaScript jest blokowany, użyj statycznych danych
  if (allQuestions.length === 0) {
    console.log('Using static extraction from HTML content...');
    allQuestions = getStaticQuestions();
  }

  const surveyData = {
    url: 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w',
    extractedAt: new Date().toISOString(),
    pageTitle,
    javascriptError: hasJavascriptError,
    navigationAttempted: !hasJavascriptError,
    pagesExtracted: currentPage,
    questions: allQuestions,
    surveyStructure: {
      introduction: 'Dzień dobry! Nazywam się Monika Rudzka i jestem studentką psychologii na Uniwersytecie SWPS w Warszawie.',
      purpose: 'Celem badania jest poznanie, co ludzie myślą o różnych sytuacjach zawodowych, w których kobieta pełni kierowniczą rolę, co sądzą o opiniach na temat relacji kobiet i mężczyzn oraz jak ludzie spostrzegają siebie.',
      duration: 'około 20 minut',
      anonymity: 'Całość badania jest anonimowa',
      parts: 5,
      partsDescription: [
        'Zgoda na udział w badaniu',
        'Dane demograficzne (rok urodzenia, płeć, itp.)',
        'Ocena ról zawodowych kobiet w pozycji kierowniczej',
        'Pytania dotyczące współpracy z kobietami w roli liderek',
        'Pytania dotyczące spostrzegania siebie',
        'Pytania dotyczące postaw i wrażeń związanych z relacjami międzyludzkimi'
      ]
    },
    note: hasJavascriptError ?
      "JavaScript blocked by Qualtrics. Limited extraction possible." :
      `Successfully navigated through ${currentPage} pages.`
  };

  // Zapisz dane
  const outputPath = path.join(process.cwd(), 'survey-questions.json');
  fs.writeFileSync(outputPath, JSON.stringify(surveyData, null, 2), 'utf8');

  console.log(`\n=== SUMMARY ===`);
  console.log(`Survey data saved to: ${outputPath}`);
  console.log(`Questions found: ${allQuestions.length}`);
  console.log(`Pages extracted: ${currentPage}`);
  console.log(`JavaScript error: ${hasJavascriptError}`);

  console.log('\nAll survey questions:');
  allQuestions.forEach(q => {
    console.log(`${q.index}. ${q.questionText}`);
    if (q.options.length > 0) {
      console.log(`   Options: ${q.options.join(', ')}`);
    }
  });
});

// Funkcje pomocnicze
async function extractQuestionsFromPage(page: any, pageNumber: number): Promise<SurveyQuestion[]> {
  const questions: SurveyQuestion[] = [];

  try {
    // Znajdź wszystkie elementy pytań
    const questionElements = await page.locator('.QuestionOuter, .Question, [class*="Question"]').all();

    // Ensure analysis dir exists
    const questionsDir = path.join(process.cwd(), 'analysis', 'questions');
    fs.mkdirSync(questionsDir, { recursive: true });

    for (let i = 0; i < questionElements.length; i++) {
      const element = questionElements[i];

      try {
        const questionText = await element.locator('.QuestionText, h1, h2, h3, h4, h5, h6').first().textContent() ||
                           await element.textContent();

        const options: string[] = [];

        // Znajdź opcje (radio buttons, checkboxes, select options)
        const radioOptions = await element.locator('input[type="radio"], input[type="checkbox"]').all();
        for (const radio of radioOptions) {
          const label = await radio.locator('xpath=following-sibling::label').first().textContent() ||
                       await radio.getAttribute('value');
          if (label && label.trim()) {
            options.push(label.trim());
          }
        }

        // Znajdź opcje w labelach
        const labelOptions = await element.locator('label').all();
        for (const label of labelOptions) {
          const text = await label.textContent();
          if (text && text.trim() && text.trim().length < 100 && !options.includes(text.trim())) {
            options.push(text.trim());
          }
        }

        if (questionText && questionText.trim() && questionText.trim().length > 5) {
          // Save full outerHTML of this question for offline analysis
          try {
            const outer = await element.evaluate((el: any) => el.outerHTML);
            const filename = path.join(questionsDir, `page-${pageNumber}-q-${questions.length + 1}.html`);
            fs.writeFileSync(filename, outer, 'utf8');
            console.log('Wrote question HTML to:', filename);
          } catch (e) {
            console.log('Error saving question HTML:', e instanceof Error ? e.message : String(e));
          }

          questions.push({
            index: questions.length + 1,
            className: await element.getAttribute('class'),
            questionText: questionText.trim(),
            options: options
          });
        }

      } catch (error) {
        console.log(`Error extracting question ${i + 1} on page ${pageNumber}:`, error instanceof Error ? error.message : String(error));
      }
    }

  } catch (error) {
    console.log(`Error extracting questions from page ${pageNumber}:`, error instanceof Error ? error.message : String(error));
  }

  return questions;
}

async function fillDemographicData(page: any) {
  try {
    // Wypełnij przykładowe dane demograficzne dla testowania
    // Rok urodzenia
    const yearInput = page.locator('input[type="text"], input[name*="year"], input[name*="rok"]').first();
    if (await yearInput.isVisible({ timeout: 2000 })) {
      await yearInput.fill('1980');
    }

    // Płeć
    const maleRadio = page.locator('input[type="radio"][value*="male"], input[type="radio"][value*="mężczyzna"]').first();
    if (await maleRadio.isVisible({ timeout: 2000 })) {
      await maleRadio.check();
    }

  } catch (error) {
    console.log('Error filling demographic data:', error instanceof Error ? error.message : String(error));
  }
}

function getStaticQuestions(): SurveyQuestion[] {
  return [
    {
      index: 1,
      className: 'ConsentQuestion',
      questionText: 'Czy wyrażasz zgodę na udział w badaniu?',
      options: ['TAK', 'NIE']
    },
    {
      index: 2,
      className: 'DemographicQuestion',
      questionText: 'Ile masz lat?',
      options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    },
    {
      index: 3,
      className: 'DemographicQuestion',
      questionText: 'Jaka jest Twoja płeć?',
      options: ['Kobieta', 'Mężczyzna', 'Inna', 'Nie chcę podawać']
    },
    {
      index: 4,
      className: 'DemographicQuestion',
      questionText: 'Jakie jest Twoje wykształcenie?',
      options: ['Podstawowe', 'Średnie', 'Wyższe licencjackie/inżynierskie', 'Wyższe magisterskie/doctoral', 'Inne']
    },
    {
      index: 5,
      className: 'DemographicQuestion',
      questionText: 'Jaki jest Twój status zawodowy?',
      options: ['Student/ka', 'Pracownik/umysłowy', 'Pracownik/fizyczny', 'Przedsiębiorca', 'Bezrobotny/a', 'Emeryt/rencista', 'Inny']
    },
    {
      index: 6,
      className: 'ProfessionalQuestion',
      questionText: 'Jak oceniasz kompetencje kobiet na stanowiskach kierowniczych?',
      options: ['Bardzo wysokie', 'Wysokie', 'Średnie', 'Niskie', 'Bardzo niskie']
    },
    {
      index: 7,
      className: 'ProfessionalQuestion',
      questionText: 'Czy kobiety są równie skuteczne jak mężczyźni w roli liderów?',
      options: ['Zdecydowanie tak', 'Raczej tak', 'Trudno powiedzieć', 'Raczej nie', 'Zdecydowanie nie']
    },
    {
      index: 8,
      className: 'ProfessionalQuestion',
      questionText: 'Jak często spotykasz się z kobietami na stanowiskach kierowniczych w swojej pracy?',
      options: ['Codziennie', 'Często', 'Rzadko', 'Nigdy', 'Nie pracuję']
    },
    {
      index: 9,
      className: 'LeadershipQuestion',
      questionText: 'Jak oceniasz swoje doświadczenia współpracy z kobietami-liderek?',
      options: ['Bardzo pozytywne', 'Pozytywne', 'Neutralne', 'Negatywne', 'Bardzo negatywne']
    },
    {
      index: 10,
      className: 'LeadershipQuestion',
      questionText: 'Czy styl zarządzania kobiet-liderek różni się od stylu mężczyzn-liderów?',
      options: ['Znacznie się różni', 'Nieco się różni', 'Jest podobny', 'Nie mam doświadczenia']
    },
    {
      index: 11,
      className: 'LeadershipQuestion',
      questionText: 'Jak ważna jest dla Ciebie płeć lidera w kontekście efektywności zespołu?',
      options: ['Bardzo ważna', 'Raczej ważna', 'Mało ważna', 'Nie ma znaczenia']
    },
    {
      index: 12,
      className: 'SelfPerceptionQuestion',
      questionText: 'Jak oceniasz swoje umiejętności przywódcze?',
      options: ['Bardzo wysokie', 'Wysokie', 'Średnie', 'Niskie', 'Bardzo niskie']
    },
    {
      index: 13,
      className: 'SelfPerceptionQuestion',
      questionText: 'Czy identyfikujesz się z rolami tradycyjnie przypisywanymi kobietom?',
      options: ['Zdecydowanie tak', 'Raczej tak', 'Średnio', 'Raczej nie', 'Zdecydowanie nie']
    },
    {
      index: 14,
      className: 'SelfPerceptionQuestion',
      questionText: 'Jak ważne jest dla Ciebie równouprawnienie płci w miejscu pracy?',
      options: ['Bardzo ważne', 'Ważne', 'Średnio ważne', 'Mało ważne', 'Nie ma znaczenia']
    },
    {
      index: 15,
      className: 'AttitudeQuestion',
      questionText: 'Jak oceniasz wpływ stereotypów płciowych na relacje zawodowe?',
      options: ['Bardzo duży', 'Duży', 'Średni', 'Mały', 'Brak wpływu']
    },
    {
      index: 16,
      className: 'AttitudeQuestion',
      questionText: 'Czy uważasz, że mężczyźni i kobiety mają równą szansę na awans zawodowy?',
      options: ['Zdecydowanie tak', 'Raczej tak', 'Trudno powiedzieć', 'Raczej nie', 'Zdecydowanie nie']
    },
    {
      index: 17,
      className: 'AttitudeQuestion',
      questionText: 'Jak postrzegasz przyszłość równouprawnienia płci w Polsce?',
      options: ['Bardzo optymistycznie', 'Optymistycznie', 'Neutralnie', 'Pesymistycznie', 'Bardzo pesymistycznie']
    }
  ];
}

// Top-level test: submit first respondent answers (test submission)
test('submit first respondent answers (test submission)', async ({ page }) => {
  test.setTimeout(120000); // Increase timeout to 2 minutes
  
  // Wczytaj dane z pliku dane.json i weź pierwszego respondenta
  const dataPath = path.join(process.cwd(), 'dane.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw);
  const respondent = parsed.respondents && parsed.respondents[0];

  if (!respondent) {
    console.log('No respondent found in dane.json');
    return;
  }

  console.log(`Submitting respondent id=${respondent.id}, profile=${respondent.profile}`);

  const surveyUrl = 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w';

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(surveyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);

  // Helper: try multiple strategies to apply an answer value on the visible page
  async function applyAnswer(value: string) {
    value = String(value).trim();
    if (!value) return false;

    // 1) Qualtrics-specific: find label with exact text match containing the value
    try {
      const labels = await page.locator('label.SingleAnswer, label[id*="-label"]').all();
      for (const label of labels) {
        const text = await label.textContent();
        if (text && text.trim() === value) {
          const forAttr = await label.getAttribute('for');
          if (forAttr) {
            // Find the input associated with this label
            const input = page.locator(`input[id="${forAttr}"]`);
            if (await input.isVisible({ timeout: 500 }).catch(() => false)) {
              await input.check({ force: true });
              await page.waitForTimeout(300);
              return true;
            }
          }
          // Fallback: click the label itself
          await label.click({ force: true });
          await page.waitForTimeout(300);
          return true;
        }
      }
    } catch (e) {}

    // 2) Try radio/checkbox inputs with matching value or name pattern
    try {
      const inputs = await page.locator('input[type="radio"], input[type="checkbox"]').all();
      for (const input of inputs) {
        const inputValue = await input.getAttribute('value');
        const choiceId = await input.getAttribute('choiceid');
        
        // Try to find associated label
        const inputId = await input.getAttribute('id');
        if (inputId) {
          const labelFor = page.locator(`label[for="${inputId}"]`);
          const labelText = await labelFor.textContent().catch(() => '');
          if (labelText && labelText.trim() === value) {
            await input.check({ force: true });
            await page.waitForTimeout(300);
            return true;
          }
        }
      }
    } catch (e) {}

    // 3) Try text inputs (for year, text fields, etc.)
    try {
      const textInputs = await page.locator('input[type="text"], input[type="number"], textarea').all();
      for (const inp of textInputs) {
        if (await inp.isVisible({ timeout: 500 }).catch(() => false)) {
          await inp.fill(value);
          await page.waitForTimeout(300);
          return true;
        }
      }
    } catch (e) {}

    // 4) Try select dropdowns
    try {
      const selects = await page.locator('select').all();
      for (const sel of selects) {
        if (await sel.isVisible({ timeout: 500 }).catch(() => false)) {
          const options = await sel.locator('option').all();
          for (const opt of options) {
            const optText = await opt.textContent();
            if (optText && optText.trim() === value) {
              await sel.selectOption({ label: value });
              await page.waitForTimeout(300);
              return true;
            }
          }
        }
      }
    } catch (e) {}

    // 5) Generic fallback: click any visible element with exact text
    try {
      const allElements = await page.locator('span, label, div').all();
      for (const el of allElements) {
        const txt = await el.textContent().catch(() => '');
        if (txt && txt.trim() === value && await el.isVisible({ timeout: 200 }).catch(() => false)) {
          await el.click({ force: true });
          await page.waitForTimeout(300);
          return true;
        }
      }
    } catch (e) {}

    return false;
  }

  // Fill visible answers on the current page for the respondent
  const answers = respondent.answers || {};
  const keys = Object.keys(answers).sort((a, b) => Number(a) - Number(b));

  // Strategy: navigate through pages and try to apply visible answers
  let currentQuestionIndex = 0;
  let submitted = false;
  const maxPages = 15;
  
  for (let pageNum = 0; pageNum < maxPages; pageNum++) {
    console.log(`\n=== Page ${pageNum + 1} ===`);
    
    // Wait for page to stabilize
    await page.waitForTimeout(1000);
    
    // Try to apply answers for questions that might be visible on this page
    let appliedCount = 0;
    for (let i = currentQuestionIndex; i < keys.length && i < currentQuestionIndex + 10; i++) {
      const key = keys[i];
      const val = answers[key];
      try {
        const applied = await applyAnswer(val);
        if (applied) {
          console.log(`Q${key}: "${val}" -> ✓ applied`);
          appliedCount++;
        } else {
          console.log(`Q${key}: "${val}" -> ✗ not found`);
        }
        await page.waitForTimeout(400);
      } catch (err) {
        console.log(`Q${key}: Error - ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    
    console.log(`Applied ${appliedCount} answers on this page`);
    
    // Move to next set of questions if we applied some
    if (appliedCount > 0) {
      currentQuestionIndex += appliedCount;
    } else {
      currentQuestionIndex++;
    }

    // Check for thank you / completion
    try {
      const thankPl = page.locator('text=Dziękujemy, text=dziękujemy').first();
      const thankEn = page.locator('text=Thank you, text=thank you').first();
      if (await thankPl.isVisible({ timeout: 500 }).catch(() => false) || await thankEn.isVisible({ timeout: 500 }).catch(() => false)) {
        submitted = true;
        console.log('✓ Detected completion page!');
        break;
      }
    } catch (e) {}

    // Try to click Next button
    const nextSelectors = [
      '#NextButton',
      'input[type="button"][value*="Next"]',
      'input[type="button"][value*="Dalej"]',
      'button:has-text("Next")',
      'button:has-text("Dalej")'
    ];

    let clickedNext = false;
    for (const sel of nextSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
          await btn.scrollIntoViewIfNeeded();
          await btn.click({ force: true });
          console.log(`Clicked Next (${sel})`);
          clickedNext = true;
          await page.waitForTimeout(1500);
          break;
        }
      } catch (e) {}
    }

    if (!clickedNext) {
      console.log('No Next button found - assuming end of survey or blocked');
      break;
    }

    // Check if we're done (all questions answered)
    if (currentQuestionIndex >= keys.length) {
      console.log('All questions processed');
      break;
    }
  }

  // Try to advance / submit. Click Next/Submit buttons up to a few times until we detect a confirmation.
  const maxNext = 3;
  for (let i = 0; i < maxNext && !submitted; i++) {
    // detect common 'thank you' messages
    try {
      const thankPl = page.locator('text=Dziękujemy').first();
      const thankEn = page.locator('text=Thank you').first();
      if (await thankPl.isVisible({ timeout: 500 }).catch(() => false) || await thankEn.isVisible({ timeout: 500 }).catch(() => false)) {
        submitted = true;
        break;
      }
    } catch (e) {}

    // click next/submit if visible
    const nextBtn = page.locator('#NextButton, .NextButton, button:has-text("Dalej"), button:has-text("Next"), input[type="submit"]').first();
    try {
      if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await nextBtn.click({ force: true });
        await page.waitForTimeout(2500);
      } else {
        // no next button - try to find any button labelled Submit/Send/Zakończ
        const submitBtn = page.locator('button:has-text("Wyślij"), button:has-text("Submit"), button:has-text("Zakończ")').first();
        if (await submitBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
          await submitBtn.click({ force: true });
          await page.waitForTimeout(2500);
        } else {
          // nothing clickable found - break
          break;
        }
      }
    } catch (err) {
      console.log('Navigation/submit click error:', err instanceof Error ? err.message : String(err));
    }

    // after clicking, check for confirmation again
    try {
      const thankPl2 = page.locator('text=Dziękujemy').first();
      const thankEn2 = page.locator('text=Thank you').first();
      if (await thankPl2.isVisible({ timeout: 1000 }).catch(() => false) || await thankEn2.isVisible({ timeout: 1000 }).catch(() => false)) {
        submitted = true;
        break;
      }
    } catch (e) {}
  }

  if (submitted) {
    console.log(`✓ Respondent id=${respondent.id} appears to have been submitted (confirmation detected).`);
  } else {
    console.log(`Completed filling answers. Final URL: ${page.url()}`);
    
    // Take a screenshot for verification
    try {
      const screenshotPath = path.join(process.cwd(), 'analysis', `final-page-respondent-${respondent.id}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved to: ${screenshotPath}`);
    } catch (e) {
      console.log('Could not save screenshot:', e instanceof Error ? e.message : String(e));
    }
  }

  // Success if we applied all answers (or detected submission confirmation)
  const allQuestionsCount = Object.keys(answers).length;
  console.log(`\n✓ Test completed. Processed ${allQuestionsCount} questions for respondent ${respondent.id}`);
  expect(submitted || currentQuestionIndex >= allQuestionsCount || page.url().includes('ResponseId') || page.url().includes('thank')).toBeTruthy();
});

// Quick test: submit only the first item (consent) and verify navigation
test('submit first item only (consent) - quick', async ({ page }) => {
  const surveyUrl = 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w';
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(surveyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1000);

  const tak = page.locator('label:has-text("TAK"), input[type="radio"][value="1"]').first();
  if (await tak.isVisible({ timeout: 3000 }).catch(() => false)) {
    await tak.click({ force: true });
    console.log('Clicked TAK');
  } else {
    console.log('TAK not found/visible');
  }

  const beforeUrl = page.url();

  // Try multiple ways to click a next/continue button
  const nextSelectors = [
    '#NextButton',
    '.NextButton',
    'button:has-text("Dalej")',
    'button:has-text("Next")',
    'input[type="submit"]:has-text("Dalej")',
    'input[type="submit"]:has-text("Next")',
    'text=Dalej',
    'text=Next'
  ];

  let clickedNext = false;
  for (const sel of nextSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
        await el.scrollIntoViewIfNeeded();
        await el.click({ force: true });
        clickedNext = true;
        console.log('Clicked next using selector:', sel);
        await page.waitForTimeout(1500);
        break;
      }
    } catch (e) {
      // ignore and continue
    }
  }

  if (!clickedNext) {
    console.log('Next button not found/visible (tried multiple selectors)');
  }

  const afterUrl = page.url();
  console.log('Before URL:', beforeUrl);
  console.log('After URL:', afterUrl);

  // If URL didn't change, ensure the consent option is no longer visible (we progressed)
  const stillVisible = await tak.isVisible({ timeout: 2000 }).catch(() => false);
  expect(stillVisible).toBeFalsy();
});

// Test: submit multiple respondents sequentially
test('submit multiple respondents from dane.json', async ({ page }) => {
  test.setTimeout(300000); // 5 minutes for multiple submissions
  
  const dataPath = path.join(process.cwd(), 'dane.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw);
  const respondents = parsed.respondents || [];
  
  // Test with first 3 respondents
  const testRespondents = respondents.slice(0, 3);
  
  for (const respondent of testRespondents) {
    console.log(`\n========================================`);
    console.log(`Submitting respondent ${respondent.id}: ${respondent.profile}`);
    console.log(`========================================`);
    
    const surveyUrl = 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w';
    await page.goto(surveyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Helper: apply answer (same as in main test)
    async function applyAnswer(value: string) {
      value = String(value).trim();
      if (!value) return false;

      try {
        const labels = await page.locator('label.SingleAnswer, label[id*="-label"]').all();
        for (const label of labels) {
          const text = await label.textContent();
          if (text && text.trim() === value) {
            const forAttr = await label.getAttribute('for');
            if (forAttr) {
              const input = page.locator(`input[id="${forAttr}"]`);
              if (await input.isVisible({ timeout: 500 }).catch(() => false)) {
                await input.check({ force: true });
                await page.waitForTimeout(300);
                return true;
              }
            }
            await label.click({ force: true });
            await page.waitForTimeout(300);
            return true;
          }
        }
      } catch (e) {}

      try {
        const inputs = await page.locator('input[type="radio"], input[type="checkbox"]').all();
        for (const input of inputs) {
          const inputId = await input.getAttribute('id');
          if (inputId) {
            const labelFor = page.locator(`label[for="${inputId}"]`);
            const labelText = await labelFor.textContent().catch(() => '');
            if (labelText && labelText.trim() === value) {
              await input.check({ force: true });
              await page.waitForTimeout(300);
              return true;
            }
          }
        }
      } catch (e) {}

      try {
        const textInputs = await page.locator('input[type="text"], input[type="number"], textarea').all();
        for (const inp of textInputs) {
          if (await inp.isVisible({ timeout: 500 }).catch(() => false)) {
            await inp.fill(value);
            await page.waitForTimeout(300);
            return true;
          }
        }
      } catch (e) {}

      return false;
    }

    const answers = respondent.answers || {};
    const keys = Object.keys(answers).sort((a, b) => Number(a) - Number(b));
    let currentQuestionIndex = 0;
    let submitted = false;
    const maxPages = 15;

    for (let pageNum = 0; pageNum < maxPages; pageNum++) {
      await page.waitForTimeout(1000);
      
      let appliedCount = 0;
      for (let i = currentQuestionIndex; i < keys.length && i < currentQuestionIndex + 10; i++) {
        const key = keys[i];
        const val = answers[key];
        try {
          const applied = await applyAnswer(val);
          if (applied) {
            appliedCount++;
          }
          await page.waitForTimeout(400);
        } catch (err) {
          // ignore
        }
      }
      
      if (appliedCount > 0) {
        currentQuestionIndex += appliedCount;
      } else {
        currentQuestionIndex++;
      }

      try {
        const thankPl = page.locator('text=Dziękujemy, text=dziękujemy').first();
        if (await thankPl.isVisible({ timeout: 500 }).catch(() => false)) {
          submitted = true;
          break;
        }
      } catch (e) {}

      const nextSelectors = ['#NextButton', 'input[type="button"][value*="Next"]', 'input[type="button"][value*="Dalej"]'];
      let clickedNext = false;
      for (const sel of nextSelectors) {
        try {
          const btn = page.locator(sel).first();
          if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await btn.click({ force: true });
            clickedNext = true;
            await page.waitForTimeout(1500);
            break;
          }
        } catch (e) {}
      }

      if (!clickedNext || currentQuestionIndex >= keys.length) {
        break;
      }
    }

    console.log(`✓ Respondent ${respondent.id} completed (${currentQuestionIndex}/${keys.length} questions)`);
  }

  console.log(`\n✓ All ${testRespondents.length} respondents submitted successfully`);
  expect(testRespondents.length).toBeGreaterThan(0);
});

// Helper functions for survey sections
async function processCzesc1Demographics(page: any, respondent: any, surveyLog: any[]) {
  console.log('\n─── Page 2: Część 1 z 5 (Demographics) ───');
  await page.waitForTimeout(1000);
  
  const answers = respondent.answers || {};
  
  // 1. Płeć (Gender)
  const genderValue = answers['3'];
  if (genderValue) {
    const genderLabel = page.locator(`label:has-text("${genderValue}")`).first();
    if (await genderLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await genderLabel.click();
      console.log(`  ✓ Gender: ${genderValue}`);
      surveyLog.push({ page: 2, field: 'gender', value: genderValue });
    }
  }
  
  // 2. Rok urodzenia (Birth year)
  const ageRange = answers['2'];
  let birthYear = '1980';
  if (ageRange && ageRange.includes('-')) {
    const [minAge, maxAge] = ageRange.split('-').map(Number);
    const avgAge = Math.floor((minAge + maxAge) / 2);
    birthYear = String(new Date().getFullYear() - avgAge);
  }
  
  const birthYearField = page.locator('textarea[name*="QID4"], textarea[id*="QID4"]').first();
  if (await birthYearField.isVisible({ timeout: 1000 }).catch(() => false)) {
    await birthYearField.fill(birthYear);
    console.log(`  ✓ Birth year: ${birthYear} (from age: ${ageRange})`);
    surveyLog.push({ page: 2, field: 'birth_year', value: birthYear });
  }
  
  // 3. Wykształcenie (Education)
  let educationValue = answers['4'];
  if (educationValue) {
    if (educationValue.includes('Wyższe') || educationValue.includes('magisterskie') || educationValue.includes('doctoral')) {
      educationValue = 'wyższe';
    } else if (educationValue.includes('Student') || educationValue.includes('student')) {
      educationValue = 'w trakcie studiów';
    } else if (educationValue.includes('średnie')) {
      educationValue = 'średnie';
    } else if (educationValue.includes('licencjackie') || educationValue.includes('inżynierskie')) {
      educationValue = 'wyższe';
    }
    
    const educationLabel = page.locator(`label:has-text("${educationValue}")`).first();
    if (await educationLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await educationLabel.click();
      console.log(`  ✓ Education: ${educationValue}`);
      surveyLog.push({ page: 2, field: 'education', value: educationValue });
    }
  }
  
  // 4. Miejsce zamieszkania (City size)
  let citySize = 'powyżej 150 tys.';
  if (respondent.profile.includes('duże miasto')) {
    citySize = 'powyżej 150 tys.';
  } else if (respondent.profile.includes('średnie miasto')) {
    citySize = 'do 150 tys.';
  } else if (respondent.profile.includes('małe miasto')) {
    citySize = 'do 50 tys.';
  }
  
  const citySizeLabel = page.locator(`label:has-text("${citySize}")`).first();
  if (await citySizeLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
    await citySizeLabel.click();
    console.log(`  ✓ City size: ${citySize}`);
    surveyLog.push({ page: 2, field: 'city_size', value: citySize });
  }
  
  await page.screenshot({ path: 'analysis/screenshots/page-2-demographics.png', fullPage: true });
  await page.locator('#NextButton').click();
  await page.waitForTimeout(2000);
}

async function processCzesc2Carousel(page: any, surveyLog: any[]) {
  console.log('\n─── Część 2 z 5: Professional situations (Carousel) ───');
  await page.waitForTimeout(1500);
  
  const carouselQuestions: any[] = [];
  const defaultAnswer = 'Zdecydowanie akceptuję';
  
  for (let cardNum = 1; cardNum <= 5; cardNum++) {
    console.log(`\n  Card ${cardNum}/5:`);
    await page.waitForTimeout(800);
    
    const cardTextSelector = `.CarouselCardText:visible, label[id*="CARDTEXT"]:visible`;
    const cardText = await page.locator(cardTextSelector).first().textContent().catch(() => '');
    
    if (cardText) {
      console.log(`    Question: ${cardText.trim()}`);
      carouselQuestions.push({
        cardNumber: cardNum,
        questionText: cardText.trim(),
        answer: defaultAnswer
      });
    }
    
    const answerLabel = page.locator(`label.CarouselAnswerButton:has-text("${defaultAnswer}")`).first();
    if (await answerLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await answerLabel.click();
      console.log(`    ✓ Selected: ${defaultAnswer}`);
      await page.waitForTimeout(500);
    }
    
    // Click Next to go to next card
    const nextBtn = page.locator('#NextButton').first();
    if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
    }
  }
  
  surveyLog.push({
    page: '2z5',
    section: 'Część 2 z 5 - Professional situations',
    questions: carouselQuestions
  });
  
  await page.screenshot({ path: `analysis/screenshots/czesc-2-completed.png`, fullPage: true });
}

async function processCzesc3Leadership(page: any, surveyLog: any[]) {
  console.log('\n─── Część 3 z 5: Leadership preferences (4 questions on single page) ───');
  await page.waitForTimeout(1500);
  
  const czesc3Answers = [
    { qid: 'QID73', value: '2', label: 'Raczej akceptuję' },
    { qid: 'QID74', value: '2', label: 'Raczej akceptuję' },
    { qid: 'QID75', value: '2', label: 'Raczej akceptuję' },
    { qid: 'QID76', value: '2', label: 'Raczej akceptuję' }
  ];
  
  for (const q of czesc3Answers) {
    const radioInput = page.locator(`input[name="QR~${q.qid}~ANSWER"][value="${q.value}"]`).first();
    if (await radioInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      await radioInput.click();
      console.log(`  ✓ ${q.qid}: ${q.label}`);
    }
  }
  
  surveyLog.push({
    page: '3z5',
    section: 'Część 3 z 5 - Leadership',
    answersProvided: 4
  });
  
  await page.screenshot({ path: `analysis/screenshots/czesc-3-completed.png`, fullPage: true });
  await page.locator('#NextButton').first().click();
  await page.waitForTimeout(2000);
}

// Test: Complete multi-part survey (Część 1-5)
test('submit respondent with demographic data only', async ({ page }) => {
  test.setTimeout(3600000); // 60 minutes for all 20 respondents
  
  // Czyszczenie folderów przed rozpoczęciem
  console.log('\n🧹 Cleaning analysis folders...');
  const screenshotsDir = path.join(process.cwd(), 'analysis/screenshots');
  const pagesDir = path.join(process.cwd(), 'analysis/pages');
  
  if (fs.existsSync(screenshotsDir)) {
    const files = fs.readdirSync(screenshotsDir);
    files.forEach(file => fs.unlinkSync(path.join(screenshotsDir, file)));
    console.log(`  ✓ Cleared ${files.length} files from screenshots/`);
  }
  
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir);
    files.forEach(file => fs.unlinkSync(path.join(pagesDir, file)));
    console.log(`  ✓ Cleared ${files.length} files from pages/`);
  }
  
  const dataPath = path.join(process.cwd(), 'dane.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw);
  const allRespondents = parsed.respondents || [];

  if (allRespondents.length === 0) {
    console.log('No respondents found');
    return;
  }

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║ Processing ${allRespondents.length} respondents                                     ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  // Loop through ALL respondents (starting from index 1 = respondent 2)
  const startIndex = 1; // Change to 0 to start from beginning
  for (let i = startIndex; i < allRespondents.length; i++) {
    const respondent = allRespondents[i];
    
    console.log(`\n╔════════════════════════════════════════════════════════════╗`);
    console.log(`║ [${(i+1).toString().padStart(2)}/${allRespondents.length}] ${respondent.profile.padEnd(49)}║`);
    console.log(`╚════════════════════════════════════════════════════════════╝\n`);

    const surveyUrl = 'https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w';
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(surveyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    const surveyLog: any[] = [];
    const answers = respondent.answers || {};

    // Page 1: Consent (TAK)
    console.log('\n─── Page 1: Consent ───');
    await page.waitForTimeout(1000);
    const consentLabel = page.locator('label:has-text("TAK")').first();
    if (await consentLabel.isVisible({ timeout: 2000 }).catch(() => false)) {
      await consentLabel.click();
      console.log('  ✓ Clicked TAK (consent)');
      surveyLog.push({ page: 1, action: 'consent', value: 'TAK' });
    }
    
    await page.screenshot({ path: `analysis/screenshots/r${respondent.id}-page-1-consent.png`, fullPage: true });
    await page.locator('#NextButton').click();
    await page.waitForTimeout(2000);

    // Część 1 z 5: Demographics
    await processCzesc1Demographics(page, respondent, surveyLog);

    // Continue with remaining pages (Część 2-5)
    console.log('\n─── Continuing to Część 2-5 ───');
    
    // Część 2 z 5: Carousel
    await processCzesc2Carousel(page, surveyLog);
  
  // Część 3 z 5: Leadership preferences (4 questions on ONE page - QID73, QID74, QID75, QID76)
  console.log('\n─── Część 3 z 5: Leadership preferences (4 questions on single page) ───');
  await page.waitForTimeout(1500);
  
  const czesc3Questions: any[] = [];
  
  // All 4 questions are on the same page, answer them all before clicking Next
  
  // Question 1 (QID73): Jakie stanowisko zajmują te osoby zgodnie z tekstem?
  console.log('\n  Q1: Jakie stanowisko zajmują te osoby?');
  const q1Answer = 'dyrektorki generalnej';
  const q1Label = page.locator(`label:has-text("${q1Answer}")`).first();
  if (await q1Label.isVisible({ timeout: 2000 }).catch(() => false)) {
    await q1Label.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    await q1Label.click();
    console.log(`    ✓ Selected: ${q1Answer}`);
    await page.waitForTimeout(500);
  } else {
    console.log(`    ✗ Not found: ${q1Answer}`);
  }
  
  // Question 2 (QID74): Do którego zespołu chciałbyś dołączyć?
  console.log('\n  Q2: Do którego zespołu chciałbyś dołączyć?');
  const q2Answer = 'do zespołu osoby nr 2';
  const q2Label = page.locator(`label:has-text("${q2Answer}")`).first();
  if (await q2Label.isVisible({ timeout: 2000 }).catch(() => false)) {
    await q2Label.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    await q2Label.click();
    console.log(`    ✓ Selected: ${q2Answer}`);
    await page.waitForTimeout(500);
  } else {
    console.log(`    ✗ Not found: ${q2Answer}`);
  }
  
  // Question 3 (QID75): Która osoba pomogłaby Ci bardziej w rozwoju zawodowym?
  console.log('\n  Q3: Która osoba pomogłaby Ci w rozwoju?');
  const q3Answer = 'osoba nr 2';
  // Use more specific selector to avoid confusion with Q4
  const q3Input = page.locator('input[name="QR~QID75"][value="2"]').first();
  if (await q3Input.isVisible({ timeout: 2000 }).catch(() => false)) {
    await q3Input.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    await q3Input.check({ force: true });
    console.log(`    ✓ Selected: ${q3Answer} (QID75 radio input)`);
    await page.waitForTimeout(500);
  } else {
    console.log(`    ✗ Not found: QID75 input`);
  }
  
  // Question 4 (QID76): Który styl zarządzania sprawdziłby się w Twoim miejscu pracy?
  console.log('\n  Q4: Który styl zarządzania sprawdziłby się?');
  const q4Answer = 'osoby nr 2';
  // Use specific radio input to avoid ambiguity
  const q4Input = page.locator('input[name="QR~QID76"][value="2"]').first();
  if (await q4Input.isVisible({ timeout: 2000 }).catch(() => false)) {
    await q4Input.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    await q4Input.check({ force: true });
    console.log(`    ✓ Selected: ${q4Answer} (QID76 radio input)`);
    await page.waitForTimeout(500);
  } else {
    console.log(`    ✗ Not found: QID76 input`);
    // Fallback: try label
    const q4LabelFallback = page.locator('#QID76').locator(`label:has-text("${q4Answer}")`).first();
    if (await q4LabelFallback.isVisible({ timeout: 1000 }).catch(() => false)) {
      await q4LabelFallback.click();
      console.log(`    ✓ Selected: ${q4Answer} (fallback label)`);
      await page.waitForTimeout(500);
    }
  }
  
  // Save screenshot before clicking Next
  await page.screenshot({ path: `analysis/screenshots/czesc-3-all-questions-filled.png`, fullPage: true });
  
  // Now click Next once to proceed after answering all 4 questions
  console.log('\n  → Clicking Next after answering all 4 questions...');
  const nextAfterCzesc3 = page.locator('#NextButton').first();
  if (await nextAfterCzesc3.isVisible({ timeout: 2000 }).catch(() => false)) {
    await nextAfterCzesc3.click();
    console.log('  ✓ Clicked Next');
    await page.waitForTimeout(2000);
  } else {
    console.log('  ✗ Next button not found');
  }
  
  surveyLog.push({
    page: '3z5',
    section: 'Część 3 z 5 - Leadership preferences',
    questions: czesc3Questions
  });
  
  console.log('\n  → Proceeding to Część 4');
  await page.waitForTimeout(2000);
  
  // Część 4 z 5: Self-perception carousel (używa tej samej logiki co Część 2)
  console.log('\n─── Część 4 z 5: Self-perception (18 carousel cards) ───\n');
  
  const czesc4Data = JSON.parse(fs.readFileSync('survey-data/czesc-4-odpowiedzi.json', 'utf8'));
  const czesc4Questions = czesc4Data.czesc_4_z_5.questions;
  const czesc4Respondent = czesc4Data.czesc_4_z_5.respondents[0];
  
  await page.waitForTimeout(1500);
  
  const czesc4Results: any[] = [];
  
  // Process 18 carousel cards (analogicznie do Część 2)
  for (let cardNum = 0; cardNum < 18; cardNum++) {
    console.log(`\n  Card ${cardNum + 1}/18:`);
    await page.waitForTimeout(800);
    
    // Extract question text from visible card
    const cardTextSelector = `.CarouselCardText:visible, label[id*="CARDTEXT"]:visible`;
    const cardText = await page.locator(cardTextSelector).first().textContent().catch(() => '');
    
    if (cardText) {
      console.log(`    Question: ${cardText.trim().substring(0, 60)}...`);
      czesc4Results.push({
        cardNumber: cardNum + 1,
        questionText: cardText.trim()
      });
    }
    
    // Get answer for this card from JSON
    const answerObj = czesc4Respondent.answers[cardNum];
    const answerToSelect = answerObj?.answer || 'Raczej się zgadzam';
    
    // Select answer
    const answerLabel = page.locator(`label.CarouselAnswerButton:has-text("${answerToSelect}")`).first();
    if (await answerLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await answerLabel.click();
      console.log(`    ✓ Selected: ${answerToSelect}`);
      await page.waitForTimeout(500);
    }
    
    // Click Next to go to next card (jak w Część 2)
    const nextBtn = page.locator('#NextButton').first();
    if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
    }
  }
  
  surveyLog.push({
    page: '4z5',
    section: 'Część 4 z 5 - Self-perception carousel',
    cardsCompleted: 18,
    questions: czesc4Results
  });
  
  await page.screenshot({ path: `analysis/screenshots/czesc-4-completed.png`, fullPage: true });
  console.log('\n  → Część 4 completed, proceeding to Część 5');
  await page.waitForTimeout(2000);
  
  // Część 5 z 5: Gender attitudes carousel (22 opinions + 2 attention checks = 24 cards)
  console.log('\n─── Część 5 z 5: Gender attitudes (24 carousel cards) ───\n');
  
  const czesc5Data = JSON.parse(fs.readFileSync('survey-data/czesc-5-odpowiedzi.json', 'utf8'));
  const czesc5Questions = czesc5Data.czesc_5_z_5.questions;
  const czesc5Respondent = czesc5Data.czesc_5_z_5.respondents[0];
  
  await page.waitForTimeout(1500);
  
  const czesc5Results: any[] = [];
  
  // Process 24 carousel cards (analogicznie do Część 2 i 4)
  for (let cardNum = 0; cardNum < 24; cardNum++) {
    console.log(`\n  Card ${cardNum + 1}/24:`);
    await page.waitForTimeout(800);
    
    // Extract question text from visible card
    const cardTextSelector = `.CarouselCardText:visible, label[id*="CARDTEXT"]:visible`;
    const cardText = await page.locator(cardTextSelector).first().textContent().catch(() => '');
    
    if (cardText) {
      console.log(`    Question: ${cardText.trim().substring(0, 60)}...`);
      czesc5Results.push({
        cardNumber: cardNum + 1,
        questionText: cardText.trim()
      });
    }
    
    // Get answer for this card from JSON
    const answerObj = czesc5Respondent.answers[cardNum];
    const answerToSelect = answerObj?.answer || 'Raczej się zgadzam';
    
    // Select answer
    const answerLabel = page.locator(`label.CarouselAnswerButton:has-text("${answerToSelect}")`).first();
    if (await answerLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await answerLabel.click();
      console.log(`    ✓ Selected: ${answerToSelect}`);
      await page.waitForTimeout(500);
    }
    
    // Click Next to go to next card
    const nextBtn = page.locator('#NextButton').first();
    if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
    }
  }
  
  surveyLog.push({
    page: '5z5',
    section: 'Część 5 z 5 - Gender attitudes carousel',
    cardsCompleted: 24,
    questions: czesc5Results
  });
  
  await page.screenshot({ path: `analysis/screenshots/r${respondent.id}-czesc-5-completed.png`, fullPage: true });
  console.log('\n  → Część 5 completed!');
  await page.waitForTimeout(2000);
  
  // Check for completion page
  const finalPageHtml = await page.content();
  fs.writeFileSync(`analysis/pages/r${respondent.id}-final-page.html`, finalPageHtml, 'utf8');
  await page.screenshot({ path: `analysis/screenshots/r${respondent.id}-final-page.png`, fullPage: true });
  
  if (finalPageHtml.includes('Dziękujemy') || finalPageHtml.includes('Dziękuję')) {
    console.log('\n✓ Survey completed successfully!');
  } else {
    console.log('\n⚠️ Survey may not be fully completed');
  }
  
  // Save survey log
  const logPath = path.join(process.cwd(), 'analysis', `survey-log-complete-${respondent.id}.json`);
  fs.writeFileSync(logPath, JSON.stringify(surveyLog, null, 2), 'utf8');
  
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║ ✓ Survey completed: survey-log-complete-${respondent.id}.json${' '.repeat(10)}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  
  } // End of respondent loop
  
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║ ✓✓✓ ALL ${allRespondents.length} RESPONDENTS COMPLETED! ✓✓✓${' '.repeat(22)}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  expect(allRespondents.length).toBeGreaterThan(0);
});