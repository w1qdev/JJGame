import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket(state, action) {
      state.basket.push(action.payload)
    },

    removeItemFromBasket(state, action) {
      state.basket = state.basket.filter(item => item.id !== action.payload.id)
    },

    clearBasket(state) {
      state.basket = []
    },

    addBasketItemCount(state, action) {
      state.basket = state.basket.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, count: item.count + 1 }
        }
        
        return { ...item }
      })
    },

    subtractBasketItemCount(state, action) {
      state.basket = state.basket.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, count: item.count - 1 }
        }
        
        return { ...item }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItemToBasket, removeItemFromBasket, clearBasket, addBasketItemCount, subtractBasketItemCount } = basketSlice.actions
export default basketSlice.reducer