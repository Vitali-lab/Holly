import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { AnimationRouter } from './AnimationRouter';
import PrivateRoute from './PrivateRouter';
import Loader from '../../shared/ui/loader/Loader';

export const AppRouter = () => {
  const Main = lazy(() => import('../../pages').then((module) => ({ default: module.Main })));
  const Catalog = lazy(() => import('../../pages').then((module) => ({ default: module.Catalog })));
  const Product = lazy(() => import('../../pages').then((module) => ({ default: module.Product })));
  const AboutUs = lazy(() => import('../../pages').then((module) => ({ default: module.AboutUs })));
  const Delivery = lazy(() =>
    import('../../pages').then((module) => ({ default: module.Delivery }))
  );
  const Cart = lazy(() => import('../../pages').then((module) => ({ default: module.Cart })));
  const Order = lazy(() => import('../../pages').then((module) => ({ default: module.Order })));
  const Favorites = lazy(() =>
    import('../../pages').then((module) => ({ default: module.Favorites }))
  );
  const UserCabinet = lazy(() =>
    import('../../pages').then((module) => ({ default: module.UserCabinet }))
  );
  const AdminPanel = lazy(() =>
    import('../../pages').then((module) => ({ default: module.AdminPanel }))
  );
  const EditProduct = lazy(() =>
    import('../../pages').then((module) => ({ default: module.EditProduct }))
  );
  const AddProduct = lazy(() =>
    import('../../pages').then((module) => ({ default: module.AddProduct }))
  );
  const EditParams = lazy(() =>
    import('../../pages').then((module) => ({ default: module.EditParams }))
  );
  const UsersOrders = lazy(() =>
    import('../../pages').then((module) => ({ default: module.UsersOrders }))
  );
  const Widgets = lazy(() => import('../../pages').then((module) => ({ default: module.Widgets })));
  const NotFound = lazy(() =>
    import('../../pages').then((module) => ({ default: module.NotFound }))
  );

  const location = useLocation();

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimationRouter component={<Main />} />} />
            <Route path="/catalog" element={<AnimationRouter component={<Catalog />} />} />
            <Route path="/catalog/:id" element={<AnimationRouter component={<Product />} />} />
            <Route path="/about-us" element={<AnimationRouter component={<AboutUs />} />} />
            <Route path="/delivery" element={<AnimationRouter component={<Delivery />} />} />
            <Route path="/cart" element={<AnimationRouter component={<Cart />} />} />
            <Route
              path="/cart/order/:orderId"
              element={<AnimationRouter component={<Order />} />}
            />
            <Route path="/favorites" element={<AnimationRouter component={<Favorites />} />} />
            <Route
              path="/user-cabinet/:id"
              element={<AnimationRouter component={<UserCabinet />} />}
            />
            <Route
              path="/admin-panel"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<AdminPanel />} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-panel/edit-product/:id"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<EditProduct />} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-panel/add-product/"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<AddProduct />} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-panel/edit-params/"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<EditParams />} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-panel/users-orders/"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<UsersOrders />} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-panel/edit-widgets/"
              element={
                <PrivateRoute>
                  <AnimationRouter component={<Widgets />} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<AnimationRouter component={<NotFound />} />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};
