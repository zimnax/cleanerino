const stripe = require("stripe")(
  "sk_test_51OlEOQERovMWO6hiUtBocB6iaJLcv3cohSdabNsd5KE6HXe0VxDu30ehRkimVwHEM4Vdt6xQTZUpDGPaJRaVlCJ600kuacI4Zo"
);
exports.createCheckoutSession = async (req, res) => {
  try {
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "usd",

    //         product_data: {
    //           name: "Your Product Name",
    //           description: "Your Product Description",
    //           images: ["https://example.com/your-image.jpg"],
    //         },
    //         unit_amount: 1000, // Ціна в центах (наприклад, $10.00)
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",

    //   success_url: "https://example.com/success", // URL перенаправлення після успішної оплати
    //   cancel_url: "https://example.com/cancel", // URL перенаправлення після скасованої оплати
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "Your Product Name",
              description: "Your Product Description",
              images: ["https://example.com/your-image.jpg"],
            },
            unit_amount: 1000, // Ціна в центах (наприклад, $10.00)
          },
          quantity: 1,
        },
      ], // Додані товари
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Помилка при створенні сеансу оформлення замовлення:", error);
    res
      .status(500)
      .json({ error: "Помилка при створенні сеансу оформлення замовлення" });
  }
};
