import React, { FC, createContext, ReactNode, ReactElement } from 'react';
import { RootStore } from '../stores/rootStore';

const store = new RootStore();

export const StoreContext = createContext<RootStore>(store);

export type StoreComponent = FC<{
    children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
    children,
}): ReactElement => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}