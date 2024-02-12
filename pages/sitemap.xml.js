function generateSiteMap() {
  const currentDate = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/</loc>
         <lastmod>${currentDate}</lastmod>
         <changefreq>yearly</changefreq>
         <priority>0.7</priority>
       </url>
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/about</loc> 
         <lastmod>${currentDate}</lastmod>
         <changefreq>monthly</changefreq>
         <priority>0.7</priority>
       </url>
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/job-list</loc> 
         <lastmod>${currentDate}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>0.8</priority>
       </url>
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/employers-list</loc> 
         <lastmod>${currentDate}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>0.8</priority>
       </url>
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/register</loc> 
         <lastmod>${currentDate}</lastmod>
         <changefreq>monthly</changefreq>
         <priority>0.5</priority>
       </url>
       <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/login</loc> 
         <lastmod>${currentDate}</lastmod>
         <changefreq>monthly</changefreq>
         <priority>0.5</priority>
       </url>
       
     </urlset>
   `;
}
function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
export default SiteMap;