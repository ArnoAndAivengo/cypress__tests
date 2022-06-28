  /// <reference types="cypress" />

import {queryListPricesForProducts, variablesListPricesForProducts} from '../../support/api/graphql/listPricesForProducts';
import {queryProductDetail, variablesProductDetail} from '../../support/api/graphql/productDetail';
import {queryPvzQuoteByTypeStockAvailable, variablesPvzQuoteByTypeStockAvailable} from '../../support/api/graphql/pvzQuoteByTypeStockAvailable';

describe('Checkout Samovivoz', () => {

  const _url = 'https://www.dev-rigla.ru/graphql';
  let quoteId = null;
  let pvz_id = null;

  beforeEach(() => {
    // cy.visit('https://dev-rigla.ru/product/86362', {auth: {
    //   username: 'magento',
    //   password: 'a1b2c3d4',
    // }})
  })

  it('Получаем сгенерированный ключ гостя', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev-rigla.ru/rest/V1/guest-carts',
    }).then(request => {
      quoteId = request.body
      cy.log('данные', request.body)
    })
  })


  it('Получаем продукт', () => {
    cy.request({
      method: 'POST',
      url: _url,
      body: {
        variables: variablesProductDetail,
        query: queryProductDetail
      },
    })
  })

  it('С этим товаром покупают', () => {
    cy.request({
      method: 'POST',
      url: _url,
      body: {
        variables: variablesListPricesForProducts,
        query: queryListPricesForProducts
      },
    })
  })

  it('Товар в корзину', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev-rigla.ru/rest/V1/guest-carts/' + quoteId + '/items',
      body: {
        cartItem: {quote_id: quoteId, sku: "307", qty: 1},
      },
    })
  })

  it('Получаем товары из корзины в соответствии с текущим сгенерированным идентификатором корзины пользователя', () => {
    cy.request({
      method: 'GET',
      url: 'https://dev-rigla.ru/rest/V1/guest-carts/'+ quoteId +'/totals',
    })
  })

  it('Получаем адреса в соответствии с текущим сгенерированным идентификатором пользователя', () => {
    cy.request({
      method: 'POST',
      url: _url,
      body: {
        variables: variablesPvzQuoteByTypeStockAvailable,
        query: queryPvzQuoteByTypeStockAvailable
      },
    }).then(request => {
      pvz_id = request.body.data.pvzQuoteByTypeStockAvailable.inStockPvz[0].entity_id;
      cy.log('данные', request.body)
    })
  })

  it('Рассчет заказа', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev-rigla.ru/rest/V1/cart/'+ quoteId +'/calculate-checkout',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer tcf5k9a8u7gfyr22c28qu29qq4qhxbu6",
        "X-APP": "WEB"
      },
      body: {
        params: {
          "estimate_day": 0,
          "is_take_all": true,
          "pvz_id": pvz_id,
          "shipping_method": "pickup",
          "address": "Москва",
          "longitude": 0,
          "latitude": 0
        },
      },
    })
  })

  it('Заполняем данные, завершаем заказ. Переход на страницу checkout-new', () => {
    cy.request({
      method: 'PUT',
      url: 'https://dev-rigla.ru/rest/V1/cart/' + quoteId + '/place-order',
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
