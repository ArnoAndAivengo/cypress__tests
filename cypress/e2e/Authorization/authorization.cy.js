/// <reference types="cypress" />

describe('example to-do app', () => {

  const password = "12345rigla";
  const userame = "+7 (915) 212-77-21";

  it('Authorization', () => {
    cy.log("Отправляем", {
      password: password,
      username: userame
    })
    cy.request('POST', "https://dev-rigla.ru/rest/V1/integration/customer/token", {
      password: password,
      username: userame
    }).then(req => {
      cy.log('Response', req.body);
    });
  })
})
