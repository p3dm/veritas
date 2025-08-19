"use client";

import { useCallback, useEffect, useState } from "react";

function readCookie(name: string): string | undefined {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
}

function writeCookie(name: string, value: string) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    useEffect(() => {
        const cookieTheme = readCookie("theme");
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = cookieTheme ? cookieTheme === "dark" : prefersDark;
        setIsDark(dark);
        const html = document.documentElement;
        html.classList.toggle("dark", dark);
        html.setAttribute("data-theme", dark ? "night" : "light");
    }, []);

    const toggle = useCallback(() => {
        setIsDark(prev => {
            const next = !(prev ?? false);
            const html = document.documentElement;
            html.classList.toggle("dark", next);
            html.setAttribute("data-theme", next ? "night" : "light");
            writeCookie("theme", next ? "dark" : "light");
            return next;
        });
    }, []);

    if (isDark === null) return null;

    return (
        <button onClick={toggle} className="btn btn-sm">
            {isDark ? "Switch to Light" : "Switch to Dark"}
        </button>
    );
}


