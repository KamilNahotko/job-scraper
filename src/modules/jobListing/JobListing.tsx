import { useQueryGetJobListing } from '@/api/queries/getJobListing.query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useJobListingStore } from '@/store';
import dayjs from 'dayjs';
import { JobListingSkeletonRow } from './components';

export const JobListing = ({ userId }: { userId: string }) => {
  const { data } = useQueryGetJobListing({ userId });

  const isLoading = useJobListingStore((state) => state.isAddingJobToListing);

  return (
    <Card>
      <CardHeader className='px-7'>
        <CardTitle>Job Offers</CardTitle>
        <CardDescription>Recent added job offers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead className='hidden sm:table-cell'>Salary</TableHead>
              <TableHead className='hidden sm:table-cell'>Experience</TableHead>
              <TableHead className='hidden md:table-cell'>Date Added</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, i) => <JobListingSkeletonRow key={i} />)
              : data?.map((job) => {
                  const salaryPermanent = job.salary.grossPerMonthPermanent;
                  const salaryB2B = job.salary.netPerMonthB2B;
                  return (
                    <TableRow key={job.id} className='bg-accent'>
                      <TableCell>
                        <div className='font-medium'>{job.title}</div>
                      </TableCell>
                      <TableCell className='hidden sm:table-cell'>
                        <div>
                          {`${salaryPermanent.min}-${salaryPermanent.max}`} /
                          Permanent
                        </div>
                        <div> {`${salaryB2B.min}-${salaryB2B.max}`} / B2B</div>
                      </TableCell>
                      <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                          {job.experience}
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {dayjs().format('DD.MM.YYYY')}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='outline' size='sm'>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
