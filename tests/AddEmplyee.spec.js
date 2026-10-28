import { test } from '@playwright/test';

const employees = [
  { firstname: 'Shree', lastname: 'Charan' },
  { firstname: 'Akhay', lastname: 'K' },
  { firstname: 'Micheal', lastname: 'Jackson' },
  { firstname: 'Sen', lastname: 'Tenz' },
];

for (const employee of employees) {
  test(`Add employee - ${employee.firstname} ${employee.lastname}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: /add/i }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstname);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastname);
    await page.getByRole('textbox').nth(4).fill('');
    await page.getByRole('button', { name: 'Save' }).click();
  });
}