import { Coupon, Product } from "../../../types.ts";
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
  const {
    cart,
    addToCart,
    getCartItem,
    removeFromCart,
    updateQuantity,
    calculateTotal,
  } = useCart(selectedCoupon);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getCartItem={getCartItem}
        />
        <CartItemList
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
