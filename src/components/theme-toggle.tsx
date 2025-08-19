"use client";

import { useEffect, useState } from "react";

function writeCookie(name: string, value: string) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const html = document.documentElement;
        const dark = html.classList.contains("dark");
        html.setAttribute("data-theme", dark ? "night" : "light");
    }, []);

    const toggle = () => {
        const nextDark = !document.documentElement.classList.contains("dark");
        const html = document.documentElement;
        html.classList.toggle("dark", nextDark);
        html.setAttribute("data-theme", nextDark ? "night" : "light");
        writeCookie("theme", nextDark ? "dark" : "light");
    };

    return (
        <button onClick={toggle} className="btn btn-sm">
            {mounted ? (document.documentElement.classList.contains("dark") ? "Switch to Light" : "Switch to Dark") : "Theme"}
        </button>
    );
}

