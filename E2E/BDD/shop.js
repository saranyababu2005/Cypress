import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
const prod = require('../../cypress/pages/productPage')
const produc=new prod();
Given("I Visit the url",function ()
{
    cy.visit('https://rahulshettyacademy.com/angularpractice/shop')
})

When("I add products to Cart",()=>{
    // const produc=new prod();
    produc.selectProduct("Blackberry")
    produc.checkOutProduct()
})


When("Validate the total",()=>{
    produc.getTotalPrice().then((te)=>expect(te).contain("50000"))
})

Then("Select the location and confirm delivery",()=>{
    produc.checkout()
    produc.selectLocation("in")
    produc.selectTermsandConditions()
    produc.purchaseProducts()
    produc.getAlertMsg().then((msg)=>expect(msg).contain("Success! Thank you! Your order will be delivered in next few weeks :-)."))
})
