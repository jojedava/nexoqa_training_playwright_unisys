import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly songs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = this.page.locator('a[href="#/songs/create"]');
    this.songs = this.page.locator('div.song-title');
  }
}
