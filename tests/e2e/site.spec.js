import { test, expect } from '@playwright/test';

test.describe('navigation & content', () => {
  test('home renders the cover and the dark windows', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('The far point');
    await expect(page.locator('.moon-row')).toHaveCount(4);
    await expect(page.locator('#page-jsonld')).toHaveCount(1);
  });

  test('expeditions list, filters and detail', async ({ page }) => {
    await page.goto('/expeditions');
    await expect(page.locator('.exp-row')).toHaveCount(6);

    await page.click('button.filter:has-text("Aurora")');
    await expect(page).toHaveURL(/kind=aurora/);
    await expect(page.locator('.exp-row')).toHaveCount(2);

    await page.locator('.exp-row').first().click();
    await expect(page).toHaveURL(/\/expeditions\/lofoten-nights/);
    await expect(page.locator('.itin-row')).toHaveCount(6);
  });

  test('places rows link to expeditions or enquiry', async ({ page }) => {
    await page.goto('/places');
    await expect(page.locator('a.place-row')).toHaveCount(6);
    await page.locator('a.place-row', { hasText: 'Atacama' }).click();
    await expect(page).toHaveURL(/\/expeditions\/atacama/);
  });

  test('field notes open into the reading template', async ({ page }) => {
    await page.goto('/field-notes');
    await page.locator('.note-card').first().click();
    await expect(page).toHaveURL(/\/field-notes\//);
    await expect(page.locator('.article-body p').first()).toBeVisible();
    await expect(page.locator('.reading-progress')).toHaveCount(1);
  });

  test('the index page: one FAQ answer open, alphabetical index present', async ({ page }) => {
    await page.goto('/index');
    await expect(page.locator('.faq-a:visible')).toHaveCount(1);
    await page.locator('.faq-q').nth(3).click();
    await expect(page.locator('.faq-a:visible')).toHaveCount(1);
    await expect(page.locator('.index-group').first()).toBeVisible();
  });

  test('the system appendix and 404', async ({ page }) => {
    await page.goto('/system');
    await expect(page.locator('h1')).toContainText('house style');

    await page.goto('/definitely-missing');
    await expect(page.locator('h1')).toContainText('404');
  });
});

test.describe('enquiry form', () => {
  test('prefills from the expedition rail and submits', async ({ page }) => {
    await page.goto('/expeditions/namibrand');
    await page.click('text=Enquire about this expedition');
    await expect(page).toHaveURL(/enquire\?expedition=namibrand/);
    await expect(page.locator('#enq-expedition')).toHaveValue('NamibRand Dark Reserve');

    await page.fill('#enq-name', 'E2E Traveller');
    await page.fill('#enq-email', 'e2e@example.com');
    await page.click('button:has-text("Send enquiry")');
    await expect(page.locator('text=in the logbook')).toBeVisible();
  });

  test('client validation blocks empty submits', async ({ page }) => {
    await page.goto('/enquire');
    await page.click('button:has-text("Send enquiry")');
    await expect(page.locator('.field-error')).toHaveCount(2);
  });
});

test.describe('red-light mode', () => {
  test('toggles, persists across reload, toggles back', async ({ page }) => {
    await page.goto('/');
    await page.click('.nav-desktop .theme-toggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');

    await page.click('.nav-desktop .theme-toggle');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'night');
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('burger menu navigates and unlocks scroll', async ({ page }) => {
    await page.goto('/');
    await page.click('button.burger');
    await expect(page.locator('#mobile-menu')).toBeVisible();

    await page.click('#mobile-menu >> text=Places');
    await expect(page).toHaveURL(/\/places/);
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });
});
