import Link from "next/link";

const Logo = ({ className = "" }) => {
    return (
        <Link href="/">
            <div className={`cursor-pointer ${className}`}>
                <h2 className="flex items-center space-x-2 p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue"
                    >
                        <path d="M12 6V2H8" /><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                        <path d="M2 12h2" /><path d="M9 11v2" /><path d="M15 11v2" /><path d="M20 12h2" />
                    </svg>
                    <span className="text-gray-900 dark:text-white font-extrabold text-xl">Avontz</span>
                    <span className="text-blue opacity-70">|</span>
                    <span className="text-blue font-extrabold text-xl">Chat</span>
                </h2>
            </div>
        </Link>
    )
}

const LogoSidebar = ({ className = "", size = 32 }) => {
    return (
        <div className={`${className}`}>
            <h2 className="flex items-center space-x-2 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue"
                >
                    <path d="M12 6V2H8" /><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                    <path d="M2 12h2" /><path d="M9 11v2" /><path d="M15 11v2" /><path d="M20 12h2" />
                </svg>
                <span className="text-gray-900 dark:text-white font-extrabold" style={{ fontSize: `${size * 0.6}px` }}>Avontz</span>
                <span className="text-blue opacity-70">|</span>
                <span className="text-blue font-extrabold" style={{ fontSize: `${size * 0.6}px` }}>Chat</span>
            </h2>
        </div>
    );
};

export const LogoMini = ({ className = "", size = 22 }) => {
    return (
        <div className={`${className} flex items-center space-x-1`}>
            <h2 className="flex items-center space-x-2 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue"
                >
                    <path d="M12 6V2H8" /><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                    <path d="M2 12h2" /><path d="M9 11v2" /><path d="M15 11v2" /><path d="M20 12h2" />
                </svg>
                
            </h2>
        </div>

    );
};


interface LogoSidebarCloseProps {
    className?: string;
    size?: number;
    onClick: () => void;
}

const LogoSidebarClose: React.FC<LogoSidebarCloseProps> = ({ className = "", size = 32, onClick }) => {
    return (
        <div className={`cursor-pointer ${className}`}>
            <h2 className="flex items-center space-x-2 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={onClick}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue"
                >
                    <path d="M12 6V2H8" /><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                    <path d="M2 12h2" /><path d="M9 11v2" /><path d="M15 11v2" /><path d="M20 12h2" />
                </svg>
            </h2>
        </div>
    );
};


const LogoLarge = ({ className = "" }) => {
    return (
        <Link href="/">
            <div className={`cursor-pointer ${className}`}>
                <h2 className="flex items-center space-x-4 p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue"
                    >
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#4a90e2" />
                                <stop offset="100%" stopColor="#9013fe" />
                            </linearGradient>
                        </defs>
                        <path d="M12 6V2H8" />
                        <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                        <path d="M2 12h2" />
                        <path d="M9 11v2" />
                        <path d="M15 11v2" />
                        <path d="M20 12h2" />
                    </svg>
                    <div className="flex flex-col items-start">
                        <span className="text-gray-900 dark:text-white font-extrabold text-4xl">Avontz</span>
                        <div className="flex space-x-2">
                            <span className="text-blue-600 opacity-90 text-3xl font-semibold">Chat</span>
                        </div>
                    </div>
                </h2>
            </div>
        </Link>
    );
};

export { Logo, LogoLarge, LogoSidebar, LogoSidebarClose };