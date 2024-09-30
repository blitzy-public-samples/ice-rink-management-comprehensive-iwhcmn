import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import EquipmentDetails from '../../components/Equipment/EquipmentDetails';
import { Equipment } from '../../types/equipment';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { fetchEquipmentById } from '../../lib/api/equipment';
import Head from 'next/head';
import Link from 'next/link';

const EquipmentDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEquipment = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await fetchEquipmentById(id as string);
          setEquipment(data);
          setError(null);
        } catch (err) {
          setError('Failed to load equipment details. Please try again.');
          setEquipment(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadEquipment();
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (!equipment) {
      return <ErrorMessage message="Equipment not found" />;
    }

    return <EquipmentDetails equipment={equipment} />;
  };

  return (
    <>
      <Head>
        <title>{equipment ? `${equipment.name} | Equipment Details` : 'Equipment Details'}</title>
        <meta name="description" content={equipment ? `Details for ${equipment.name}` : 'Equipment details page'} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <Link href="/equipment">
          <a className="text-blue-500 hover:text-blue-700 mb-4 inline-block">&larr; Back to Equipment List</a>
        </Link>
        <h1 className="text-3xl font-bold mb-6">Equipment Details</h1>
        {renderContent()}
      </div>
    </>
  );
};

export default EquipmentDetailsPage;

// Human tasks:
// 1. Implement proper error handling for invalid equipment IDs (Required)
// 2. Add SEO optimization, including dynamic meta tags based on equipment details (Required)
// 3. Implement loading state while fetching equipment details (Required)
// 4. Add breadcrumb navigation for better user experience (Optional)
// 5. Consider implementing server-side rendering (SSR) or static site generation (SSG) for improved performance and SEO (Optional)