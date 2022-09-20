import Link from 'next/link';
import styled from 'styled-components';
import Header from '../components/Header';
import ShoppingItem from '../components/ShoppingItem';
import Image from 'next/image';
import useLocalStorage from '../hooks/useLocalStorage';

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
        image: sprites?.default,
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
  const [cart, setCart] = useLocalStorage('_cart', []);

  function addToCart(item) {
    const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingCartItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === existingCartItem.id
            ? { ...existingCartItem, count: existingCartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
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
            {cart.length > 0 && <Counter>{cart.length}</Counter>}
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
    position: relative;
  }
`;

const Counter = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: purple;
  color: ivory;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0.5rem;
`;
