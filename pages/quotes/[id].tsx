import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineSave } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { IoMdSave } from 'react-icons/io';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardTitle from '../../components/Card/CardTitle';
import Input from '../../components/Input/Input';
import Layout from '../../components/Layout';
import { airports } from '../../constants/airports';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params;
    const res = await fetch(`http://localhost:3000/api/quotes/${id}`);
    const { quote } = await res.json();

    return {
        props: {
            quoteData: quote,
        },
    };
};

const Quote = ({ quoteData }) => {
    const [quote, setQuote] = useState(quoteData);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setQuote((prev) => ({ ...prev, [name]: value }));
    };

    const dataIsInvalid = () => {
        return (
            !quote.departDate ||
            !quote.returnDate ||
            !quote.travellers ||
            quote.from === 'Select an airport' ||
            quote.to === 'Select an airport'
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (dataIsInvalid()) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        const result = await fetch(`/api/quotes/${quote.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        }).then((res) => res.json());

        setLoading(false);

        toast.success('Quote updated successfully');

        console.log(result);
    };

    const loadingClass = loading ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <Layout>
            <h1>Update Quote Information</h1>
            <Button
                className="bg-primary mb-6 text-white font-bold py-2 px-4 rounded"
                onClick={() => window.history.back()}
            >
                <BsArrowLeft /> Go Back
            </Button>

            <Card className={loadingClass}>
                <CardHeader>
                    <CardTitle>Quote details</CardTitle>
                </CardHeader>
                <CardBody>
                    <form
                        className="grid grid-cols-2 gap-2"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="from"
                            name="from"
                            label="From"
                            value={quote.from}
                            onChange={handleChange}
                            placeholder="Origin"
                            type="select"
                            required
                        >
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>
                                    {airport}
                                </option>
                            ))}
                        </Input>
                        <Input
                            id="to"
                            label="To"
                            name="to"
                            value={quote.to}
                            onChange={handleChange}
                            placeholder="Destination"
                            type="select"
                            required
                        >
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>
                                    {airport}
                                </option>
                            ))}
                        </Input>
                        <Input
                            id="departDate"
                            name="departDate"
                            value={quote.departDate}
                            onChange={handleChange}
                            label="Depart date"
                            placeholder="Depart date"
                            type="date"
                            required
                        />
                        <Input
                            id="return"
                            name="returnDate"
                            value={quote.returnDate}
                            onChange={handleChange}
                            label="Return date"
                            placeholder="Return date"
                            type="date"
                            required
                        />

                        <Input
                            id="name"
                            name="name"
                            value={quote.name}
                            onChange={handleChange}
                            label="Name"
                            placeholder="Name of the requester"
                            required
                        />

                        <Input
                            id="passengers"
                            name="travellers"
                            value={quote.travellers.toString()}
                            onChange={handleChange}
                            label="Number of travellers"
                            placeholder="Your name"
                            type="number"
                            max={10}
                            required
                        />

                        <div className="flex col-span-2 items-center pt-6 justify-end">
                            <Button className="bg-secondary w-auto">
                                <IoMdSave />
                                Save
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </Layout>
    );
};

export default Quote;
