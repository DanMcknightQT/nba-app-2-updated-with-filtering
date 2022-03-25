import React from 'react'
import lang from '../util/lang'
import { MemoizedCardCollection } from '../components/CardCollection';

export default function AppRoutes({ route, routeData }) {
    switch(route){
        case lang.TEAMS_ROUTE:
            return <MemoizedCardCollection {...routeData} />
        case lang.FAVS_ROUTE:
            return <MemoizedCardCollection {...routeData} />
        default:
            <div>
                No Route Found
            </div>
    }
}
