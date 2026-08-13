import * as productService from "../services/productService.js"
import { productSchema } from "../validation/productValidation.js"
import Shop from "../models/shop.js"

const checkShopOwnership = async (shopId, userId) => {
  return await Shop.findOne({
    _id: shopId,
    user: userId,
  })
}

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      category,
      search,
    } = req.query

    const data = await productService.getAllProducts({
      page: Number(page),
      category,
      search,
    })

    res.json(data)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: "Error fetching products",
    })
  }
}

// GET PRODUCTS OF MY SHOP
export const getProducts = async (req, res) => {
  try {
    const { shopId } = req.params

    const shop = await checkShopOwnership(
      shopId,
      req.user.id
    )

    if (!shop) {
      return res.status(403).json({
        message: "You don't have access to this shop",
      })
    }

    const page = Number(req.query.page) || 1

    const data = await productService.getProductsByShop(
      shopId,
      page
    )

    res.json(data)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: "Error fetching products",
    })
  }
}

// CREATE PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { shopId } = req.params

    const shop = await checkShopOwnership(
      shopId,
      req.user.id
    )

    if (!shop) {
      return res.status(403).json({
        message: "You don't have access to this shop",
      })
    }

    req.body.price = Number(req.body.price)
    req.body.stock = Number(req.body.stock)

    const { error } = productSchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }

    const {
      name,
      price,
      category,
      brand,
      stock,
      description,
    } = req.body

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null

    const product =
      await productService.createProduct(shopId, {
        name,
        brand,
        price,
        category,
        stock,
        description,
        image: imageUrl,
      })

    res.status(201).json(product)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: err.message,
    })
  }
}

// GET ONE PRODUCT
export const getOneProduct = async (req, res) => {
  try {
    const product =
      await productService.getProductById(
        req.params.productId
      )

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    res.json(product)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: "Error fetching product",
    })
  }
}

// EDIT PRODUCT
export const editProduct = async (req, res) => {
  try {
    const {
      shopId,
      productId,
    } = req.params

    const shop = await checkShopOwnership(
      shopId,
      req.user.id
    )

    if (!shop) {
      return res.status(403).json({
        message: "You don't have access to this shop",
      })
    }

    const product =
      await productService.getProductById(productId)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    if (product.shopId.toString() !== shopId) {
      return res.status(403).json({
        message: "Product doesn't belong to this shop",
      })
    }

    const updateData = {
      ...req.body,
    }

    if (updateData.price !== undefined) {
      updateData.price = Number(updateData.price)
    }

    if (updateData.stock !== undefined) {
      updateData.stock = Number(updateData.stock)
    }

    if (req.file) {
      updateData.image =
        `/uploads/${req.file.filename}`
    }

    const updated =
      await productService.updateProduct(
        productId,
        updateData
      )

    res.json(updated)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: err.message,
    })
  }
}

// DELETE PRODUCT
export const removeProduct = async (req, res) => {
  try {
    const {
      shopId,
      productId,
    } = req.params

    const shop = await checkShopOwnership(
      shopId,
      req.user.id
    )

    if (!shop) {
      return res.status(403).json({
        message: "You don't have access to this shop",
      })
    }

    const product =
      await productService.getProductById(productId)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    if (product.shopId.toString() !== shopId) {
      return res.status(403).json({
        message: "Product doesn't belong to this shop",
      })
    }

    await productService.deleteProduct(productId)

    res.json({
      message: "Deleted",
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: err.message,
    })
  }
}