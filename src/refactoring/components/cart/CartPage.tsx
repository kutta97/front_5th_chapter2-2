import { CartItem, Coupon, Product } from "../../../types.ts";
import { useCart } from "../../hooks";
import { ProductList } from "./ProductList.tsx";
import { CartItemList } from "./CartItemList.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const CartPage = ({
  products,
  coupons,
  selectedCoupon,
  applyCoupon,
}: Props) => {
  const { cart, addToCart, removeFromCart, updateQuantity, calculateTotal } =
    useCart(selectedCoupon);

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getRemainingStock={getRemainingStock}
          getMaxDiscount={getMaxDiscount}
        />
        <CartItemList
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getAppliedDiscount={getAppliedDiscount}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
