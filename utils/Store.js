import Cookies from 'js-cookie'
import { createContext, useReducer } from "react"

export const Store = createContext();

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            // Gettting new Data from the Action
            const newItem = action.payload;
            // Checking if the item already exists in our cart
            const existItem = state.cart.cartItems.find((item) => item.slug == newItem.slug);

            // if item exists replace it with new value else keep the items as they are

            // var cartItems;
            //     if (existItem) {
            //         // searching for item
            //         state.cart.cartItems.map((item) => {
            //             if (item.name == existItem.name) {
            //                 // replacing the item
            //                 cartItems = newItem;
            //             }

            //             else
            //                 //keeping the item as they are
            //                 cartItems = item;
            //         })

            //     }
            //     // if item doesnot exist add it to the list
            //     else {
            //         // adding item to the previous state
            //         [...state.cart.cartItems, newItem];
            //     }
            //     // returning the new state
            //     return { ...state, cart: { ...state.cart, newItem } }
            // }

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
            return { ...state, cart: { ...state.cart, cartItems } };
        }


        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => { item.slug !== action.payload.slug });
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_RESET':
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress: { location: {} },
                    paymentMethod: '',
                },
            };
        default:
            return state;
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    // Store.Provider is comming from the useContext hook 
    return <Store.Provider value={value}>{children}</Store.Provider>;
}



