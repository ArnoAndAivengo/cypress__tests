/// <reference types="cypress" />

describe('Checkout Dostavka', () => {

  let quoteId = null;
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

  it('Метод доставки', () => {
    cy.request({
      method: 'PUT',
      url: Cypress.env('baseUrl') + 'rest/V1/myshipping/updateCartZone/' + quoteId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6",
        "X-APP": "WEB"
      },
      body: {
        zoneId: 3
      },
    })
  })

  it('Рассчет заказа', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl') + 'rest/V1/cart/'+ quoteId +'/calculate-checkout',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6",
        "X-APP": "WEB"
      },
      body: {
        params: {
          estimate_day: 0,
          is_take_all: true,
          pvz_id: null,
          shipping_method: "courier",
          address: 'Москва, Казанский 123',
          latitude: 55.73183,
          longitude: 37.614788
        },
      },
    })
  })

  it('Размещение заказа', () => {
    cy.request({
      method: 'PUT',
        url: Cypress.env('baseUrl') + 'rest/V1/cart/' + quoteId + '/place-order',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6"
      },
      body: {
        order: {
          app_point: 'rigla.ru',
          additional_data: '/checkout-new',
          comment: '',
          customer: {
            firstname: 'AKEKSANDR',
            lastname: 'OBUKHOV',
            middlename: '',
            email: 'alexobukh2ovarno@gmail.com',
            telephone: '+7 (891) 521-27-72',
            city: 'Москва',
            postcode: '111111',
            region_code: 77,
            street: 'Казанский',
            house: '123',
            apt: '32'
          },
          subscribe: {
            checkout_subscribe: false
          },
          shipment: {
            shipping_method_code: '',
            delivery_interval: '09:00 - 21:00',
            shipping_carrier_code: 'myshipping',
            shipping_date: '2022-07-04',
            additional_data: {
              latitude: 55.73183,
              longitude: 37.614788
            }
          },
          payment: {
            paymentMethod: {
              method: 'checkmo',
              additional_data: {
                only_in_stock: true
              }
            }
          }
        }
      }
    })
  })
})
