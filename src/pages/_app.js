import { CacheProvider } from "@emotion/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { AppProvider } from "src/utils/app-context-provider";
import { AuthGuard } from "src/utils/auth-guard";
import { ContextGuard } from "src/utils/context-guard";
import { theme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

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
                    <AuthGuard>
                        <ContextGuard>
                            <ThemeProvider theme={theme}>
                                <CssBaseline />
                                {getLayout(<Component {...pageProps} />)}
                            </ThemeProvider>
                        </ContextGuard>
                    </AuthGuard>
                </LocalizationProvider>
            </AppProvider>
        </CacheProvider>
    );
};

export default App;
