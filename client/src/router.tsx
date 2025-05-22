// router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/Layout/MainLayout";
import HomePage from "@/pages/Home/Home";
import LoginForm from "./pages/Login/Login";
import SignUpForm from "./pages/SignUp/SignUp";
import About from "./pages/About/About";
import Features from "./pages/Features/Features";
import Premium from "./pages/Premium/Premium";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RootWrapper from "./Layout/RootWrapper";
import VerificationEmailSent from "./pages/EmailVerification/VerificationEmailSent";
import VerificationStatus from "./pages/EmailVerification/VerificationStatus";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordResetForm from "./pages/ForgotPassword/PasswordResetForm";
import DashBoardLayout from "./Layout/DashBoardLayout";
import Home from "./pages/Dashboard/Home";
import { DashboardProvider } from "./components/dashboard-provider";
import { MarketNews } from "./pages/Dashboard/News";
import { CurrencyConverter } from "./pages/Dashboard/CurrencyConvertor";
import StockHeatMap from "./pages/Dashboard/MarketTrends/StockHeatMap";
import CryptoHeatmap from "./pages/Dashboard/MarketTrends/CryptoHeatmap";
import { AiChatbot } from "./pages/Dashboard/Chatbot";
import EtfHeatmap from "./pages/Dashboard/MarketTrends/EtfHeatmap";
import ForexHeatMap from "./pages/Dashboard/MarketTrends/ForexHeatmap";
import StockPage from "./pages/Dashboard/StockPage";

const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Features",
    element: <Features />,
  },
  {
    path: "/Premium",
    element: <Premium />,
  },
];

const dashboardLayoutRoutes = [
  {
    path: "",
    index: true,
    element: <Home />,
  }, {
    path: "news",
    index: true,
    element: <MarketNews
     />,
  }, {
    path: "analysis",
    index: true,
    element: <StockPage/>,
  },
  {
    path: "finance-chatbot",
    index: true,
    element: <AiChatbot/>,
  },
  {
    path: "currencyconvertor",
    index: true,
    element: <CurrencyConverter/>,
  },
  {
    path: "stock-heatmap",
    index: true,
    element: <StockHeatMap/>,
  },
  {
    path: "crypto-heatmap",
    index: true,
    element: <CryptoHeatmap/>,
  },
  {
    path: "etf-heatmap",
    index: true,
    element: <EtfHeatmap/>,
  },{
    path: "forex-heatmap",
    index: true,
    element: <ForexHeatMap/>,
  }
  
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />, 
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "/Features",
            element: <Features/>,

          }, {
            path: "/dashboard",
            element:<DashboardProvider><DashBoardLayout/></DashboardProvider> ,
            children: dashboardLayoutRoutes,
          }
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
      },
      {
        path: "/Login",
        element: <LoginForm />,
      },
      {
        path: "/SignUp",
        element: <SignUpForm />,
      },
      {
        path: "/verifymail",
        element: <VerificationEmailSent />,
      },
      {
        path: "/verifymail/:verificationToken",
        element: <VerificationStatus />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <PasswordResetForm />,
      }
    ],
  },
]);

export default router;
