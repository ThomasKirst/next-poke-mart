export default function Header({ size = 'large', children }) {
  if (size === 'medium') {
    return <h2>{children}</h2>;
  }
  return <h1>{children}</h1>;
}
