const fs = require('fs');

let dishCard = fs.readFileSync('src/components/DishCard.js', 'utf8');

dishCard = dishCard.replace(
  'const { addToCart, removeFromCart, getItemQuantity } = useCart();',
  'const { addToCart, removeFromCart, getItemQuantity } = useCart();\n  const { formatPrice } = useCurrency();'
);

fs.writeFileSync('src/components/DishCard.js', dishCard, 'utf8');
console.log('DishCard.js updated successfully!');
