/// <reference types="Cypress" />

describe('First Test suite',function ()
{
    it("First test case",function ()
    {
        console.log("first test case")
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        // cy.get('.product:visible').should('have.length',4)
        // cy.get('.products').find('.product').children()
        // cy.get('.products').find('.product').contains('Carrot').siblings('.product-action').click()
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click().then(()=>{
            console.log("after clicking")
        })
    })

    it('Dynamically selecting an element',function ()
    {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').each((item,index,$list)=>
           {
                if(item.find('.product-name').text().includes('Cashew'))
                    cy.wrap(item).find('button').click()
            })
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.wait(2000)
        cy.get('button').eq(1).click()
    })
})