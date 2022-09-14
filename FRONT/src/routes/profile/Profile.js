import NavBar from "../../components/common/NavBar";
import ProfileHead from "../../components/profile/ProfileHead";
import StickyFooter from "../../components/common/Footer";
// import ProfileHeadOther from "../components/profile/ProfileHeadOther";

export default function Profile () {

  return (
    <div>
      <NavBar></NavBar>
      <ProfileHead></ProfileHead>
      <StickyFooter></StickyFooter>
      {/* <ProfileHeadOther></ProfileHeadOther> */}
    </div>
  )
}