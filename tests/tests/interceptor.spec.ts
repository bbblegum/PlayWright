import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

//INTERCEPTOR//
test('purchase an item with interceptor', async ({ page }) => {

    await page.on("request", req => {
        console.log(req.url())
    });

    page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg", 
        (route) => route.abort()
    );

    await page.route("https://saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",
        (route) => route.abort()
    );


    await page.goto('https://www.saucedemo.com/')
    await page.screenshot({ path: 'tests/screenshot/login.png', fullPage: true })
    const Logg = new LoginPage(page)
    await Logg.loginWithCredentials('standard_user', 'secret_sauce')
    await Logg.checkShoppingCartIcon()

    const items = page.locator('#inventory_container .inventory_item')
        .all();
});


//INTERCEPTOR//
test('interceptor test', async ({ page }) => {

    await page.route("https://demoqa.com/BookStore/v1/Books", (route) => {
        route.fulfill({
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                books: [
                    {
                        isbn: "9781449325862",
                        title: "El libro de Alejandra",
                        subTitle: "A Working Introduction",
                        author: "Richard E. Silverman",
                        publish_date: "2020-06-04T08:48:39.000Z",
                        publisher: "O'Reilly Media",
                        pages: 500,
                        description: "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                        website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                    }
                ]
            })
        })
    })

    await page.goto('https://demoqa.com/books')
    await page.pause()
    await page.screenshot({ path: 'tests/screenshot/books.png', fullPage: true })

});
