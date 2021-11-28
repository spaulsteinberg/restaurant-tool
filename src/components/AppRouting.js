import React from 'react'
import { Switch, Route } from 'react-router-dom';
import ResetPassword from './auth/ResetPassword';
import { 
    DashboardPage, 
    ViewProfilePage, 
    UpdateCredentialsPage, 
    OrdersPage, 
    OrderReceiptPage, 
    InventoryPage,
    MenuHomePage,
    MenuViewPage,
    PageNotFound
} from '../pages';
import SignUp from './auth/SignUp';
import PrivateRoute from './utility/PrivateRoute';
import Login from './auth/Login';
import '../components/main/main-styles.scss'

const AppRouting = () => {
    const privateRoutes = [
        { path: '/', component: DashboardPage },
        { path: "/dashboard", component: DashboardPage },
        { path: "/orders", component: OrdersPage },
        { path: "/profile/view", component: ViewProfilePage },
        { path: "/profile/update", component: UpdateCredentialsPage },
        { path: "/profile/signup", component: SignUp },
        { path: '/orders/order/:id', component: OrderReceiptPage },
        { path: '/menus', component: MenuHomePage },
        { path: "/menus/view", component: MenuViewPage },
        { path: '/inventory', component: InventoryPage }
    ];
    const publicRoutes = [
        { path: "/login", component: Login }, 
        { path: "/forgot-password", component: ResetPassword }, 
        { path: "*", component: PageNotFound }
    ];

    return (
        <Switch>
            {privateRoutes.map(route => <PrivateRoute key={route.path} exact path={route.path} component={route.component} />)}
            {publicRoutes.map(route => <Route key={route.path} exact path={route.path} component={route.component} />)}
        </Switch>
    )
}

export default AppRouting
