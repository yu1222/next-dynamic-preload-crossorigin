'use client';

import {useEffect, useState} from 'react';

export default function Widget7() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        performance.mark('widget-hydrated');
    }, []);
    return (
        <button type="button" onClick={() => setCount((c) => c + 1)}>
            Widget 7: {count}
        </button>
    );
}
