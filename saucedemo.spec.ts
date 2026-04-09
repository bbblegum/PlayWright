import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/Loginpage'

test.only('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const Logg = new LoginPage(page)
    await Logg.fillUsername()
    await Logg.fillPassword()
    await Logg.clickOnLogin()

    const items = page.locator('#inventory_container .inventory_item')
    await expect(items.first()).toBeVisible()

    const count = await items.count()
    const randomIndex = Math.floor(Math.random() * count)

    const randomItem = items.nth(randomIndex)

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectedPrice} Name:${expectedName} Description: ${expectedDescription}`)

    await randomItem.getByRole('button', { name: 'Add to cart' }).click()
    await page.locator('a.shopping_cart_link').click()
   
    expect(page.getByRole('button', {name: 'checkout'})).toBeVisible

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole('button', {name: 'checkout'}).click()
    
    await page.locator('[data-test="firstName"]').fill('Alejandra')
    await page.locator('[data-test="lastName"]').fill('Glez')
    await page.locator('[data-test="postalCode"]').fill('98672')

   
    await page.getByRole('button', { name: 'Continue' }).click()
    await page.getByRole('button', { name: 'Finish' }).click()

    await page.pause()

    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible

});
