import Banner from "../components/Banner";
import bgImage from "../images/background-error.webp";

export default function Error() {
  const data = {
    title: "404 (Page not Found) - Uncharted Realms",
    content:
      "Alas, the path you seek remains veiled in the mists of the unknown. The ethereal portal you traverse has eluded our grasp, leading us to a realm beyond our reach. Venture forth, brave wanderer, and unravel the mysteries that lie beyond the boundaries of our digital dominion. For in the vastness of the web, tales of uncharted realms await those who dare to dream and explore.",
    destination: "/",
    label: "Travel Back home",
    backgroundImage: bgImage,
  };

  return (
    <>
      <Banner data={data} />
      {/* <FeaturedCourses/> */}
      {/* <Hightlights/> */}
      {/*<CourseCard/>*/}
    </>
  );
}
