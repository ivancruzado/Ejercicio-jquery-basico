import { test, expect, Browser, Page } from '@playwright/test';


(async () =>{

    let browser: Browser;
    let page: Page;

    let textoAEscribir  = "automation playwright"

    test.describe('Acciones en automation sandbox',()=>{


        test('Click en boton Id dinamico',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })
            
            await test.step('Puedo hacer click en el boton de id',async()=>{
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
                await expect(page.getByText('despues de 3 segundos')).toBeVisible();
            })
        })

        test('Lleno un campo de texto', async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step('Puedo ingresar el texto que quiera en el field',async()=>{
                await expect(page.getByPlaceholder('Ingresá texto'),'El campo no es editable').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect(page.getByPlaceholder('Ingresá texto'),'El campo no es editable').toHaveValue(textoAEscribir);
                //await page.getByPlaceholder('Ingresá texto').press('Enter')   si hay que tocar una tecla
            })
        })


        //checkboxes
        test('Puedo seleccionar y deseleccionar el checkbox de pasta', async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step('Puedo seleccionar el checkbox para pasta',async()=>{
                await page.getByLabel('Pasta 🍝').check();
                await expect(page.getByLabel('Pasta 🍝'),'El checkbox pasta no estaba seleccionado').toBeChecked();

            })

            await test.step('Puedo deseleccionar el checkbox para pasta',async()=>{
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
        })

        test('Clickeo en un RadioButton', async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step('Puedo seleccionar el RaddioButton para Si',async()=>{
                await page.getByLabel('Si').check();
                await expect(page.getByLabel('Si'),'El radioButton no esta seleccionado').toBeChecked();
            })
        })

        test('Puedo seleccionar un item del dropdown',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step("Selecciono un deporte del dropdown",async()=>{
                const deportes = ['Fútbol','Tennis','Basketball']
                for(let deporte of deportes){
                    const elemento = await page.$(`select#formBasicSelect > option:is(:text("${deporte}"))`)
                    if(elemento){
                        console.log(`Opcion ${deporte} está presente en la lista`);
                    }
                    else{
                        throw new Error(`Opcion ${deporte} no está presente en la lista`);
                    }
                }
            })
        })

        test('Puedo seleccionar un dia del dropdown Dias de la semana',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step("Selecciono un dia de la semana",async()=>{
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Lunes' }).click()
            })
        })

        test.skip('Puedo subir archivos a la pagina',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })

            await test.step("Agregos archivos para ser subidos",async()=>{
                await page.getByLabel('Upload File').setInputFiles(['PathAlArchivo.pdf','Invoice1.pdf']);
                await page.getByLabel('Upload File').setInputFiles([]);//deseleccionar archivos subidos
            })
        })

        test('Valido una tabla estatica',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })
            
            await test.step('Valido los nombres de la tabla estatica',async()=>{
                const valoresNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)',elements => elements.map(element=>element.textContent));

                const nombresEsperados = ['Messi','Ronaldo','Mbappe'];
                expect(valoresNombres).toEqual(nombresEsperados)
            })
        })

        test('Valido una tabla Dinamica',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })
            
            await test.step('Valido los valores de la tabla dinamica',async()=>{
                const valoresDinamicos = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements => elements.map(element=>element.textContent))
                console.log(valoresDinamicos)
                await page.reload();

                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements => elements.map(element=>element.textContent))
                console.log(valoresPostReload)
                expect(valoresDinamicos).not.toEqual(valoresPostReload);
            })
        })

        test('Soft assertions',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })
            
            await test.step('Valido que los valores del checkbox esten visibles',async()=>{
                await expect.soft(page.getByText('Pizza 🍕'),'No se encontro pizza').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝')).toBeVisible();
                await expect.soft(page.getByText('Helado 🍧')).toBeVisible();
                await expect.soft(page.getByText('Torta 🍰')).toBeVisible();
            })
        })

        test('Validando dentro de un popup',async({page})=>{

            await test.step('Dado que navego al sandbox de automation',async()=>{
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
            })
            
            await test.step('Cuando hago click en el boton de pop-up',async()=>{
                await page.getByRole('button', { name: 'Mostrar popup' }).click()
            })

            await test.step('Puedo validar un elemento dentro del pop-up',async()=>{
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!')
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
        })
    })


})();