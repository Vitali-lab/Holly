// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWidgets } from '../../../features/widgets/widgets';
import { MainWidget } from './MainWidget';
import styled from 'styled-components';

const AnimateMainWidgetContainer = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const widgets = useSelector((state) => state.widgets.widgets);
  const totalPages = widgets?.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWidgets());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const widgetVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        variants={widgetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => navigate('/catalog')}
      >
        {widgets[page] && (
          <MainWidget
            bigText={widgets[page].mainText}
            smallText={widgets[page].subText}
            link={widgets[page].image}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const AnimateMainWidget = styled(AnimateMainWidgetContainer)`
  width: 100%;
`;
