const prod = require('../cypress/pages/productPage')

describe('E2E for shopping cart',function (){

    const produc=new prod();

    before(function (){
        cy.fixture('shoppingdetail').then(function (data)
        {
            this.pro=data

        })


        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

    })

    it('shopping cart',function ()
    {
        let a = this.pro.products
        a.forEach(function(ele,index,list){
            produc.selectProduct(ele)
        })
        produc.checkOutProduct()
        let b = this.pro.quantity
        b.forEach(function (ele,index,list){
            cy.log(ele)
            cy.log(index)
            produc.setQuantity(ele,index)
        })
        produc.getTotalPrice().then((te)=>expect(te).contain("550000"))
        produc.checkout()
        produc.selectLocation("in")
        produc.selectTermsandConditions()
        produc.purchaseProducts()
        produc.getAlertMsg().then((msg)=>expect(msg).contain("Success! Thank you! Your order will be delivered in next few weeks :-)."))
    })
})