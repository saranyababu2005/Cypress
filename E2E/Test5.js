describe('interception',function ()
{
    it('mocking response',function ()
    {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept({
          method:"Get",
          url:"https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty"
        },
        {
          statusCode:200,
          body:[{
              "book_name": "RestAssured with Java",
              "isbn": "BSG",
              "aisle": "2302"
          }]
        }).as('bookretreival')
        cy.get('button[class*=\'btn-primary\']').click()
        cy.wait('@bookretreival')

    })

    it("mocking request",function (){
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept("GET","https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",(req)=>{
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
            req.continue(function(res){
                // expect(res.statusCode).to.equal(403)
            } )
        }).as("rep")
        cy.get('button[class*=\'btn-primary\']').click()
        cy.wait('@rep')
    })

    it.only("api testing",function (){
        
})
})