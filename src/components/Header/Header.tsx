import styles from "./Header.module.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faCircleInfo,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const icons: IconDefinition[] = [
  faLightbulb,
  faChartSimple,
  faCircleInfo,
  faGear,
];

export default function Header() {
  return (
    <div className={styles.header}>
      <nav className={styles.nav_menu}>
        {icons.map((icon, idx) => (
          <FontAwesomeIcon icon={icon} key={idx} size="lg" />
        ))}
        <Button contentText={"Subscribe for 60% off"} reset={() => {}} />
      </nav>
    </div>
  );
}
