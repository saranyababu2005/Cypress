const homePage= require('../cypress/pages/homePage')

describe('E2E test for home page',()=>{
    const home = new homePage()
    before(function (){
        cy.fixture('personaldetail').then(function (data)
        {
            this.data=data
        })


        cy.visit("https://rahulshettyacademy.com/angularpractice/shop")

    })

    it('adding personal info',function (){
        home.clickHomeMenu()
        home.setName(this.data.name)
        home.setEmail(this.data.email)
        home.setPassword(this.data.password)
        home.selectLoveIcecream()
        home.selectGender(this.data.gender)
        home.selectEmploymentStatus(this.data.employment)
        home.enterDOB()
        // let returnValue=home.clickSubmit()
        // returnValue.then((te)=>{
        //   cy.log(te.text())
        //       // .toEqual("Success! The Form has been submitted successfully!.")
        // })
        home.clickSubmit().then((te)=>{
           expect(te.trim()).contain("Success! The Form has been submitted successfully!.")
        })
    })
})