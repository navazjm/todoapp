import { useAlert } from "./alert.hooks";
import "./alert.styles.css";

export default function Alert() {
    const alertCtx = useAlert();
    return (
        <>
            <div
                className={`alert alert-${
                    alertCtx?.alert.type
                } shadow-lg fixed min-w-fit max-w-fit transition-all right-12
                ${alertCtx && alertCtx.alert.isActive ? "bottom-12" : "hidden-alert"}`}
            >
                <div>
                    {alertCtx?.alert.type === "info" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-current flex-shrink-0 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    )}
                    {alertCtx?.alert.type === "success" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                    {alertCtx?.alert.type === "warning" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    )}
                    {alertCtx?.alert.type === "error" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                    <span>{alertCtx?.alert.message}</span>
                </div>
                <button
                    className="ml-5 opacity-75 hover:opacity-100 transition-all"
                    onClick={() => alertCtx?.setAlert({ ...alertCtx.alert, isActive: false })}
                >
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g clipPath="url(#clip0_429_11083)">
                                {" "}
                                <path
                                    d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                                    stroke="#292929"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>{" "}
                            <defs>
                                {" "}
                                <clipPath id="clip0_429_11083">
                                    {" "}
                                    <rect width="24" height="24" fill="white"></rect>{" "}
                                </clipPath>{" "}
                            </defs>{" "}
                        </g>
                    </svg>
                </button>
            </div>
        </>
    );
}
