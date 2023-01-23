export interface IAlert {
    message: string;
    type: string;
    isActive: boolean;
}

export interface IAlertContext {
    alert: IAlert;
    setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
}
