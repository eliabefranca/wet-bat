import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.scss';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Component {...pageProps} />
        </QueryClientProvider>
    );
};

export default App;
