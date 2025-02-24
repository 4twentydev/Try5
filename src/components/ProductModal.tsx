"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { addToCart } from "../store/cartSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductModalProps {
  productId: number
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        setProduct(response.data)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      }))
      onClose()
    }
  }

  if (!product) {
    return null
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <Badge variant="outline" className="w-fit">
            {product.category}
          </Badge>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-64 object-contain" />
          <Separator />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter>
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart - ${product.price.toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal

