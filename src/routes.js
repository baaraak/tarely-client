import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => null;
export default [
    {
        exact: true,
        path: "/",
        component: Loadable({
            loader: () => import('./views/Home/Home'),
            loading: Loading,
        })
    },
    {
        exact: true,
        path: "/upload",
        component: Loadable({
            loader: () => import('./views/UploadProduct/UploadProduct'),
            loading: Loading,
        })
    },
    {
        exact: true,
        path: "/product/edit/:id",
        component: Loadable({
            loader: () => import('./views/EditProduct/EditProduct'),
            loading: Loading,
        })
    },
    {
        exact: true,
        path: "/product/:id",
        component: Loadable({
            loader: () => import('./views/Product/Product'),
            loading: Loading,
        })
    },
    {
        exact: true,
        path: "/product/:id/:view",
        component: Loadable({
            loader: () => import('./views/Product/Product'),
            loading: Loading,
        })
    },
    {
        exact: true,
        path: "/product/:id/:view/:roomId",
        component: Loadable({
            loader: () => import('./views/Product/Product'),
            loading: Loading,
        })
    },
    {
        path: "/user/profile/",
        component: Loadable({
            loader: () => import('./views/UserProfile/UserProfile'),
            loading: Loading,
        })
    },
    {
        path: "/user/settings/",
        component: Loadable({
            loader: () => import('./views/Settings/Settings'),
            loading: Loading,
        })
    },
    {
        path: "/contact",
        component: Loadable({
            loader: () => import('./views/Contact/Contact'),
            loading: Loading,
        })
    },
]