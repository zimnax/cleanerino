export function changeQuantityInCart(uid, newQuantity) {
  // Отримуємо корзину з localStorage
  let cartItems = [];
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // Змінюємо кількість товару в корзині за його унікальним ідентифікатором
  const updatedCart = cartItems.map((item) => {
    if (item.uid === uid) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  // Зберігаємо оновлену корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
