import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/Header';

export async function getServerSideProps() {
  const response = await fetch('https://pokeapi.co/api/v2/item/');
  const data = await response.json();

  // An array of promises, which will be fulfilled by Promise.all
  const allItemsWithDetails = await Promise.all(
    data.results.map(async (item) => {
      const response = await fetch(item.url);
      const { id, name, cost, sprites } = await response.json();
      return {
        id,
        name,
        cost,
        sprites,
      };
    })
  );

  return {
    props: {
      items: allItemsWithDetails,
    },
  };
}

function ShoppingItem({ item, onAddItemToCart }) {
  return (
    <li>
      <Image
        src={item.sprites?.default}
        width={30}
        height={30}
        alt={item.name}
      />
      <div>
        <h3>{item.name}</h3>
        <p>{item.cost} ¥</p>
        <button onClick={() => onAddItemToCart(item)}>Add Item</button>
      </div>
    </li>
  );
}

export default function Home({ items }) {
  const [cart, setCart] = useState([]);
  console.log(items);
  function addToCart(item) {
    setCart([item, ...cart]);
  }

  return (
    <main>
      <Header>Poké Mart Online Shop</Header>
      {cart.length > 0 && (
        <>
          <h2>Cart</h2>
          <ul>
            {cart.map((cartItem) => (
              <ShoppingItem key={cartItem.id} item={cartItem} />
            ))}
          </ul>
          <hr />
        </>
      )}
      <ul>
        {items &&
          items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onAddItemToCart={addToCart}
            />
          ))}
      </ul>
    </main>
  );
}
