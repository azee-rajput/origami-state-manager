import { useEffect, useState } from "react";
import { getProducts, handleAddToCart, handleAddToFavorite } from "../../utils";
import "./home.css";
import store from "../../utils/store";
import { useStateListener } from "oopsies-state-master";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { stateValue: cartItems } = useStateListener("cart", store);
  const { stateValue: favoriteItems } = useStateListener("favorite", store);

  const getAllProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className='products-container'>
        {products.map((product: any) => (
          <div key={product.id} className='product-card'>
            <span>
              <img
                src={product.image}
                alt={product.title}
                className='product-img'
              />
              <p>${product.price}</p>
              <h5 className='product-title'>{product.title}</h5>
            </span>
            <span className='product-actions'>
              <button onClick={() => handleAddToCart(product.id)}>
                {!cartItems.includes(product.id) ? "Add to" : "Remove from"}{" "}
                cart
              </button>
              <button onClick={() => handleAddToFavorite(product.id)}>
                {!favoriteItems.includes(product.id)
                  ? "Add to "
                  : "Remove from "}
                favorites
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
