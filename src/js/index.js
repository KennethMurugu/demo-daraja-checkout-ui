import { addToCart, toggleCheckoutModal } from '../cart'
import { lnm } from './lnm'

window.addToCart = addToCart
window.toggleCheckoutModal = toggleCheckoutModal
window.lnm = lnm

console.log(`Running in ${process.env.NODE_ENV} mode`)
