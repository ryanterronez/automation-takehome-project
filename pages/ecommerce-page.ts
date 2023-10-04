import { type Locator, type Page } from '@playwright/test';
import Items from './models/search-items.model';
import Item from './models/item.model';

export class ECommercePage {
  readonly page: Page;
  readonly address: string;
  readonly inputSearchText: Locator;
  readonly dropdownSortBy: Locator;
  readonly dropdownItemPriceLowToHigh: Locator;
  readonly resultItem: Locator;
  readonly lowestPriceOne: Locator;
  readonly lowestPriceTwo: Locator;
  readonly lowestPriceThree: Locator;
  readonly itemPriceDollars: Locator;
  readonly itemPriceCents: Locator;

  constructor(page: Page, address: string = 'https://www.amazon.com/') {
    this.page = page;
    this.address = address;
    this.inputSearchText = page.getByRole('textbox', { name: 'Search' });
    // This locator is very flaky, it works about 50% of the time, thus I will sort the results using an api request instead
    this.dropdownSortBy = page.locator('span.a-dropdown-container');
    this.dropdownItemPriceLowToHigh = page.getByLabel('Price: Low to High').getByText('Price: Low to High');
    this.resultItem = page.locator('div[data-component-type="s-search-result"]');
    this.lowestPriceOne = this.resultItem.nth(0).locator('a.a-link-normal').nth(0);
    this.lowestPriceTwo = this.resultItem.nth(1).locator('a.a-link-normal').nth(1);
    this.lowestPriceThree = this.resultItem.nth(2).locator('a.a-link-normal').nth(2);
    this.itemPriceDollars = page.locator('div#corePriceDisplay_desktop_feature_div').nth(0).locator('span.a-price-whole');
    this.itemPriceCents = page.locator('div#corePriceDisplay_desktop_feature_div').nth(0).locator('span.a-price-fraction');
  }

  async goto() {
    await this.page.goto(this.address);
  }

  async searchItem(item: string) {
    await this.inputSearchText.fill(item);
    await this.inputSearchText.press('Enter');
  }

  async sortSearchResults() {
    await this.dropdownSortBy.click();
    await this.page.waitForTimeout(1500);
    if (await this.dropdownItemPriceLowToHigh.isVisible()) {
      await this.dropdownItemPriceLowToHigh.click();
    } else {
      await this.dropdownSortBy.click();
      await this.page.waitForTimeout(1500);
      await this.dropdownItemPriceLowToHigh.click();
    }
  }

  async getItemPrice(): Promise<string> {
    let dollars: string = await this.itemPriceDollars.innerText();
    dollars = dollars.replace(/[\n\r]/g, '')
    const cents: string = await this.itemPriceCents.innerText();
    const price: string = `${dollars}${cents}`;
    return price;
  }

  async getItemLink(): Promise<string> {
    const link: string = await this.page.url();
    return link;
  }

  async sortItemsByPriceLowToHigh(items: Items): Promise<Item[]> {
    const itemsSortedByPrice: Item[] = items.payload.sort((a, b) => (a.price < b.price ? -1 : 1));
    const itemsThreeLowestPrices: Item[] = itemsSortedByPrice.slice(0, 3);
    return itemsThreeLowestPrices;
  }

  async writeToCsv(items: Item[]) {
    const timestamp = new Date().getTime().toString();
    const lastSixDigits = timestamp.slice(-6);
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: `./results/results-${lastSixDigits}.csv`,
      header: [
        { id: 'product', title: 'Product' },
        { id: 'price', title: 'Price' },
        { id: 'searchTerm', title: 'Search Term' },
        { id: 'linkToProductPage', title: 'Link to Product Page'}
      ]
    });
    await csvWriter.writeRecords(items);
  }
}