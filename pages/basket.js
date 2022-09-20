import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';

import Header from '../components/Header';

export default function ShoppingCart() {
  const [cart] = useLocalStorage('_cart', []);

  return (
    <main>
      <Header>Shopping Cart</Header>
      {cart.length > 0 && <Cart cart={cart} />}
      <Link href="/" passHref>
        <BackLink>Back to the shop</BackLink>
      </Link>
    </main>
  );
}

const BackLink = styled.a`
  display: block;
  margin: 4rem auto;
  color: #ccc;
  width: 100%;
`;

function Cart({ cart }) {
  const cartItems = cart.map(({ id, name, image, cost, count }) => (
    <CartItem key={id} name={name} image={image} cost={cost} count={count} />
  ));
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Product</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{cartItems}</tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Sum</td>
            <td>
              {cart
                .reduce(
                  (sum, cartItem) => sum + cartItem.cost * cartItem.count,
                  0
                )
                .toFixed(2)}{' '}
              ¥
            </td>
          </tr>
        </tfoot>
      </Table>
      <ActionBar>
        <BuyButton>Buy Now!</BuyButton>
      </ActionBar>
    </>
  );
}

function CartItem({ name, image, cost, count }) {
  return (
    <tr>
      <td>
        <Image src={image} height={30} width={30} alt={name} />
      </td>
      <td>{name}</td>
      <td>{cost} ¥</td>
      <td>{count}</td>
      <td>{(cost * count).toFixed(2)} ¥</td>
    </tr>
  );
}

const Table = styled.table`
  width: 90%;
  margin: 0 auto;

  th {
    text-align: left;
  }

  tfoot {
    font-weight: bold;
  }
`;

const ActionBar = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const BuyButton = styled.button`
  background-color: rebeccapurple;
  border: none;
  border-radius: 0.25rem;
  color: ivory;
  font-size: 120%;
  padding: 1rem;
  width: 12rem;
`;
