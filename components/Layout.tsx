import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
    children?: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <>
        <div className="layout min-h-screen">
            <Navbar />
            <main className="flex justify-center w-full py-6 px-4 md:px-0">
                <div className="container">{props.children}</div>
            </main>
        </div>
    </>
);

export default Layout;
