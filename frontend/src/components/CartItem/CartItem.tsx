import React from "react";
import type { CartItemType } from "../../types/CartItemType";
import { useCart } from "../../context/CartContext";

type Props = {
  item: CartItemType;
  maxStock?: number;
};

const CartItem: React.FC<Props> = ({ item, maxStock }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-red-700 font-bold">${item.price.toLocaleString()}</p>
        <div className="flex items-center mt-2 gap-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            className={`px-2 py-1 bg-gray-200 rounded${
              maxStock !== undefined && item.quantity >= maxStock
                ? " opacity-50 cursor-not-allowed hover:bg-gray-200"
                : " hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={maxStock !== undefined && item.quantity >= maxStock}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold">
          Subtotal: ${(item.price * item.quantity).toLocaleString()}
        </span>
        <button
          className="mt-2 text-sm text-red-600 hover:underline"
          onClick={() => removeFromCart(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
