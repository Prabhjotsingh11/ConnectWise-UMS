import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeComponent from "./Component/home.jsx";
import LoginComponent from "./Component/login.jsx";
import SignupComponent from "./Component/signup.jsx";
import GigHome from "./Component/gigWorker/gigHome.jsx";
import GigLogin from "./Component/gigWorker/giglogin.jsx";
import GigWorkerSignup from "./Component/gigWorker/gigSignup.jsx";
import Workers from "./Component/workers.jsx";
import Booking from "./Component/booking.jsx";
import Dashboard from "./Component/dashboard.jsx";
import GigDashboard from "./Component/gigWorker/gigDashboard.jsx";
import History from "./Component/history.jsx";
import Review from "./Component/review.jsx";
import Gigpreview from "./Component/gigpreview.jsx";
import Tickets from "./Component/completed_tickets.jsx";
import NotFound from "./Component/notFound.jsx";
import Unauthorized from "./Component/notUser.jsx";
import LandingPage from "./Component/landingpage.jsx";
import AboutUs from "./Component/aboutus.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default page when the user visits "/"
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <HomeComponent />,
      },
      {
        path: "giglogin",
        element: <GigLogin />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "/signup",
        element: <SignupComponent />,
      },
      {
        path: "gigSignup",
        element: <GigWorkerSignup />,
      },
      {
        path: "/all/:category",
        element: <Workers />,
      },
      {
        path: "booking/:workerId",
        element: <Booking />,
      },
      {
        path: "gighome",
        element: <GigHome />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "gigdashboard",
        element: <GigDashboard />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "review/:gigemail/:queryid",
        element: <Review />,
      },
      {
        path: "preview/:workerEmail",
        element: <Gigpreview />,
      },
      {
        path: "completed_tickets",
        element: <Tickets />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
