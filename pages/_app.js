import "@styles/globals.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@styles/theme";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
