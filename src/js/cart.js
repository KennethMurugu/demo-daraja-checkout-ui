let cartList = document.querySelector('.cart-list')
let cartTotal = document.querySelector('.cart-total')
let checkoutModal = document.querySelector('.checkout-modal')
let isCheckoutModalOpen = false

let cart = {
  samsung: {
    name: 'Samsung Galazy A51',
    count: 0,
  },
  motorola: {
    name: 'Motoroal G Stylus ',
    count: 0,
  },
}

export function addToCart(name) {
  cart[name].count++

  refreshCart()
}

export function removeFromCart(name) {
  cart[name].count--

  refreshCart()
}

export function clearCart() {
  cart['samsung'].count = 0
  cart['motorola'].count = 0

  refreshCart()
}

export function getCartTotal() {
  return (cart.samsung.count + cart.motorola.count) * 10
}

export function refreshCart() {
  while (cartList.children.length > 0) {
    cartList.removeChild(cartList.lastChild)
  }
  createCartListItem('samsung')
  createCartListItem('motorola')

  let total = (cart.samsung.count + cart.motorola.count) * 10
  cartTotal.innerHTML = total
}

export function createCartListItem(cartName) {
  let cartItem = cart[cartName]
  if (cartItem.count > 0) {
    let name = document.createElement('p')
    name.innerHTML = cartItem.name
    let quantity = document.createElement('p')
    quantity.innerHTML = cartItem.count
    let price = document.createElement('p')
    price.innerHTML = '10'
    let total = document.createElement('p')
    total.innerHTML = 10 * cartItem.count
    let btnRemove = document.createElement('button')
    btnRemove.classList.add('btn', 'btn-remove-item')
    btnRemove.onclick = () => {
      removeFromCart(cartName)
    }
    btnRemove.innerHTML = '&times;'

    let item = document.createElement('div')
    item.classList.add('item')

    item.appendChild(name)
    item.appendChild(quantity)
    item.appendChild(price)
    item.appendChild(total)
    item.appendChild(btnRemove)

    cartList.appendChild(item)
  }
}

export function toggleCheckoutModal() {
  if (getCartTotal() <= 0) return
  isCheckoutModalOpen = !isCheckoutModalOpen

  if (isCheckoutModalOpen) {
    checkoutModal.classList.remove('hide')
  } else {
    checkoutModal.classList.add('hide')
  }
}
