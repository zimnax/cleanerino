export function moveItemToLater(uid) {
  // Отримуємо дані товару з корзини
  let cartItems = [];
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // Знаходимо товар у корзині
  const itemToMove = cartItems.find((item) => item.uid === uid);

  if (itemToMove) {
    // Додаємо товар до списку "Save for Later"
    const laterItem = { ...itemToMove, quantity: 1, price: itemToMove.price };

    // Отримуємо дані товарів у списку "Save for Later"
    let laterItems = [];
    const storedLater = localStorage.getItem("later");
    if (storedLater) {
      laterItems = JSON.parse(storedLater);
    }

    // Додаємо товар до списку "Save for Later"
    laterItems.push(laterItem);

    // Зберігаємо оновлений список "Save for Later" у localStorage
    localStorage.setItem("later", JSON.stringify(laterItems));

    // Видаляємо товар з корзини
    const updatedCart = cartItems.filter((item) => item.uid !== uid);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Повертаємо оновлені дані списку "Save for Later"
    return laterItems;
  }
}
