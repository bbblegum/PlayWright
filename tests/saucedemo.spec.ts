import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    //Loggin con clase LoginPage
    const Logg = new LoginPage(page)
    await Logg.loginWithCredentials('standard_user', 'secret_sauce')
    await Logg.checkShoppingCartIcon()

    
    const items = page.locator('#inventory_container .inventory_item')
    await expect(items.first()).toBeVisible()

    const count = await items.count()
    const randomIndex = Math.floor(Math.random() * count)

    const randomItem = items.nth(randomIndex)

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectedPrice} Name:${expectedName} Description: ${expectedDescription}`)

    // se agrega al carrito y se da click al carrito de compras
    await randomItem.getByRole('button', { name: 'Add to cart' }).click()
    await page.locator('a.shopping_cart_link').click()
    //await page.pause()

    //Que sea visible el boton Checkout
    expect(page.getByRole('button', {name: 'checkout'})).toBeVisible

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole('button', {name: 'checkout'}).click()
    //seccion de checkAut
    await page.locator('[data-test="firstName"]').fill('Alejandra')
    await page.locator('[data-test="lastName"]').fill('Glez')
    await page.locator('[data-test="postalCode"]').fill('98672')

    //click en los botones
    await page.getByRole('button', { name: 'Continue' }).click()
    await page.getByRole('button', { name: 'Finish' }).click()

    await page.pause()

    //Que sea visible el texto
    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible

});

test('purchase an item 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    //Loggin con clase LoginPage
    const Logg = new LoginPage(page)
    await Logg.loginWithCredentials('standard_user', 'secret_sauce')
    await Logg.checkShoppingCartIcon()
})

//test.only('navigate', async ({ page }) => {
//    await page.goto('process.env.URL')
//    await page.pause()
//    const Logg = new LoginPage(page)
//    await Logg.fillUsername('standarduser')
//    await Logg.fillPassword('secret_sauce')
//    await Logg.clickOnLogin()

