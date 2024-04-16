import Swal from "sweetalert2";

export default function addToCart(uid, price, quantity = 1) {
  // Перетворюємо кількість на числовий тип даних
  quantity = parseInt(quantity);

  let cartItems = [];

  // отримуємо корзину з localStorage
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // перевіряємо чи товар вже є в корзині
  const existingProductIndex = cartItems.findIndex((item) => item.uid === uid);

  if (existingProductIndex !== -1) {
    // якщо товар вже є в корзині, збільшуємо кількість на вказану величину
    cartItems[existingProductIndex].quantity += quantity;
  } else {
    // якщо товару немає в корзині, додаємо його з вказаною кількістю
    cartItems.push({ uid: uid, quantity: quantity, price: price });
  }

  // зберігаємо оновлену корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
  Swal.fire({
    icon: "success",
    title: "Item in cart",
    confirmButtonColor: "#609966",
  });
}
