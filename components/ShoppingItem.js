import Image from 'next/image';
import styled from 'styled-components';

export default function ShoppingItem({
  item,
  onAddItemToCart,
  onRemoveItemFromCart,
  isInCart = false,
}) {
  return (
    <Product isInCart={isInCart}>
      <Image
        src={item.sprites?.default}
        width={30}
        height={30}
        layout="fixed"
        alt={item.name}
      />
      <div>
        <h3>{item.name}</h3>
        <p>{item.cost} ¥</p>
        {isInCart ? (
          <button onClick={() => onRemoveItemFromCart(item)}>
            Remove Item
          </button>
        ) : (
          <button onClick={() => onAddItemToCart(item)}>Add Item</button>
        )}
      </div>
    </Product>
  );
}

const Product = styled.li`
  display: flex;
  list-style: none;
  width: ${(props) =>
    props.isInCart ? 'calc(20% - 0.8rem)' : 'calc(100% - 0.5rem)'};

  h3 {
    font-size: ${(props) => (props.isInCart ? '85%' : '100%')};
    margin: 0.2rem 0 0.2rem;
  }

  button {
    font-size: ${(props) => (props.isInCart ? '75%' : '100%')};
  }
`;
