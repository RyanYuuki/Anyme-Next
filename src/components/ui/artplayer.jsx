import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function Player({ option, getInstance, url, ...rest }) {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer({
            ...option,
            url: url,
            container: artRef.current,
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}