async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error(`error: ${res.status}`);

  const data = await res.json();
  const products = data.map((item) => {
    return {
      title: item.title,
      price: item.price,
      img: { src: item.image, alt: item.title },
      id: item.id,
      description: item.description,
    };
  });

  return products;
}
export default getProducts;
