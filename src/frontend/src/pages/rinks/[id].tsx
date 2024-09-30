import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Rink, RinkSchedule } from '../../types/rink';
import RinkDetails from '../../components/Rink/RinkDetails';
import RinkSchedule from '../../components/Rink/RinkSchedule';
import useRinks from '../../hooks/useRinks';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RinkPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getRinkDetails, getRinkSchedule } = useRinks();
  const [rink, setRink] = useState<Rink | null>(null);
  const [schedule, setSchedule] = useState<RinkSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRinkData = async () => {
      if (id) {
        try {
          setLoading(true);
          const [rinkData, scheduleData] = await Promise.all([
            getRinkDetails(id as string),
            getRinkSchedule(id as string)
          ]);
          setRink(rinkData);
          setSchedule(scheduleData);
        } catch (err) {
          setError('Failed to fetch rink data. Please try again later.');
          console.error('Error fetching rink data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRinkData();
  }, [id, getRinkDetails, getRinkSchedule]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!rink || !schedule) {
    return <div>Rink not found</div>;
  }

  return (
    <ErrorBoundary>
      <div className="rink-page">
        <Head>
          <title>{rink.name} | Ice Rink Management</title>
          <meta name="description" content={`Details and schedule for ${rink.name}`} />
          <meta property="og:title" content={`${rink.name} | Ice Rink Management`} />
          <meta property="og:description" content={`Details and schedule for ${rink.name}`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://icerinkmanagement.com/rinks/${id}`} />
          {/* Add more meta tags for SEO optimization */}
        </Head>

        <h1>{rink.name}</h1>

        <div className="rink-content">
          <ErrorBoundary>
            <RinkDetails rink={rink} />
          </ErrorBoundary>

          <ErrorBoundary>
            <RinkSchedule schedule={schedule} />
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RinkPage;

// Human tasks:
// 1. Implement SEO optimization by adding appropriate meta tags and structured data
// 2. Add proper error handling and user feedback for failed API requests
// 3. Implement responsive design to ensure the page looks good on various screen sizes
// 4. Add accessibility features such as proper heading structure and ARIA labels
// 5. Consider implementing server-side rendering (SSR) or static site generation (SSG) for improved performance and SEO