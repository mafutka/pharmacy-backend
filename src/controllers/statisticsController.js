
import mongoose from "mongoose";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
import Order from "../models/order.js";
import { User } from "../models/user.js";

export const getStatistics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Магазини авторизованого користувача
    const shops = await Shop.find({ user: userId }).select("_id");
    const shopIds = shops.map((shop) => shop._id);

    // Кількість товарів у цих магазинах
    const totalProducts = await Product.countDocuments({
      shopId: { $in: shopIds },
    });

    // У цьому проєкті постачальниками поки вважаємо магазини
    const totalSuppliers = shops.length;

    // У статистиці враховуємо завершені замовлення
    const completedOrders = await Order.find({
      shop: { $in: shopIds },
      status: "completed",
    }).sort({ createdAt: -1 });

    // Групуємо замовлення за клієнтами
    const customersMap = new Map();

    for (const order of completedOrders) {
      const customerId = order.customer.toString();

      if (!customersMap.has(customerId)) {
        customersMap.set(customerId, {
          spent: 0,
          latestOrder: order.createdAt,
        });
      }

      const customerData = customersMap.get(customerId);
      customerData.spent += order.totalAmount;
    }

    const customerIds = [...customersMap.keys()];

    const users = await User.find({
      _id: { $in: customerIds },
    }).select("name email");

    const usersMap = new Map(
      users.map((user) => [user._id.toString(), user])
    );

    const customers = customerIds
      .map((id) => {
        const user = usersMap.get(id);
        const customerData = customersMap.get(id);

        if (!user || !customerData) return null;

        return {
          id,
          name: user.name ?? "",
          email: user.email ?? "",
          spent: Number(customerData.spent.toFixed(2)),
          latestOrder: customerData.latestOrder,
        };
      })
      .filter((customer) => customer !== null)
      .sort(
        (a, b) =>
          new Date(b.latestOrder).getTime() -
          new Date(a.latestOrder).getTime()
      )
      .slice(0, 5)
      .map(({ latestOrder, ...customer }) => customer);

    // Транзакції за сьогодні: завершені замовлення
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const todayOrders = await Order.find({
      shop: { $in: shopIds },
      status: "completed",
      createdAt: { $gte: startOfDay, $lte: now },
    }).sort({ createdAt: -1 });

    const transactions = todayOrders.map((order) => ({
      id: order._id.toString(),
      type: "Income",
      description: `Order #${order._id.toString().slice(-6)}`,
      amount: order.totalAmount,
      createdAt: order.createdAt,
    }));

    res.json({
      totalProducts,
      totalSuppliers,
      totalCustomers: customersMap.size,
      customers,
      transactions,
    });
  } catch (err) {
    next(err);
  }
};

export const getCustomerGoods = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(clientId)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const shops = await Shop.find({ user: userId }).select("_id");
    const shopIds = shops.map((shop) => shop._id);

    const customer = await User.findById(clientId).select("name email");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      customer: clientId,
      shop: { $in: shopIds },
      status: "completed",
    }).sort({ createdAt: -1 });

    const medicinesMap = new Map();

    for (const order of orders) {
      for (const item of order.items) {
        const productId = item.product.toString();

        if (!medicinesMap.has(productId)) {
          medicinesMap.set(productId, {
            productId,
            name: item.name,
            brand: item.brand ?? "",
            price: item.price,
            quantity: 0,
            total: 0,
          });
        }

        const medicine = medicinesMap.get(productId);
        medicine.quantity += item.quantity;
        medicine.total += item.price * item.quantity;
      }
    }

    const medicines = [...medicinesMap.values()].map((medicine) => ({
      ...medicine,
      total: Number(medicine.total.toFixed(2)),
    }));

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      customer: {
        id: customer._id.toString(),
        name: customer.name ?? "",
        email: customer.email ?? "",
      },
      medicines,
      totalSpent: Number(totalSpent.toFixed(2)),
    });
  } catch (err) {
    next(err);
  }
};