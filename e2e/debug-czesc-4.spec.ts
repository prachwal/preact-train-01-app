import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.setTimeout(120000);

test('Debug Część 4 carousel', async ({ page }) => {
  // Load answer data
  const czesc4Data = JSON.parse(fs.readFileSync('survey-data/czesc-4-odpowiedzi.json', 'utf8'));
  const czesc4Questions = czesc4Data.czesc_4_z_5.questions;
  const czesc4Respondent = czesc4Data.czesc_4_z_5.respondents[0];

  console.log('\n=== Część 4 Debug Test ===\n');
  console.log(`Total questions in JSON: ${czesc4Questions.length}`);
  console.log(`Total answers for respondent: ${czesc4Respondent.answers.length}\n`);

  // Navigate directly to survey
  await page.goto('https://psychodpt.fra1.qualtrics.com/jfe/form/SV_dmAU3IDtntSWx7w');
  await page.waitForTimeout(3000);

  // Skip through to Część 4 (assuming we need to get there)
  // For now, let's check if we're already there or need navigation
  
  const carouselVisible = await page.locator('.CarouselCard').first().isVisible({ timeout: 5000 }).catch(() => false);
  
  if (!carouselVisible) {
    console.log('Carousel not visible - may need to navigate through earlier sections first');
    console.log('This test assumes you start at Część 4. Please run full test to reach it.');
    return;
  }

  console.log('✓ Carousel found - beginning Część 4 test\n');

  // Test first 3 cards only to see pattern
  for (let cardNum = 0; cardNum < 3; cardNum++) {
    console.log(`\n--- Card ${cardNum + 1}/18 ---`);
    
    await page.waitForTimeout(500);
    
    // Get visible card
    const visibleCard = page.locator('.CarouselCard:not(.NoDisplay)').first();
    const cardText = await visibleCard.locator('.CarouselCardText').textContent().catch(() => 'Not found');
    console.log(`Card text: ${cardText.trim()}`);
    
    // Check which choice ID this is
    const choiceId = await visibleCard.getAttribute('data-choiceid').catch(() => 'unknown');
    console.log(`Choice ID: ${choiceId}`);
    
    // Get answer to select
    const answerObj = czesc4Respondent.answers[cardNum];
    const answerToSelect = answerObj?.answer || 'Raczej się zgadzam';
    console.log(`Should select: ${answerToSelect}`);
    
    // Find and click answer button
    const answerLabel = page.locator(`label.CarouselAnswerButton`).filter({ hasText: answerToSelect }).first();
    const isVisible = await answerLabel.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (isVisible) {
      await answerLabel.click();
      console.log(`✓ Clicked answer`);
      await page.waitForTimeout(500);
      
      // Check if answer is selected (radio button state)
      const radioInput = page.locator(`input[name="QR~QID62~ANSWER"]:checked`);
      const selectedValue = await radioInput.getAttribute('value').catch(() => 'none');
      console.log(`Selected radio value: ${selectedValue}`);
      
      // Click right arrow to advance
      await page.waitForTimeout(300);
      const rightArrow = page.locator('.CarouselChevronContainer').last();
      const arrowVisible = await rightArrow.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (arrowVisible) {
        // Check if arrow is disabled
        const arrowSvg = rightArrow.locator('svg').first();
        const isDisabled = await arrowSvg.evaluate((el) => el.classList.contains('Disabled')).catch(() => false);
        console.log(`Right arrow disabled: ${isDisabled}`);
        
        if (!isDisabled) {
          await rightArrow.click();
          console.log(`✓ Clicked right arrow`);
          await page.waitForTimeout(1000);
        } else {
          console.log(`⚠ Arrow is disabled - cannot advance`);
        }
      } else {
        console.log(`⚠ Right arrow not visible`);
      }
    } else {
      console.log(`✗ Answer button not visible`);
    }
  }
  
  console.log('\n\n=== Debug Test Complete ===\n');
  
  // Take screenshot
  await page.screenshot({ path: 'analysis/screenshots/debug-czesc-4.png', fullPage: true });
});
