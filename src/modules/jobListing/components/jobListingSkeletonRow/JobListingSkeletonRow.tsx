import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export const JobListingSkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className='h-4 w-3/4' />
    </TableCell>
    <TableCell className='hidden sm:table-cell'>
      <Skeleton className='h-4 w-1/2' />
    </TableCell>
    <TableCell className='hidden sm:table-cell'>
      <Skeleton className='h-4 w-1/3' />
    </TableCell>
    <TableCell className='hidden md:table-cell'>
      <Skeleton className='h-4 w-1/4' />
    </TableCell>
    <TableCell className='text-right'>
      <Skeleton className='h-8 w-16' />
    </TableCell>
  </TableRow>
);
