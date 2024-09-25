class HomePage
{
    data;

    constructor()
    {

    }
    getName()
    {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    clickHomeMenu()
    {
        cy.contains('Home').click()
    }

    getEmail()
    {
        return cy.get('input[name="email"]')
    }

    getPassword()
    {
        return cy.get('#exampleInputPassword1')
    }

    getLoveIcecreamCheckbox()
    {
        return cy.get('#exampleCheck1')
    }

    getGender()
    {
        return cy.get('select')
    }
    setName(name)
    {
        this.getName().type(name)
    }

    setEmail(email)
    {
        this.getEmail().type(email)
    }

    setPassword(pwd)
    {
        this.getPassword().type(pwd)
    }

    selectLoveIcecream()
    {
       this.getLoveIcecreamCheckbox().click()
    }

    selectGender(option)
    {
        this.getGender().select(option)
    }

    selectEmploymentStatus(status)
    {
        cy.get('label[for*="inlineRadio"]').each(($ele,index,$list)=>{
            if($ele.text()===status)
                cy.wrap($ele.prev()).check()

        })
    }

    enterDOB()
    {
        cy.get('label[for*="dateofBirth"]').next().type("1987-09-20")
    }

    clickSubmit()
    {
        let labelText
        cy.get('input[type=\'submit\']').click()
        // labelText = cy.get('div[class*=\'alert-success\']').then( (item) => {
        //     return item.text();
        //
        // })
       return cy.get('div[class*=\'alert-success\']').invoke("text")
    }

}

module.exports = HomePage