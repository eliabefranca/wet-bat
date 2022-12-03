import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    BsEye,
    BsPen,
    BsPerson,
    BsPersonBadge,
    BsPinFill,
    BsTrash,
} from 'react-icons/bs';
import { MdRefresh, MdTravelExplore } from 'react-icons/md';
import { useQuery } from 'react-query';
import Button from '../../Button/Button';

import Card from '../../Card/Card';
import CardBody from '../../Card/CardBody';
import CardHeader from '../../Card/CardHeader';
import CardTitle from '../../Card/CardTitle';
import ConfirmationModal from '../../ConfirmationModal';

const Quotes = ({ className = '' }) => {
    const [deleting, setDeleting] = useState<string>(undefined);
    const query = useQuery('quotes', () =>
        fetch('/api/quotes').then((res) => res.json())
    );

    const { isLoading, error, data } = query;

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        if (data?.quotes) {
            setQuotes(data.quotes);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {deleting && (
                <ConfirmationModal
                    message="Are you sure?"
                    onCancel={() => setDeleting(undefined)}
                    onConfirm={async () => {
                        await fetch(`/api/quotes/${deleting}`, {
                            method: 'DELETE',
                        }).then(() => setDeleting(undefined));
                        setQuotes(quotes.filter((q) => q.id !== deleting));
                        toast.success('Quote deleted');
                    }}
                    title="Delete Quote"
                />
            )}
            <Card fullscreen className={className}>
                <CardHeader>
                    <CardTitle>
                        <MdTravelExplore className="text-secondary text-2xl mr-3" />
                        Quotes
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    {quotes.length === 0 && (
                        <div className="text-center text-gray-500">
                            No quotes found
                            {/* refresh */}
                        </div>
                    )}
                    <ul className="overflow-y-auto">
                        {quotes.map((quote) => (
                            <li
                                className="gap-3 divide py-6 border-b border-gray-200 grid grid-cols-2"
                                key={quote.id}
                            >
                                <div className="flex flex-wrap gap-1">
                                    <span className="inline-flex gap-2 items-center px-3 py-0.5 rounded-full text-sm font-medium  bg-slate-100 border border-slate-300 text-slate-800">
                                        <BsPersonBadge />
                                        {quote.name}
                                    </span>
                                    <span className="inline-flex gap-2 items-center px-3 py-0.5 rounded-full text-sm font-medium  bg-slate-100 border border-slate-300text-slate-800">
                                        <BsPinFill />
                                        From: {quote.from}
                                    </span>

                                    <span className="inline-flex gap-2 items-center px-3 py-0.5 rounded-full text-sm font-medium  bg-slate-100 border border-slate-300 text-slate-800">
                                        <BsPinFill />
                                        To: {quote.to}
                                    </span>

                                    <span className="inline-flex gap-2 items-center px-3 py-0.5 rounded-full text-sm font-medium bg-slate-100 border border-slate-300 text-slate-800">
                                        <BsPerson />
                                        {quote.travellers}
                                        {quote.travellers > 1
                                            ? ' people'
                                            : ' person'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link href={`/quotes/${quote.id}`}>
                                        <Button className="justify-center">
                                            <BsPen />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        className="justify-center bg-danger"
                                        onClick={() => setDeleting(quote.id)}
                                    >
                                        <BsTrash />
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center mt-4">
                        <Button
                            className="text-sm w-auto bg-quartiary inline-block text-gray-500 hover:text-gray-700"
                            onClick={() => query.refetch()}
                        >
                            <MdRefresh /> Refresh
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default Quotes;
