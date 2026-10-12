'use client';

import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';

const Widget1 = dynamic(() => import('../components/Widget1'));
const Widget2 = dynamic(() => import('../components/Widget2'));
const Widget3 = dynamic(() => import('../components/Widget3'));
const Widget4 = dynamic(() => import('../components/Widget4'));
const Widget5 = dynamic(() => import('../components/Widget5'));
const Widget6 = dynamic(() => import('../components/Widget6'));
const Widget7 = dynamic(() => import('../components/Widget7'));
const Widget8 = dynamic(() => import('../components/Widget8'));
const Widget9 = dynamic(() => import('../components/Widget9'));
const Widget10 = dynamic(() => import('../components/Widget10'));
const Widget11 = dynamic(() => import('../components/Widget11'));
const Widget12 = dynamic(() => import('../components/Widget12'));

function HydrationTime() {
    const [time, setTime] = useState<number | null>(null);
    useEffect(() => {
        setTime(Math.round(performance.now()));
    }, []);
    return <p id="hydration-time">{time === null ? 'Not hydrated yet' : `Hydrated ${time}ms after navigation start`}</p>;
}

export default function Widgets() {
    return (
        <>
            <HydrationTime />
            <Widget1 />
            <Widget2 />
            <Widget3 />
            <Widget4 />
            <Widget5 />
            <Widget6 />
            <Widget7 />
            <Widget8 />
            <Widget9 />
            <Widget10 />
            <Widget11 />
            <Widget12 />
        </>
    );
}
