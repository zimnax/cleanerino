const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { products, deliveryCost, tax, combineProd, address } = req.body;
    const arr = JSON.parse(combineProd);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.unit_amount,
      },
      quantity: product.quantity,
    }));
    // if (tax > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Tax",
        },
        unit_amount: Math.round(tax * 100), // Переводимо суму в копійки
      },
      quantity: 1,
    });
    // }
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(deliveryCost * 100), // Переводимо суму в копійки
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems, // Використовуємо передані дані про товари
      mode: "payment",
      success_url: `https://cleanerino.com/`,
      cancel_url: "https://cleanerino.com/",
    });
    if (session.id) {
      arr.forEach(async (el) => {
        try {
          const { id, product_name, short_description, files } = el;
          const dataToSend = {};
          dataToSend.name = address.name;
          dataToSend.address = `${address.street1}, ${address.city}, ${address.state}, ${address.zip},${address.country}`;
          dataToSend.shipping_total = deliveryCost;
          dataToSend.fees = tax;
          dataToSend.user_name = address.user_name;
          dataToSend.user_id = address.id;
          dataToSend.sesion_id = session.id;
          dataToSend.vendorId = el[0].vendorId;
          dataToSend.phone = address.phone;
          dataToSend.email = address.email;
          dataToSend.ship_info = el[0].shipping.object_id;
          dataToSend.order_status = "New";
          dataToSend.payment_status = "not paid";
          dataToSend.products = el;
          // Відправити запит з відфільтрованими даними
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/orders`,
            dataToSend
          );

          // Додати результат до масиву requests
          // requests.push(response.data);
        } catch (error) {
          console.error("Error sending request:", error);
          // Обробка помилки, якщо запит не вдалося відправити
        }
      });
    }
    //console.log("sessionId from create Session ", session.id);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Помилка при створенні сеансу оформлення замовлення:", error);
    res
      .status(500)
      .json({ error: "Помилка при створенні сеансу оформлення замовлення" });
  }
};
