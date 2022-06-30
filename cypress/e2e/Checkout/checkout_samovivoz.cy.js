/// <reference types="cypress" />

describe('Checkout Samovivoz', () => {

  let quoteId = null;
  let pvz_id = 57997;
  let sku = 307;

  beforeEach(() => {})

  it('Создание корзины гостя', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl') + 'rest/V1/guest-carts',
    }).then(request => {
      quoteId = request.body
      cy.log('данные', request.body)
    })
  })

  it('Добавление товара в корзину', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl') + 'rest/V1/guest-carts/' + quoteId + '/items',
      body: {
        cartItem: {quote_id: quoteId, sku: sku, qty: 1},
      },
    })
  })

  it('Размещение заказа', () => {
    cy.request({
      method: 'PUT',
      url: Cypress.env('baseUrl') + 'rest/V1/cart/' + quoteId + '/place-order',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6",
        "cookie": "quoteId=" + quoteId
      },
      body: {
        order: {
          app_point: "rigla.ru",
          additional_data: "/checkout-new",
          customer: {
            firstname: "Иван",
            lastname: "Иваныч",
            middlename: "Иванвов",
            email: "sdgdf2sfdsvfds@gmail.com",
            telephone: "+7 (915) 333-44-22",
          },
          comment: "",
          subscribe: {
            checkout_subscribe: false,
          },
          shipment: {
            shipping_carrier_code: "slpickup",
            shipping_method_code: pvz_id,
            shipping_date: "2022-06-27",
          },
          payment: {
            paymentMethod: {
              method: "checkmo",
                additional_data: {
                only_in_stock: true,
              }
            }
          }
        }
      },
    })
  })
})
