import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import About from "../components/pages-menu/about";
import Layout from "../components/Layout";
import { wrapper } from "../app/store";
import { setRole } from "../features/user/userSlice";
const index = () => {
  return (
    <>
      <Seo pageTitle="About" />
      <Layout>
        <About />
      </Layout>
    </>
  );
};
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       // we can set the initial state from here
//       // we are setting to false but you can run your custom logic here

//       // await store.dispatch(setRole("employee"));
//       return {
//         props: {
//           authState: false,
//         },
//       };
//     }
// );
export default dynamic(() => Promise.resolve(index), { ssr: false });
