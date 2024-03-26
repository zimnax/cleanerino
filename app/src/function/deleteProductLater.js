export function removeFromLater(uid) {
  // Отримуємо корзину з localStorage
  let cartItems = [];
  const storedCart = localStorage.getItem("later");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // Видаляємо товар з корзини за його унікальним ідентифікатором
  const updatedCart = cartItems.filter((item) => item.uid !== uid);

  // Зберігаємо оновлену корзину в localStorage
  localStorage.setItem("later", JSON.stringify(updatedCart));
}
