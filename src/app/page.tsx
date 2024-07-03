'use client';

import { useUser } from '@clerk/nextjs';
import { useFirebaseAuth } from '../hooks';
import { AddJobOfferForm, JobListing } from '@/modules';

export default function Home() {
  const { isLoading } = useFirebaseAuth();
  const { isSignedIn, user } = useUser();

  if (isLoading || !user) return <h1>loading...</h1>;
  return (
    <main className='container mx-auto w-full'>
      <AddJobOfferForm userId={user.id} />
      <JobListing userId={user.id} />
    </main>
  );
}
