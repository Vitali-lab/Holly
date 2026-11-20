import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../../components/loader/Loader";
import { seasonSelector, productsSelector } from "../../../selectors/";

const CollectionWidgetContainer = ({ className }) => {
  const products = useSelector(productsSelector);
  const seasons = useSelector(seasonSelector);
  const navigate = useNavigate();

  const collection = {
    winter: {
      name: "Зима",
      products: products.filter(
        (item) =>
          item.seasonId === seasons.find((season) => season.name === "Зима").id,
      ),
    },
    summer: {
      name: "Лето",
      products: products.filter(
        (item) =>
          item.seasonId === seasons.find((season) => season.name === "Лето").id,
      ),
    },
    autumn: {
      name: "Осень",
      products: products.filter(
        (item) =>
          item.seasonId ===
          seasons.find((season) => season.name === "Осень").id,
      ),
    },
    spring: {
      name: "Весна",
      products: products.filter(
        (item) =>
          item.seasonId ===
          seasons.find((season) => season.name === "Весна").id,
      ),
    },
  };

  const widgetVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const [page, setPage] = useState(0);
  const totalWinterPages = collection.winter.products.length;
  const totalSummerPages = collection.summer.products.length;
  const totalAutumnPages = collection.autumn.products.length;
  const totalSpringPages = collection.spring.products.length;
  const totalPages = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  console.log(collection);

  if (!seasons || !products) {
    return <Loader />;
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog?season=${"Осень"}`);
          }}
        >
          <img src={collection.autumn.products[page].images[0]} />
          <h2>{collection.autumn.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog?season=${"Лето"}`);
          }}
        >
          <img src={collection.summer.products[page].images[0]} />
          <h2>{collection.summer.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog?season=${"Зима"}`);
          }}
        >
          <img src={collection.winter.products[page].images[0]} />
          <h2>{collection.winter.name}</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={widgetVariants}
          className="collections"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            navigate(`/catalog?season=${"Весна"}`);
          }}
        >
          <img src={collection.spring.products[page].images[0]} />
          <h2>{collection.spring.name}</h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const CollectionWidget = styled(CollectionWidgetContainer)`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
align-items: center;
gap: 30px;
& .collections{
cursor: pointer;
position: relative;
width: 280px;
height: 400px;
background-color: transparent;
border-radius: 30px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
box-shadow: 0px 0px 10px 5px rgba(120, 120, 120, 0.24) inset;
transition: all 0.3s ease-in-out;
&:hover{
  transform: scale(1.1);
  
}
& h2 {
 position: absolute;
 bottom: 10px;
 left: 50px;
 font-size: 60px;
 color:white;
 text-shadow: 0px 1px 10px rgba(0,0,0,0.6);
 }
 & img{
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
  
}

`;
