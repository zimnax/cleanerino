export function removeFromCart(uid) {
  // Отримуємо корзину з localStorage
  let cartItems = [];
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // Видаляємо товар з корзини за його унікальним ідентифікатором
  const updatedCart = cartItems.filter((item) => item.uid !== uid);

  // Зберігаємо оновлену корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
