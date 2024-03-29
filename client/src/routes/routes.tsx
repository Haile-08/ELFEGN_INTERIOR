import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import {
  Admin,
  AdminLogin,
  BlogComments,
  BlogDispaly,
  BlogList,
  BlogPost,
  BuyerOrder,
  BuyerPage,
  BuyerProfile,
  BuyerShop,
  Dashboard,
  GiftPage,
  HomeBlogsPage,
  HomeGiftPage,
  HomePage,
  HomeTestimonialPage,
  LandingPage,
  OrderDelivered,
  OrderPending,
  Page1,
  Page2,
  Page3,
  Payment,
  PaymentFailure,
  PaymentLoading,
  PaymentSuccess,
  ProductList,
  ProductPost,
  Request,
  Reset,
  Signup,
} from "../components";
import { useSelector } from "react-redux";
import Checkout from "../components/checkout/Checkout";
import SignIn from "../components/signin/SignIn";

function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

function Routes() {
  const isAdmin = Boolean(useSelector((state: any) => state.auth.adminToken));
  const isUser = Boolean(useSelector((state: any) => state.auth.userToken));
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/gift",
          element: <HomeGiftPage />,
        },
        {
          path: "/testimonial",
          element: <HomeTestimonialPage />,
        },
        {
          path: "/blogs",
          element: <HomeBlogsPage />,
        },
        
      ],
    },
    {
      path: "/blogdisplay/:id",
      element: <BlogDispaly />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/account/login",
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/account/page",
      element: <Signup />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/account/page/1",
          element: <Page1 />,
        },
        {
          path: "/account/page/2",
          element: <Page2 />,
        },
        {
          path: "/account/page/3",
          element: <Page3 />,
        },
        {
          path: "/account/page/password/request",
          element: <Request />,
        },
        {
          path: "/account/page/password/reset/:token/:id",
          element: <Reset />,
        },
      ],
    },
    {
      path: "/admin",
      element: isAdmin ? <Admin /> : <Navigate to="/admin/login" />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/admin/blog/post",
          element: <BlogPost />,
        },
        {
          path: "/admin/blog/list",
          element: <BlogList />,
        },
        { path: "/admin/blog/list/comments/:id", element: <BlogComments /> },
        {
          path: "/admin/product/post",
          element: <ProductPost />,
        },
        {
          path: "/admin/product/list",
          element: <ProductList />
        },
        {
          path: "/admin/order/delivered",
          element: <OrderDelivered/>
        },
        {
          path: "/admin/order/pending",
          element: <OrderPending/>
        },
        {
          path: "/admin/dashdoard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
      errorElement: <ErrorPage />,
    },
    
    {
      path: "/buyerpage",
      element: <BuyerPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/buyerpage/shop",
          element:  <BuyerShop /> ,
        },
        {
          path: "/buyerpage/profile",
          element: isUser ? <BuyerProfile />: <Navigate to="/account/login" />,
        },
        {
          path: "/buyerpage/order",
          element: isUser ? <BuyerOrder />: <Navigate to="/account/login" />,
        },
        {
          path: "/buyerpage/payment",
          element: isUser ? <Payment />: <Navigate to="/account/login" />,
          children: [
            {
              path: "/buyerpage/payment/success",
              element: <PaymentSuccess />,
            },
            {
              path: "/buyerpage/payment/failure",
              element: <PaymentFailure />,
            },
            {
              path: "/buyerpage/payment/verify",
              element: <PaymentLoading />,
            },
          ],
        },
      ],
    },
    {
      path: "/giftpage/:id",
      element: <GiftPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/giftpage/:id/checkout",
      element: <Checkout />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
