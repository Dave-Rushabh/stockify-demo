import ProfileDrawer from '@/components/ProfileDrawer';
import { SESSION_STORAGE_TOKEN } from '@/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [showData, setShowData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem(SESSION_STORAGE_TOKEN)) {
        setShowData(true);
      } else {
        router.push('/');
      }
    }
  }, []);

  return (
    <>
      {typeof window !== 'undefined' && (
        <>
          {showData ? (
            <>
              <ProfileDrawer />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default HomePage;
