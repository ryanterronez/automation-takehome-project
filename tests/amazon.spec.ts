import { test } from '@playwright/test';
import { ECommercePage } from '../pages/ecommerce-page';
import Item from '../models/item.model';

const searchTerms: string[] = ['laptop', 'tv', 'phone'];

test('search item, get prices', async ({ page }) => {
    const ecommercePage = new ECommercePage(page);
    const searchTerm: string = 'laptop';
    await ecommercePage.goto();
    await ecommercePage.searchItem(searchTerm);
    await ecommercePage.sortSearchResults();

    const itemOne: Item = await ecommercePage.getItem(0, searchTerm);
    await ecommercePage.page.goBack();

    const itemTwo: Item = await ecommercePage.getItem(1, searchTerm);
    await ecommercePage.page.goBack();

    const itemThree: Item = await ecommercePage.getItem(2, searchTerm);
    await ecommercePage.page.goBack();

    const items: Item[] = [itemOne, itemTwo, itemThree];

    ecommercePage.writeToCsv(items, searchTerm);
});

for (const searchTerm of searchTerms) {
  test.skip(`search ${searchTerm}, get prices`, async ({ page }) => {
      const ecommercePage = new ECommercePage(page);
      await ecommercePage.goto();
      await ecommercePage.searchItem(searchTerm);
      await ecommercePage.sortSearchResults();

      const itemOne: Item = await ecommercePage.getItem(0, searchTerm);
      await ecommercePage.page.goBack();

      const itemTwo: Item = await ecommercePage.getItem(1, searchTerm);
      await ecommercePage.page.goBack();

      const itemThree: Item = await ecommercePage.getItem(2, searchTerm);
      await ecommercePage.page.goBack();

      const items: Item[] = [itemOne, itemTwo, itemThree];

      ecommercePage.writeToCsv(items, searchTerm);
  });
}