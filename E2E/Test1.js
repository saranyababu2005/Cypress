/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
const iframe = require('cypress-iframe')

describe("Handling different elements",function ()
{
    it("Checkbox",function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('input#checkBoxOption1').check().should('be.checked').should('have.value','option1')
        cy.get('input#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2','option3'])
    })

    it('static Dropdown',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('select').select('option2').should('have.value','option2')
    })

    it('Dynamic dropdown',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('input#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each((item,index,$list)=>
        {
           if(item.text()===('India'))
               // cy.get('input#autocomplete').type(item.text())
               cy.wrap(item).click()
        })
    })

    it('Visible/Invisible objects',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

    })

    it('Radio objects',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('input[value="radio1"]').check().should('be.checked')
    })

    it('alert/popup',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("input#alertbtn").click()
        cy.get("input#confirmbtn").click()
        cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.on('window:confirm',(str)=>
        {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
        // cy.on('window:confirm',()=> false) - to click cancel button on confirmation box
    })

    it('Handling child tabs',function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#openwindow').invoke('removeAttr','target').click()
        //need to change origin if its something different
        cy.contains('Documents request').should('be.visible')

        
    })

    it("Handling tables",function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('table#product:nth-child(2) td:nth-child(2)').each((item,index,$list)=>
        {
            if(item.text()==='Master Selenium Automation in simple Python Language') {
                cy.log(index)
                cy.get('table#product:nth-child(2) td:nth-child(2)').eq(index).next().then((item)=>cy.log(item.text()))
                cy.get('table#product:nth-child(2) tr:nth-child('+`${index+2}`+') td:nth-child(3)').then((item)=>cy.log(item.text()))

            }
        })

    })

    it("mouse actions",function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // cy.get("div.mouse-hover-content").invoke("show")
        cy.contains("Top").click({force:true})
        cy.url().should('include','top')
    })

    it("handling child window",function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then((item)=> {
            const url = item.prop("href")
            cy.visit(url)
            cy.origin(url,()=>{

                cy.url().should('include','academy')
            })

        })

    })

    it("handling frames",function ()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded("#courses-iframe")

        cy.iframe().find('a[href*="mentorship"]').eq(0).click()

        cy.wait(5000)
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2)
        cy.iframe().find('h1[class*="pricing-title"]').each((item,index,$list)=>{
            cy.log(item.text())
        })
    })

    it.only("handling calendars",function ()
    {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        // cy.contains("Top Deals").click()
        cy.get('button[class*="react-date-picker__calendar"]').click()
        cy.get('span[class*="react-calendar__navigation"]').click()
        cy.get('span[class*="react-calendar__navigation"]').click()
        cy.get('button[class*="decade-view__years__year"]').each((item,index,$list)=>{
            if(item.text()==='2027')
                cy.wrap(item).click()

        })

        cy.get('button[class*="year-view__months__month"]').each((item,index,$list)=>{
            if(item.text()==="September")
                cy.wrap(item).click()
        })

        cy.get('button[class*="month-view__days__day"]').each((item,index,$list)=>{
            if(item.text()==="20")
                cy.wrap(item).click()
        })

        cy.get('input[name="date"]').then((item)=>{
            const data = item.prop("value")
            data.toEqual("2024-09-20")
        })

    })
})