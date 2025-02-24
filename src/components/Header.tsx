import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import SearchBox from "./SearchBox"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "./mode-toggle"
import { Cart } from "./Cart"

const Header: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count)

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <h1 className="text-2xl font-bold">My Store</h1>
        <div className="flex items-center space-x-4">
          <SearchBox />
          <Cart />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header

