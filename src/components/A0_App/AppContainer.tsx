import App from "./App";
import React, {createContext} from "react";
import {HashRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../../theme/theme";
import {RootStore, store} from "../../store/RootStore";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
        mutations: {
            retry: 1
        }
    }
});

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <StoreContext.Provider value={store}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <ThemeProvider theme={theme}>
                    <HashRouter>
                        <App/>
                    </HashRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </StoreContext.Provider>

    )
}