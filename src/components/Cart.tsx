"use client"

import { useSelector, useDispatch } from "react-redux"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import type { RootState } from "@/store"
import { removeFromCart, updateQuantity } from "@/store/cartSlice"
import { Separator } from "@/components/ui/separator"

export function Cart() {
  const dispatch = useDispatch()
  const { items, count } = useSelector((state: RootState) => state.cart)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {count > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {count}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({count} items)</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mb-4" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium line-clamp-2">{item.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="pt-4">
            <Separator className="my-4" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
} 