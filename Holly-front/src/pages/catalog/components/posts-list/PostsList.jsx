import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Loader from "../../../../components/loader/Loader";
import { ProductCard } from "../../../../components/product-card/ProductCard";

const PostsListContainer = ({ className, products }) => {
  const [openSizesId, setOpenSizesId] = useState(null);
  const [activeButton, setActiveButton] = useState("");

  if (!products) {
    return <Loader />;
  }

  return (
    <div className={className}>
      {Array.isArray(products) && (
        <AnimatePresence>
          {products.map((post) => (
            <ProductCard
              key={post.id}
              post={post}
              openSizesId={openSizesId}
              setOpenSizesId={setOpenSizesId}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export const PostsList = styled(PostsListContainer)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);

  & i {
    cursor: pointer;
  }

  @media (max-width: 1280px) {
    & i:active {
      transform: scale(0.7);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 14px;
  }
`;
