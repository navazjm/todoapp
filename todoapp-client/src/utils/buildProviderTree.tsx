import React from "react";
import { Props } from "./types";

// TODO: add type annotations
export default function BuildProviderTree(providers) {
    if (providers.length === 1) {
        return providers[0];
    }
    const A = providers.shift();
    const B = providers.shift();
    return BuildProviderTree([
        ({ children }: Props) => (
            <A>
                <B>{children}</B>
            </A>
        ),
        ...providers
    ]);
}
