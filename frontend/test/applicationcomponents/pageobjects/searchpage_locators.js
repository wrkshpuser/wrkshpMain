const page = {
    elements: {
        txt_search: {locator: [{type:"css",value:'#productsearch'}],description: "Search",actions: ["SENDKEYS"], createmethod:true, alwaysAvailable:true},
        btn_searchIcon: {locator: [{type:"css",value:'#searchicon'}],description: "Search Icon",actions: ["CLICK"], createmethod:true, alwaysAvailable:true}
    },
    screenvalidation:{
        pageName:"searchpage",
        fullpage:true,
        fullpage_Update_snaphot:false,
        update_snaphot:false,
        blocks:[
            
        ]
    },
    url:'http://localhost:3000/cts-shop/products/iphone',
};

module.exports = page;
