
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/LogIn/Login";
import SignUp from "../pages/SignUp/SignUp";
import ClassesPage from "../pages/Classes/ClassesPage";
import InstructorsPage from "../pages/Instructors/InstructorsPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import SelectedClasses from "../pages/Dashboard/StudentDashboard/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/StudentDashboard/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'classes',
                element: <ClassesPage></ClassesPage>
            },
            {
                path: 'instructors',
                element: <InstructorsPage></InstructorsPage>
            }    
        ]
    },
    {
        path:"dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:"selectedClasses",
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path:"enrolledClasses",
                element:<EnrolledClasses></EnrolledClasses>
            },
            {
                path:"paymentHistory",
                element:<PaymentHistory></PaymentHistory>
            }

        ]
    }
    
]);