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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">My Store</h1>
        <div className="flex items-center gap-4">
          <SearchBox />
          <Cart />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header

