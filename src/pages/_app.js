import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Provider } from "next-auth/client";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props;
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider session={session}>
            <ApolloProvider client={apolloClient}>
              {getLayout(<Component {...pageProps} />)}
            </ApolloProvider>
          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
