import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function Navbar() {
    return (
        <nav className="bg-primary flex justify-center">
            <div className="container flex flex-col items-center justify-between p-4 md:px-0 md:py-0 md:flex-row">
                <div
                    className="relative pr-2 cursor-pointer"
                    style={{ maxWidth: 150 }}
                >
                    <Link href="/">
                        <Image
                            src={{ src: '/logo.png', width: 293, height: 109 }}
                        />
                    </Link>
                </div>

                <div className="input-with-icon flex w-full md:w-auto">
                    <AiOutlineSearch className="icon" />
                    <input className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
