import { test, expect, Browser, Page } from '@playwright/test';


    let browser: Browser;
    let page: Page;

    test.describe('Navegacion en free Range Testers',()=>{

        const secciones = [
            {Nombre:'Cursos',url:'/cursos',tituloEsperado:'Cursos'},
            {Nombre:'Udemy',url:'/udemy',tituloEsperado:'Udemy'},
            {Nombre:'Recursos',url:'/recursos',tituloEsperado:'Recursos'}
        ]

        
        for(const seccion of secciones){
        test(`Los links principales redirigen correctamente a ${seccion.Nombre}`, async({page})=>{

            await test.step('Estando en la web principal', async()=>{
                page.goto('https://www.freerangetesters.com/');
                await expect(page).toHaveTitle('Free Range Testers');
            })

            await test.step(`Cuando hago click en ${seccion.Nombre}`,async()=>{
                page.locator('#page_header').getByRole('link',{name:seccion.Nombre,exact: true}).click();
                await page.waitForURL(`**${seccion.url}`);
            })
            
            await test.step(`Soy redirigido a ${seccion.Nombre}`,async()=>{
                await expect(page).toHaveTitle(seccion.tituloEsperado);
            })
        })}
    })


