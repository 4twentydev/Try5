"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { fetchProducts } from "../store/productSlice"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"
import { Skeleton } from "@/components/ui/skeleton"

const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const { products, category, status, error } = useSelector((state: RootState) => state.products)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchProducts(category) as any)
  }, [dispatch, category])

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (status === "failed") {
    return <div className="text-center mt-8 text-destructive">Error: {error}</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product.id)} />
        ))}
      </div>
      {selectedProduct && <ProductModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

export default ProductList

