/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {})

  it('Loginization', () => {
    cy.log("Отправляем", {
      recaptcha: "",
      telephone: "74335813333"
    })
    cy.request('POST', "https://dev-rigla.ru/rest/V1/mindbox/account/generateSMS", {
      recaptcha: "",
      telephone: "74335813333"
    }).then(req => {
      cy.log('Response', req.body);
    });
  })
})
