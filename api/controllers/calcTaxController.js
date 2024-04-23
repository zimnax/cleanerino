const stripe = require("stripe")(
  "sk_test_51OlEOQERovMWO6hiUtBocB6iaJLcv3cohSdabNsd5KE6HXe0VxDu30ehRkimVwHEM4Vdt6xQTZUpDGPaJRaVlCJ600kuacI4Zo"
);
exports.calcTax = async (req, res) => {
  try {
    const { amount, address } = req.body;
    console.log(typeof amount);
    const calculation = await stripe.tax.calculations.create({
      currency: "usd",
      line_items: [
        {
          amount,
          reference: "L1",
        },
      ],
      customer_details: {
        address,
        address_source: "shipping",
      },
    });

    res.status(200).json({ calculation });
  } catch (error) {
    console.error("Error calculating tax:", error);
    res.status(500).json({ error: "Error calculating tax" });
  }
};
