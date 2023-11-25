import React, { useEffect, useRef, useState } from 'react'






export const useUnload = fn => {
    const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined

    useEffect(() => {
        cb.current = fn;
        window.history.pushState(null, null, location.href)
        window.onpopstate = function () {
            history.go(1);
        };
    }, [fn]);



    useEffect(() => {
        const onUnload = (...args) => cb.current?.(...args);

        window.addEventListener("beforeunload", onUnload);


        return () => window.removeEventListener("beforeunload", onUnload);
    }, []);
};