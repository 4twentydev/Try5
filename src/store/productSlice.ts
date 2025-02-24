import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const fetchProducts = createAsyncThunk<Product[], string>("products/fetchProducts", async (category = "") => {
  const url = category ? `https://fakestoreapi.com/products/category/${category}` : "https://fakestoreapi.com/products"
  const response = await axios.get<Product[]>(url)
  return response.data
})

interface ProductState {
  products: Product[]
  category: string
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ProductState = {
  products: [],
  category: "",
  status: "idle",
  error: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
  },
})

export const { setCategory } = productSlice.actions
export default productSlice.reducer

