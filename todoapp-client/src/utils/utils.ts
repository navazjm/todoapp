import React from "react";

export function handleInputChange<T>(evt: React.SyntheticEvent, setState: React.Dispatch<React.SetStateAction<T>>) {
    const target = evt.target as HTMLInputElement;
    const { name, value } = target;

    setState((previousState: T) => ({
        ...previousState,
        [name]: value
    }));
}
