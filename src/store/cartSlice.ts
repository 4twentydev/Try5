import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  count: number
}

const initialState: CartState = {
  items: [],
  count: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.count += 1
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        state.count -= item.quantity
        state.items = state.items.filter(item => item.id !== action.payload)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        const quantityDiff = action.payload.quantity - item.quantity
        item.quantity = action.payload.quantity
        state.count += quantityDiff
      }
    },
    clearCart: (state) => {
      state.items = []
      state.count = 0
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

