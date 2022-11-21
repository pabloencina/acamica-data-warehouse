import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { AppContext, AppProvider } from "src/utils/app-context-provider";
import { useContext, useEffect } from "react";
import { getAllRegions } from "src/services/regionsService";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Material Kit ...</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <AppProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                </LocalizationProvider>
            </AppProvider>
        </CacheProvider>
    );
};

export default App;
