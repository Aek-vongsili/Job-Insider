import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

const LoadingLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      document.body.style.overflow = 'hidden';
    };

    const handleComplete = () => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <div>
      {!!loading && (
        <div>
          <Loading />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingLayout;
