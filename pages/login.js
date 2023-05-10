import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import LogIn from "../components/pages-menu/login";


const index = () => {
  return (
    <>
      <Seo pageTitle="Login" />
      <LogIn />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });


// export async function getServerSideProps({req}){
//   const session = await getSession({req})
//   if(!session){
//     return{
//       redirect:{
//         destination:"/login",
//         permanent:false
//       }
//     }
//   }
//   return{
//     props:{session}
//   }
// }