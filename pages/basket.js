import Link from 'next/link';
import Header from '../components/Header';

export default function ShoppingCart() {
  return (
    <main>
      <Header>Shopping Cart</Header>
      <Link href="/">Back to the shop</Link>
    </main>
  );
}
