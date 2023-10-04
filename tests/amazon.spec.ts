import { test } from '@playwright/test';
import { ECommercePage } from '../pages/ecommerce-page';
import Item from '../pages/models/item.model';

test('search item, get prices', async ({ page }) => {
    const ecommercePage = new ECommercePage(page);
    await ecommercePage.goto();
    await ecommercePage.searchItem('laptop');
    await ecommercePage.sortSearchResults();
    await ecommercePage.lowestPriceOne.click();

    const priceOne: string = await ecommercePage.getItemPrice();
    await ecommercePage.page.goBack();
    await ecommercePage.lowestPriceTwo.click();
    const priceTwo: string = await ecommercePage.getItemPrice();
    await ecommercePage.page.goBack();
    await ecommercePage.lowestPriceThree.click();
    const priceThree: string = await ecommercePage.getItemPrice();
    const testItems: Item[] = [
        { name: 'Item 1', price: priceOne, description: 'This is item 1' },
        { name: 'Item 2', price: priceTwo, description: 'This is item 2' },
        { name: 'Item 3', price: priceThree, description: 'This is item 3' },
      ];
    ecommercePage.writeToCsv(testItems);
});