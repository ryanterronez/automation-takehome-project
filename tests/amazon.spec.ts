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
        {
            product: 'Product 1',
            price: priceOne,
            searchTerm: 'Search Term 1',
            linkToProductPage: 'https://example.com/product1',
          },
          {
            product: 'Product 2',
            price: priceTwo,
            searchTerm: 'Search Term 2',
            linkToProductPage: 'https://example.com/product2',
          },
          {
            product: 'Product 3',
            price: priceThree,
            searchTerm: 'Search Term 3',
            linkToProductPage: 'https://example.com/product3',
          },
      ];
    ecommercePage.writeToCsv(testItems);
});