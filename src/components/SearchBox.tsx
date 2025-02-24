"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCategory } from "../store/productSlice"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SearchBox: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories")
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value))
  }

  return (
    <Select onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SearchBox

