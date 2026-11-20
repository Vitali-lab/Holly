import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  max-width: 320px;
  border-radius: 24px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .skeleton-line,
  & .skeleton-image,
  & .skeleton-badge {
    background: linear-gradient(
      90deg,
      rgba(226, 232, 240, 0.9) 25%,
      rgba(203, 213, 225, 0.8) 37%,
      rgba(226, 232, 240, 0.9) 63%
    );
    background-size: 400px 100%;
    animation: ${shimmer} 1.4s ease infinite;
    border-radius: 12px;
  }

  & .skeleton-image {
    width: 100%;
    height: 220px;
    border-radius: 18px;
  }

  & .skeleton-line {
    height: 16px;
  }

  & .skeleton-line.short {
    width: 60%;
  }

  & .skeleton-line.full {
    width: 100%;
  }

  & .skeleton-line.medium {
    width: 80%;
  }

  & .skeleton-badge {
    width: 90px;
    height: 32px;
    border-radius: 999px;
  }
`;

export const ProductSkeleton = () => (
  <SkeletonCard>
    <div className="skeleton-image" />
    <div className="skeleton-line full" />
    <div className="skeleton-line medium" />
    <div className="skeleton-line short" />
    <div className="skeleton-badge" />
  </SkeletonCard>
);

