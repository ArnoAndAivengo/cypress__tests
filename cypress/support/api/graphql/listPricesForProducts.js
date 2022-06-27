export const variablesListPricesForProducts = {sku_list: ["307", "107334", "109481", "99105"], per_page: 20};

export const queryListPricesForProducts = 'query  getListPricesForProducts($sku_list:[String]!, $per_page: Int!){\n' +
    '    products: productsElastic (\n' +
    '        filter:{sku: {finset:$sku_list}},\n' +
    '        pageSize: $per_page\n' +
    '    ) {\n' +
    '        items{\n' +
    '            id,\n' +
    '            sku,\n' +
    '            name,\n' +
    '            thumbnail{\n' +
    '                label,\n' +
    '                url\n' +
    '            },\n' +
    '            url_key\n' +
    '            promo_label\n' +
    '            promo_label_ext {\n' +
    '                name\n' +
    '                color\n' +
    '                url\n' +
    '            }\n' +
    '            manufacturer_id {label}\n' +
    '            is_in_stock\n' +
    '            is_isg\n' +
    '            is_x\n' +
    '            delivery\n' +
    '            delivery_status\n' +
    '            termolabil_preparat\n' +
    '            thermolabile\n' +
    '            rec_need\n' +
    '            manufactures_url\n' +
    '            brands_url\n' +
    '            emias_Id\n' +
    '            unit_quantity\n' +
    '            orig_preparat{\n' +
    '                label\n' +
    '            }\n' +
    '            categories{\n' +
    '                id\n' +
    '                name\n' +
    '            }\n' +
    '            price {\n' +
    '                oldPrice{\n' +
    '                    amount\n' +
    '                    {\n' +
    '                        value\n' +
    '                    }\n' +
    '                }\n' +
    '                regularPrice {\n' +
    '                    amount {\n' +
    '                        value\n' +
    '                        currency\n' +
    '                    }\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '}\n';