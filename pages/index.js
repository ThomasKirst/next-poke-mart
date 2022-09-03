import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ShoppingItem from '../components/ShoppingItem';
import Image from 'next/image';

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

export default function Home({ items }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }
  function removeFromCart(item) {
    setCart(cart.filter((cartItem) => item.id !== cartItem.id));
  }

  return (
    <main>
      <AppHeader>
        <Header>Poké Mart Online Shop</Header>
        <Link href="/basket">
          <a>
            <Image
              src="/shopping_cart_icon.png"
              alt="Shopping Cart"
              width={60}
              height={60}
              layout="fixed"
            />
          </a>
        </Link>
      </AppHeader>
      {cart.length > 0 && (
        <>
          <Header size="medium">Cart</Header>
          <Cart>
            {cart.map((cartItem) => (
              <ShoppingItem
                key={cartItem.id}
                item={cartItem}
                onRemoveItemFromCart={removeFromCart}
                isInCart
              />
            ))}
          </Cart>
          <hr />
        </>
      )}
      <Header size="medium">Search Items</Header>
      <ProductList>
        {items &&
          items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onAddItemToCart={addToCart}
            />
          ))}
      </ProductList>
    </main>
  );
}

const ProductList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto;
  justify-items: center;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 60%;
`;

const Cart = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  margin: 0 auto;
  padding: 0;
  width: 90%;
`;

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;

  a {
    padding-top: 0.5rem;
  }
`;
