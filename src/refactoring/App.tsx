import { useState } from "react";
import { CartPage } from "./components/cart/CartPage.tsx";
import { AdminPage } from "./components/admin/AdminPage.tsx";
import { Coupon, Product } from "../types.ts";
import { useCoupons, useProducts } from "./hooks";
import { Button } from "./components/ui/Button";

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, selectedCoupon, addCoupon, applyCoupon } =
    useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <Button
            onClick={() => setIsAdmin(!isAdmin)}
            variant="default"
            size="md"
          >
            {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
          </Button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage
            products={products}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
          />
        )}
      </main>
    </div>
  );
};

export default App;
