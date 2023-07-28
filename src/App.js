import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { Provider } from 'react-redux';
import { store } from './lib/redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <ToastContainer position="top-center"
              autoClose={3000} newestOnTop={true} />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
