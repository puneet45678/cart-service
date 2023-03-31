let basket = JSON.parse(localStorage.getItem("data")) || []
let ShoppingCart = document.getElementById("shopping-cart")
let label = document.getElementById("label")
let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x + y,0);
}

calculation()

let generateXartItems = () => {
    if(basket.length !==0){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id , item } =x;
            let search = shopItemData.find((y)=>y.id === id ) || [];
            return`
            <div class="cart-item">
                <img width ="100px" src=${search.img}>
                <div class ="details">
                    <div class ="title-price-x">
                        <h4 class ="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>

                        </h4>
                        <i  onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick ="increment(${id})" class="bi bi-plus-lg"></i>

                    </div>
                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>`
        }))

    }
    else{
        ShoppingCart.innerHTML=``
        label.innerHTML=`
        <h2> Card id Empty</h2>
        <a href="index.html">
            <button class ="HomeBtn">Back To Home</button>
        </a>`
    }
}
generateXartItems()

let increment =(id) =>{
    let selectedItem =id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if (search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1
        });
    } else {
        search.item+=1;      
    }
    generateXartItems()
    update(selectedItem.id)
    localStorage.setItem("data" , JSON.stringify(basket))
};

let decrement =(id) =>{
    let selectedItem =id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if (search==undefined) return;
    else if (search.item === 0) return ;
    else {
        search.item-=1;      
    }

    update(selectedItem.id)
    basket = basket.filter((x)=> x.item !== 0);
    generateXartItems()
    localStorage.setItem("data" , JSON.stringify(basket))
    console.log(basket)

}

let update=(id)=>{

    let search = basket.find((x) =>  x.id === id);
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalamount()

}

let removeItem =(id) =>{
    let selectedItem = id ;
    basket = basket.filter((x)=>x.id !== selectedItem.id) 
    generateXartItems();
    totalamount();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
    

}

let totalamount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item , id} =x;
            let search = shopItemData.find((y)=>y.id === id ) ||[];

            return item * search.price
        })
        .reduce((x,y) => x + y , 0);
        label.innerHTML=`
        <h2> Total Bill :$ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick ="clearcart()" class="removeall">Clear Cart</button>
        

        `
    }

}

let clearcart =() =>{
    basket=[];
    generateXartItems();
    calculation();
    localStorage.setItem("data" ,JSON.stringify(basket))

}

totalamount()