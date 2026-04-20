
export const getStatistics = async (req, res) => {
  try {
    res.json({
      totalProducts: 10,
      totalCustomers: 5,
      totalSuppliers: 3,
      revenue: 5000,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
};