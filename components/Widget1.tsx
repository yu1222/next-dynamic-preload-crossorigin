'use client';

import {useEffect, useState} from 'react';

export default function Widget1() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        performance.mark('widget-hydrated');
    }, []);
    return (
        <button type="button" onClick={() => setCount((c) => c + 1)}>
            Widget 1: {count}
        </button>
    );
}
