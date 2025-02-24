import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} variant="default" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

