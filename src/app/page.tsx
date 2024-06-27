'use client';

import { useUser } from '@clerk/nextjs';
import { useFirebaseAuth } from '../hooks';
import {
  addJobOfferInput,
  useAddJobOfferQuery,
} from '../api/queries/useAddJobOffer.query';
import { useState } from 'react';

export default function Home() {
  const { isLoading } = useFirebaseAuth();

  const { isSignedIn, user } = useUser();

  const { mutate: addJobOfferMutate } = useAddJobOfferQuery();

  const [input, setInput] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/extractJobInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data: Omit<addJobOfferInput, 'link' | 'userId'> = await res.json();

    if (user?.id) {
      addJobOfferMutate({ ...data, link: input, userId: user.id });
    }
  };

  if (isLoading) return <h1>loading...</h1>;

  return (
    <main className='container mx-auto w-full text-center'>
      <p>Job Offer Scrapper</p>

      <form onSubmit={handleSubmit} className='flex justify-center mt-4 gap-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a link'
          className='border p-2'
        />
        <button className='border px-4' type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
}
