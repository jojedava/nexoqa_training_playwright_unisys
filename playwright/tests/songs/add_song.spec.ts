import { test, expect } from '@playwright/test';
import { HomePage } from '../page_objects/home_page';
import { CreateSongPage } from '../page_objects/create_song_page';

test('Add new song', async ({ page }) => {
  await page.goto('http://192.168.1.45:8080');
  var homePage: HomePage = new HomePage(page);
  await homePage.addButton.click();

  var createSongPage: CreateSongPage = new CreateSongPage(page);
  await createSongPage.fillSong(
    'Song 1',
    'Artist 1',
    'Gener 1',
    'Album 1',
    'https://miro.medium.com/v2/resize:fit:1292/format:webp/1*gMiUPuRGC36nxZHe2zthOg.png',
    'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    'TAB',
    'Song lyrics'
  );
  await createSongPage.button.click();
  await page.waitForSelector('div.song-title');
  var total = await homePage.songs.count();
  await expect(homePage.songs.nth(total - 1)).toContainText('Song 1');
});
