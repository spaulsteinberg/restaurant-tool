import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { 
    DashboardPage, 
    ViewProfilePage, 
    UpdateCredentialsPage, 
    OrdersPage, 
    OrderReceiptPage, 
    InventoryPage,
    MenuHomePage,
    MenuViewPage,
    ConfigureHomePage,
    SignUpPage,
    LoginPage,
    ResetPasswordPage,
    PageNotFound
} from '../pages';
import PrivateRoute from './utility/PrivateRoute';
import '../components/main/main-styles.scss'
import PrivateAdminRoute from './utility/PrivateAdminRoute';

const AppRouting = () => {
    const privateRoutes = [
        { path: '/', component: DashboardPage },
        { path: "/dashboard", component: DashboardPage },
        { path: "/orders", component: OrdersPage },
        { path: "/profile/view", component: ViewProfilePage },
        { path: "/profile/update", component: UpdateCredentialsPage },
        { path: "/profile/signup", component: SignUpPage },
        { path: '/orders/order/:id', component: OrderReceiptPage },
        { path: '/menus', component: MenuHomePage },
        { path: "/menus/view", component: MenuViewPage },
        { path: '/inventory', component: InventoryPage }
    ];
    const privateAdminRoutes = [
        { path: "/menus/configure/home", component: ConfigureHomePage}
    ]
    const publicRoutes = [
        { path: "/login", component: LoginPage }, 
        { path: "/forgot-password", component: ResetPasswordPage }, 
        { path: "*", component: PageNotFound }
    ];

    return (
        <Switch>
            {privateRoutes.map(route => <PrivateRoute key={route.path} exact path={route.path} component={route.component} />)}
            {privateAdminRoutes.map(route => <PrivateAdminRoute key={route.path} path={route.path} component={route.component} exact />)}
            {publicRoutes.map(route => <Route key={route.path} exact path={route.path} component={route.component} />)}
        </Switch>
    )
}

export default AppRouting
