import { Locator, Page } from "@playwright/test"

export class LoginPage{

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    
    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
    }
    async fillUsername(){
        await this.usernameTextbox.fill('standard_user')
    }
    async fillPassword(){
        await this.passwordTextbox.fill('secret_sauce')
    }
    async clickOnLogin(){
        await this.loginButton.click()
    }
  
    
}