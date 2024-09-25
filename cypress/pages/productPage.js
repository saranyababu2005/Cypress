class ProductPage{

    constructor() {


    }
    getProductTitle()
    {
        return cy.get("h4[class='card-title']")
    }
    selectProduct(value){
        this.getProductTitle().each((ele,index,$list)=>{
            if(ele.text().includes(value)) {
                cy.log(ele.text())
                this.getAddBtn().eq(index).click()
            }
        })
   }

   getAddBtn()
   {
       return cy.get('button[class*=\'btn\']')
   }

   getCheckout()
   {
       return cy.contains('Checkout')
   }

   checkOutProduct()
   {
       this.getCheckout().click()
   }

   getQuantity()
   {
       return cy.get('input[id="exampleInputEmail1"]')
   }

   setQuantity(ele,index1)
   {
       this.getQuantity().eq(index1).clear()
       this.getQuantity().eq(index1).type(ele)
   }

   getTotalPrice()
   {
       // return cy.get("tr:nth-child(3) td:nth-child(5)").invoke("text")
       return cy.get('td[class=\'text-right\'] strong').invoke("text")
   }

   checkout()
   {
       cy.contains('Checkout').click()
   }

   getLocation()
   {
       return cy.get('input[id="country"]')
   }

   getAllRelevantLocations()
   {
       return cy.get('div[class="suggestions"] ul li a')
   }

   selectLocation(location)
   {
        this.getLocation().type(location)
       cy.wait(1000)
       this.getAllRelevantLocations().each((ele,index,$list)=>{
           if(ele.text()==="India")
               cy.wrap(ele).click()
       })

   }

   getTermsAndConditions()
   {
       return cy.get('div[class*=\'checkbox\']')
   }

   selectTermsandConditions()
   {
       this.getTermsAndConditions().click()
   }

   purchaseProducts()
   {
        cy.contains('Purchase').click()
   }

   getAlert()
   {
       return cy.get('div[class*=\'alert-success\']')
   }

   getAlertMsg()
   {
       return this.getAlert().invoke('text')
   }


}
module.exports = ProductPage