import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home1 from "../components/home-1";
import Home16 from "../components/home-16";
import Layout from "../components/Layout";


const index = () => {
    return (
        <>
            <Seo pageTitle="Home" />
            <Layout>
                <Home16 />
            </Layout>
            
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
