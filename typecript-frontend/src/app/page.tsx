import Image from "next/image";
import styles from "./page.module.css";
import 'react-toastify/dist/ReactToastify.css';
import HomeSec1 from '../components/Home/HomeSec1'
import HomeSec2 from '../components/Home/HomeSec2'
import HomeSec4 from '../components/Home/HomeSec4'
import HomeSec3 from "@/components/Home/HomeSec3";
export default function Home() {
  return (
    <div>
      <HomeSec1/>
      <HomeSec2/>
      <HomeSec3/>
      <HomeSec4/>
    </div>
  );
}
