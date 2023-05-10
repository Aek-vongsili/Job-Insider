
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,(user) => {
        if (user) {
          setUser(user);
          // setIsLoading(false)  
          // router.replace('/');
        } else {
          router.replace('/login');
        }
      });

      return () => unsubscribe();
    }, []);

    

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Authenticated;
};


export default withAuth;
