"use client"

import { Provider } from "react-redux"
import store from "@/store"
import Header from "@/components/Header"
import ProductList from "@/components/ProductList"

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <ProductList />
        </main>
      </div>
    </Provider>
  )
}
