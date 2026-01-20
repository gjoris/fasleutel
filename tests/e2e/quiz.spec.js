import { test, expect } from '@playwright/test';

test.describe('Muzieknoten Quiz Volledige Functionaliteit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navigatie: Quiz stoppen gaat naar rapport, dan naar menu', async ({ page }) => {
    await page.click('#menu-screen button[data-mode="practice"][data-clef="g"]');
    await expect(page.locator('#quiz-screen')).not.toHaveClass(/hidden/);
    
    // 'Stoppen' in quiz gaat naar rapport
    await page.click('#back-to-menu');
    await expect(page.locator('#report-screen')).not.toHaveClass(/hidden/);

    // 'Terug naar menu' in rapport gaat naar menu
    await page.click('#report-to-menu');
    await expect(page.locator('#menu-screen')).not.toHaveClass(/hidden/);
  });

  test('Spelmodus: Time Attack (Timer check)', async ({ page }) => {
    await page.click('button[data-mode="time-attack"][data-clef="f"]');
    await expect(page.locator('#quiz-screen')).not.toHaveClass(/hidden/);
    await expect(page.locator('#timer')).toBeVisible();
  });

  test('Sleutels: F-sleutel en Beide sleutels', async ({ page }) => {
    await page.click('button[data-mode="practice"][data-clef="f"]');
    await expect(page.locator('#staff text')).toHaveText('𝄢');
    
    await page.click('#back-to-menu');
    await expect(page.locator('#report-screen')).not.toHaveClass(/hidden/);
    await page.click('#report-to-menu');
    await expect(page.locator('#menu-screen')).not.toHaveClass(/hidden/);

    await page.click('button[data-mode="practice"][data-clef="both"]');
    await expect(page.locator('#quiz-screen')).not.toHaveClass(/hidden/);
  });

  test('Flow: Fouten maken en resultaten bekijken', async ({ page }) => {
    await page.click('button[data-mode="sprint"][data-clef="g"]');

    for (let i = 0; i < 10; i++) {
        const btn = page.locator('#answer-buttons button').first();
        await btn.click();
        if (i < 9) await expect(btn).toBeEnabled({ timeout: 3000 });
    }

    await expect(page.locator('#report-screen')).not.toHaveClass(/hidden/, { timeout: 5000 });
    await expect(page.locator('#problem-notes')).toBeVisible();

    await page.click('#restart-game');
    await expect(page.locator('#quiz-screen')).not.toHaveClass(/hidden/);
  });

  test('Debug: Rapport direct laden', async ({ page }) => {
    await page.goto('/?debug=true');
    await page.click('#debug-report-button');
    await expect(page.locator('#report-screen')).not.toHaveClass(/hidden/);
    
    await page.click('#report-to-menu');
    await expect(page.locator('#menu-screen')).not.toHaveClass(/hidden/);
  });

  test('Taal: Persistentie over sessies', async ({ page }) => {
    await page.click('.dropdown-trigger button');
    await page.click('a[data-lang="fr"]');
    await expect(page.locator('#menu-screen h1')).toHaveText('Choisissez un mode');

    await page.reload();
    await expect(page.locator('#menu-screen h1')).toHaveText('Choisissez un mode');
  });

  test('Thema: Wisselen tussen licht en donker', async ({ page }) => {
    // Check initial state (default light)
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');

    // Click toggle
    await page.click('#theme-toggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Reload should persist
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Back to light
    await page.click('#theme-toggle');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  });
});
