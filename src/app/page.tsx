'use client';

import { useUser } from '@clerk/nextjs';
import { useFirebaseAuth } from '../hooks';
import { AddJobOfferForm } from '@/modules';

export default function Home() {
  const { isLoading } = useFirebaseAuth();
  const { isSignedIn, user } = useUser();

  if (isLoading || !user) return <h1>loading...</h1>;
  return (
    <main className='container mx-auto w-full text-center'>
      <AddJobOfferForm userId={user.id} />
    </main>
  );
}
