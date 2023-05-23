import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import LogIn from "../components/pages-menu/login";
import { getAuth } from "firebase/auth";


const index = () => {
  return (
    <>
      <Seo pageTitle="Login" />
      <LogIn />
    </>
  );
};

export async function getServerSideProps({req}){
  const {cookies} = req
  const token = cookies?.token || null
  if(token && token !== null){
    return{
      redirect:{
        destination:"/",
        permanent:false
      }
    }
  }
  return{
    props:{}
  }
}

export default dynamic(() => Promise.resolve(index), { ssr: false });


