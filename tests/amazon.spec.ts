import { test } from '@playwright/test';
import { ECommercePage } from '../pages/ecommerce-page';
import Item from '../pages/models/item.model';

test('search item, get prices', async ({ page }) => {
    const ecommercePage = new ECommercePage(page);
    const searchTerm: string = 'laptop';
    await ecommercePage.goto();
    await ecommercePage.searchItem(searchTerm);
    await ecommercePage.sortSearchResults();
    const itemOne: string = await ecommercePage.resultItem.nth(0).locator('span.a-size-medium').innerText();
    await ecommercePage.lowestPriceOne.click();
    const linkOne: string = await ecommercePage.getItemLink();
    const priceOne: string = await ecommercePage.getItemPrice();
    await ecommercePage.page.goBack();
    const itemTwo: string = await ecommercePage.resultItem.nth(1).locator('span.a-size-medium').innerText();
    await ecommercePage.lowestPriceTwo.click();
    const linkTwo: string = await ecommercePage.getItemLink();
    const priceTwo: string = await ecommercePage.getItemPrice();
    await ecommercePage.page.goBack();
    const itemThree: string = await ecommercePage.resultItem.nth(2).locator('span.a-size-medium').innerText();
    await ecommercePage.lowestPriceThree.click();
    const linkThree: string = await ecommercePage.getItemLink();
    const priceThree: string = await ecommercePage.getItemPrice();
    const items: Item[] = [
        {
            product: itemOne,
            price: priceOne,
            searchTerm: searchTerm,
            linkToProductPage: linkOne,
          },
          {
            product: itemTwo,
            price: priceTwo,
            searchTerm: searchTerm,
            linkToProductPage: linkTwo,
          },
          {
            product: itemThree,
            price: priceThree,
            searchTerm: searchTerm,
            linkToProductPage: linkThree,
          },
      ];
    ecommercePage.writeToCsv(items);
});