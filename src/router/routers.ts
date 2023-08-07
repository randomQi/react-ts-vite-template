import React, {JSX, lazy, LazyExoticComponent} from "react";
import {A} from '@/pages/A'
export interface routesI {
    path: string,
    component: React.Component| React.FC | LazyExoticComponent<JSX.Element>,
    hidden?: boolean,
    meta?:Record<any, any>,
    children?:routesI[]
}
const routes: routesI[] = [
    {
        path: '/a',
        component: A,
        hidden: false,
        children: []
    },
    {
        path: '/b',
        component: lazy(() => import('@/pages/B')),
        hidden: false,
        children: []
    },
    {
        path: '/c',
        component: lazy(() => import('@/pages/C')),
        hidden: false,
        children: []
    }
];

export default routes
