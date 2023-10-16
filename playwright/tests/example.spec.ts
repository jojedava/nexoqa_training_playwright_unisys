import { test, expect, Page } from '@playwright/test';
import { unlinkSync } from 'fs';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('TabTracker');
});

test('Validate login page', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.click('#btn-login');

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('div.container div.toolbar__title')).toHaveText(
    'Login'
  );
});

//API Response
test('expect', async ({ request }) => {
  const response = await request.get('url');
  await expect(response).not.toBeOK();
});

//Generic

class Unisys {
  public async execute(a: Number, page: Page): Promise<Number | null> {
    try {
      await page.getByRole('button');
    } catch (e) {
      throw Error('Button not found');
    }

    if (a == 0) return null;
    return 0;
  }
}

test('expect.any', async ({ page }) => {
  expect(new Unisys()).toEqual(expect.any(Unisys));
  expect(new Unisys()).toEqual(expect.any(String));
  expect({ age: 10 }).toEqual({ age: expect.any(Number) });
});

test('expect.anything', async ({ page }) => {
  expect(await new Unisys().execute(0, page)).toEqual(expect.anything());
  expect(await new Unisys().execute(1, page)).toEqual(expect.anything());
});

test('expect.arrayContaining', async ({ page }) => {
  expect([1, 3, 4]).toEqual(expect.arrayContaining([1, 2])); //false
  expect([1, 3, 4]).toEqual(expect.arrayContaining([1, 4])); //true
});

test('expect.closeTo', async ({ page }) => {
  expect({ area: 0.7 + 0.35 }).toEqual({ area: 1.05 }); //true
  expect({ area: 0.7 + 0.35 }).toEqual({ area: expect.closeTo(1, 1.1) }); //true
});

test('expect.toMatchObject', async ({ page, request }) => {
  const response = await request.get('url');
  /*
  {
    id: 1,
    name: "Action",
    section: "Sector 1"
  }
  */
  const json = response.json();
  const obj = {
    name: json['name'],
    section: json['sction'],
    status: response.status,
  };
  expect(obj).toMatchObject({
    name: 'Action',
    section: 'Sector 1',
    status: 200,
  });
});

test('expect.toThrow', async ({ page, request }) => {
  const unisys: Unisys = new Unisys();
  expect(() => unisys.execute(2, page)).toThrow(Error('Button not found'));
});

test('expect.toHaveLenght', async ({ page, request }) => {
  expect(['one', 'two', 'three']).toHaveLength(3);
  expect('Hello').toHaveLength(5);
});

test('expect.toHaveProperty', async ({ page, request }) => {
  expect({
    id: 1,
    name: 'Action',
    section: 'Sector 1',
    role: {
      admin: 0,
      user: 1,
    },
    emails: [
      {
        email: 'e@test.com',
        id: 32,
      },
      {
        email: 'e2@test.com',
        id: 31,
      },
    ],
  }).toHaveProperty('role.admin', 1);

  expect({
    id: 1,
    name: 'Action',
    section: 'Sector 1',
    role: {
      admin: 0,
      user: 1,
    },
    emails: [
      {
        email: 'e@test.com',
        id: 32,
      },
      {
        email: 'e2@test.com',
        id: 31,
      },
    ],
  }).toHaveProperty('emails[1].id', 31);
});
