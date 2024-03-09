import { SpeedInsights } from '@vercel/speed-insights/react';
import RootRouterProvider from './routes';
import './App.scss';

const App = () => {
    return (
        <>
            <SpeedInsights />
            <RootRouterProvider />
        </>
    );
};

export default App;
