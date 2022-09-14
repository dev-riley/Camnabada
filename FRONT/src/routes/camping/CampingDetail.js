import CampingDetailTab from "../../components/camping/CampingDetailTab";
import NavBar from "../../components/common/NavBar";
import StickyFooter from '../../components/common/Footer';


export default function CampingDetail () {

  return (
    <div>
      <NavBar></NavBar>
      <CampingDetailTab></CampingDetailTab>
      <StickyFooter></StickyFooter>
    </div>
  )
}