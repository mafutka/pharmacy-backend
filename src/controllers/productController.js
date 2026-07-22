import * as productService from "../services/productService.js"
import { productSchema } from "../validation/productValidation.js"

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, category, search } = req.query

    const data = await productService.getAllProducts({
      page,
      category,
      search,
    })

    res.json(data)
  } catch {
    res.status(500).json({ message: "Error" })
  }
}

export const getProducts = async (req, res) => {
  try {
    const { shopId } = req.params
    const page = Number(req.query.page) || 1

    const data = await productService.getProductsByShop(shopId, page)

    res.json(data)
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" })
  }
}

export const addProduct = async (req, res) => {
  try {
    req.body.price = Number(req.body.price)
    req.body.stock = Number(req.body.stock)

    const { error } = productSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { name, price, category, brand, stock } = req.body

   const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const product = await productService.createProduct(req.params.shopId, {
      name,
      brand,
      price,
      category,
      stock,
      image: imageUrl,
    })

    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch {
    res.status(500).json({ message: "Error" })
  }
}

export const editProduct = async (req, res) => {
  try {
    const updateData = { ...req.body }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    const updated = await productService.updateProduct(
      req.params.productId,
      updateData,
    )

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

export const removeProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.json({ message: "Deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
