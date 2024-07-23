import Banner from "../components/Banner";
import bgImage from "../images/background1-home.webp";

export default function Home() {
  const data = {
    title: "Embark on a Mythic Odyssey and Become the Legendary Traveler!",
    content:
      "Prepare to unleash your true potential as you sign up and step into a realm where destiny bows to your command. Embrace the might of legendary weapons, inspired by the awe-inspiring world of Genshin Impact, and forge your own epic journey like a true legendary traveler!",
    destination: "/register",
    label: "Sign Up",
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
