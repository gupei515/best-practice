// import { createContext, useState, ComponentType, FunctionComponent } from "react";
// import { EnhancedGridApi } from "./interfaces";

// export const ApiContext = createContext<EnhancedGridApi | null | undefined>(undefined);
// export const StoreApiContext = createContext<(api: EnhancedGridApi | null | undefined) => void>(undefined);

// export const GridProvider: FunctionComponent = ({ children }) => {
//     const [api, setApi] = useState<EnhancedGridApi | null>(null);
//     return (
//         <ApiContext.Provider value={api}>
//             <StoreApiContext.Provider value={setApi}>{children}</StoreApiContext.Provider>
//         </ApiContext.Provider>
//     );
// };

// export const withGridProvider = <T extends ComponentType<any>>(Component: T): T =>
//     ((props: any) => (
//         <GridProvider>
//             <Component {...props} />
//         </GridProvider>
//     )) as any;
