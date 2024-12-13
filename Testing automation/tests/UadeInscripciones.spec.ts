import { test, expect, Browser, Page } from '@playwright/test';

(async()=>{

    let browser: Browser;
    let page: Page;
    test.describe("Automatizo las inscripciones",()=>{
        

        test("Flujo de inscripcion",async({browser})=>{
            const context = await browser.newContext();
            const page = await context.newPage();
            let newPage: Page;

            await test.step("Dado que entro a la pagina de inscripciones",async()=>{
                await page.goto('https://inscripciones.uade.edu.ar/Account/Login');
                await expect(page).toHaveTitle('Login')
            })

            

            await test.step('Clickeo en inciar sesion',async()=>{
                await page.getByRole('link', { name: 'Iniciar sesión' }).click();
            })

            await test.step('Completo el campo de email', async()=>{
                await page.getByPlaceholder('Cuenta de correo electronico').fill('mail')
                await page.getByRole('button', { name: 'Next' }).click();
            })

            await test.step('Completo el login',async()=>{
                await page.getByPlaceholder('Password').fill('Pass');
                await page.getByRole('button', { name: 'Sign in' }).click();
                await page.getByRole('button', { name: 'No' }).click();
                await expect(page).toHaveTitle('Inscripciones')
            })
            

            // await test.step('Voy a la pestaña de inscripcciones y apreto inscribirme',async()=>{
            //     await page.getByRole('link', { name: 'Inscribite' }).click();
            //     await page.getByRole('link', { name: '¡INSCRIBITE!' }).first().click();

                
            //     const[newPage] = await Promise.all(
            //         [
            //             context.waitForEvent("page"),
            //             page.getByRole('button', { name: 'Continuar' }).click()
            //         ]
            //     )

            //     await newPage.locator("")
                
             
            // }) averiguar como manejar el pop up en la pantalla de inscripciones

            await test.step('Voy a la pestaña de cronograma',async()=>{
                await page.getByRole('link', { name: 'Cronograma inscripción' }).click();
                
                [newPage] = await Promise.all(
                [
                        context.waitForEvent("page"),
                        page.getByRole('link', { name: 'chequeá la disponibilidad de' }).click()
                             ])
                await expect(newPage.getByRole('heading', { name: 'Programación de Clases' }),"No se encuentra el heading").toBeVisible();
            })

            // await test.step('Puedo filtras las materias',async()=>{
            //     await newPage.getByRole('link', { name: '[Seleccione una Año]' }).click();
            //     await newPage.locator("//li[normalize-space()='TERCER AÑO']").getByText('TERCER AÑO').click();
            //     await newPage.getByRole('link', { name: '[Seleccione un Turno]' }).click();
            //     await newPage.locator("//li[normalize-space()='NOCHE']").click();
            //     browser.close();
            // })

            await test.step('Valido los valores del select',async()=>{
                //await newPage.getByRole('link', { name: '[Seleccione una Año]' }).click();
                const valoresSelectAnio = '2024'

            })
        
        
        
        })

    })})()