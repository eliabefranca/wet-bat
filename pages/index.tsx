import React from 'react';
import Layout from '../components/Layout';
import QuickQuote from '../components/pages/index/QuickQuote';
import Quotes from '../components/pages/index/Quotes';

type Props = {};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="grid gap-2 lg:grid-cols-2">
                <QuickQuote className="row-span-1" />

                <Quotes className="row-span-2" />
            </div>
        </Layout>
    );
};

export default Blog;
