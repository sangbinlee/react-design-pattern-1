import React, { useContext, useState } from 'react';
import {
  ShoppingCartContext,
  useTotalPrice,
  useTotalCouponPrice,
  useTotalShippingPrice,
} from './ShoppingCartContext';
import { Item } from './type';

const items: Item[] = [
  {
    id: 'p1',
    name: 'iPad',
    price: 1,
  },
  {
    id: 'p2',
    name: 'iPhone',
    price: 3,
  },
];

const ProductList = ({ addToCart }: { addToCart: (item: Item) => void }) => {
  return (
    <div>
      <h2>상품목록(Product List)</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.price}
            <button onClick={() => addToCart(item)}>Add to Card</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShoppingApplicationNew = () => {
  const context = useContext(ShoppingCartContext);
  const { items, addItem, removeItem, clearCart } = context;
  const totalPrice = useTotalPrice();
  const totalCouponPrice = useTotalCouponPrice();
  const totalShippingPrice = useTotalShippingPrice();
  // 체크된 항목 관리
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (uniqKey: string) => {
    setCheckedItems((prev) =>
      prev.includes(uniqKey)
        ? prev.filter((key) => key !== uniqKey)
        : [...prev, uniqKey],
    );
  };

  // 선택된 항목만 삭제
  const removeCheckedItems = () => {
    checkedItems.forEach((key) => {
      const item = items.find((i) => i.uniqKey === key);
      if (item) removeItem(item);
    });
    setCheckedItems([]); // 체크 초기화
  };
  // 전체 선택
  const selectAll = () => {
    const allKeys = items.map((item) => item.uniqKey!);
    setCheckedItems(allKeys);
  };

  // 전체 해제
  const deselectAll = () => {
    setCheckedItems([]);
  };
  return (
    <div>
      <ProductList addToCart={addItem} />
      <h2>장바구니(Shopping Cart)</h2>
      <button onClick={clearCart}>전체 삭제</button>
      <button onClick={removeCheckedItems}>선택 삭제</button>
      <button onClick={selectAll}>전체 선택</button>
      <button onClick={deselectAll}>전체 해제</button>
      <ul style={{ listStyleType: 'none' }}>
        {items.map((item, index) => (
          <li key={item.uniqKey}>
            <input
              type="checkbox"
              checked={checkedItems.includes(item.uniqKey!)}
              onChange={() => toggleCheck(item.uniqKey!)}
            />
            {/* 체크박스 추가 */}
            {index + 1}. {item.uniqKey} - {item.name} - {item.price}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>총 상품 가격(Total Price): {totalPrice}</p>
      <p>총 쿠폰할인(Total Coupon Discount): {totalCouponPrice}</p>
      <p>총 배송비(Total Shipping Cost): {totalShippingPrice}</p>
    </div>
  );
};

export default ShoppingApplicationNew;
