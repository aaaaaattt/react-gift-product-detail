import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return <div>{productId}</div>;
};

export default ProductDetailPage;
