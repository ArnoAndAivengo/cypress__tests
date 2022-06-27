/// <reference types="cypress" />

describe('Checkout Samovivoz', () => {

  let quoteId = null;
  let pvz_id = null;

  beforeEach(() => {
    // cy.visit('https://dev-rigla.ru/product/86362', {auth: {
    //   username: 'magento',
    //   password: 'a1b2c3d4',
    // }})
  })

  it('Создание корзины гостя', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev-rigla.ru/rest/V1/guest-carts',
    }).then(request => {
      quoteId = request.body
      cy.log('данные', request.body)
    })
  })

  it('Добавление товара в корзину', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev-rigla.ru/rest/V1/guest-carts/' + quoteId + '/items',
      body: {
        cartItem: {quote_id: quoteId, sku: "110057", qty: 1},
      },
    })
  })

  it('Размещение заказа', () => {
    cy.clearCookie('quoteId')
    cy.setCookie('quoteId', quoteId)

    cy.request({
      method: 'PUT',
        url: 'https://dev-rigla.ru/rest/V1/cart/' + quoteId + '/place-order',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6"
      },
      body: {
        order: {
          additional_data: "/checkout-new",
          app_point: "rigla.ru",
          customer: {
            apt: "32",
            city: "Москва",
            email: "alexobukhovarn1o@gmail.com",
            firstname: "AKEKSANDR",
            house: "123",
            lastname: "OBUKHOV",
            middlename: "",
            postcode: "111111",
            region_code: 77,
            street: "Казанский",
            telephone: "+7 (891) 521-27-72"
          },
          comment: "Заказ Здравсити срочная доставка. Заказ собрать из остатков аптеки",
          subscribe: {
            checkout_subscribe: false
          },
          shipment: {
            delivery_interval: "13:00 - 18:00",
            shipping_carrier_code: "myshipping",
            shipping_date: "2022-06-28",
            shipping_method_code: "",
            additional_data:{
              latitude: 55.73183,
              longitude: 37.614788
            },
          },
          payment: {
            paymentMethod: {
              method: "checkmo ",
              additional_data: {
                "only_in_stock": true
              },
            }
          }
        }
      },
    })
  })
})
