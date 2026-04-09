import { test, expect } from '@playwright/test'

//Estructura basica nuevo//
test('test', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.co') //abrir pagina
    await page.locator('input[id=\'cb1-edit\']').fill('Iphone') //localiza un objeto en la pagina
    await page.keyboard.press('Enter') //para precionar la tecla Enter
  
    await expect(page.locator('img[data-testid="picture"][alt*="iPhone 17"]').nth(0)).toBeVisible() //Localizador para encontrado
    //await page.pause() //poder detener la ejecucion
  
    const titles = await page.locator('.poly-component__title').allInnerTexts()//se busca por clase 
  
    console.log('the total number of result is:', titles.length)
  
    for(let title of titles){
        console.log('the title is:', title)
    }
  
    const iphone = await page.locator('.poly-component__title').getByText('iPhone 12 Dual SIM 64 GB azul - Bueno (Reacondicionado)') //Utilizamos el texto especifico para buscar el elemnto
  
    await iphone.click();
  
    await page.pause()
    });
  
    //Localizador por medio de nombre
    test('test locators 2', async ({page}) => {
      await page.goto('http://www.mercadolibre.com.co')
      //await page.getByRole('link', { name: 'Mis compras', exact: true }).first().click()
      await page.getByRole('link', { name: 'Ingresa', exact: true }).first().click() //exactamente el elemento que queremos click 
      await page.pause()
  
    });