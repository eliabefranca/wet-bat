import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsCheck, BsSkipForward } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { airports } from '../../../constants/airports';
import Button from '../../Button/Button';

import Card from '../../Card/Card';
import CardBody from '../../Card/CardBody';
import CardHeader from '../../Card/CardHeader';
import CardTitle from '../../Card/CardTitle';
import Input from '../../Input/Input';

const EMPTY_QUOTE = {
    from: airports[0],
    name: '',
    to: '',
    departDate: '',
    returnDate: '',
    travellers: 1,
};

function QuickQuote({ className = '' }) {
    const [quote, setQuote] = useState({ ...EMPTY_QUOTE });
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

        const result = await fetch('/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        }).then((res) => res.json());

        setLoading(false);
        setQuote({ ...EMPTY_QUOTE });
        toast.success('Quote created successfully');
    };

    const loadingClass = loading ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <Card className={`${loadingClass} ${className}`} fullscreen>
            <CardHeader>
                <CardTitle>
                    <BsSkipForward className="text-secondary text-2xl mr-3" />
                    Quick Quote
                </CardTitle>
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
                            <BsCheck />
                            Create quote
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default QuickQuote;
