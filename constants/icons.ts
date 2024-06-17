// import activityIcon from "../public/icons/Activity.png";
// import categoryIcon from "../public/icons/Category.png";
// import editIcon from "../public/icons/Edit-Square.png";
// import editButton from "../public/icons/Edit.png";
// import tagsIcon from "../public/icons/Filter.png";
// import projectIcon from "../public/icons/Folder.png";
import logo from "../public/icons/logo.png";
// import notesIcon from "../public/icons/Paper.png";
// import addIcon from "../public/icons/Plus.png";
// import profileIcon from "../public/icons/Profile.png";
// import priorityIcon from "../public/icons/Star.png";
// import timeIcon from "../public/icons/Time-Circle.png";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faChartLine,
  faEdit,
  faFilter,
  faFolder,
  faListCheck,
  faPlus,
  faUser,
  faStar,
  faClock,
  faBarsStaggered,
  faExclamation,
  faClockRotateLeft,
  faCircleCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  activityIcon: faChartLine,
  dashboadrdIcon: faLayerGroup,
  vitalIcon: faExclamation,
  editIcon: faEdit,
  editButton: faEdit,
  tagsIcon: faFilter,
  tasksIcon: faListCheck,
  notesIcon: faBarsStaggered,
  addIcon: faPlus,
  profileIcon: faUser,
  priorityIcon: faStar,
  timeIcon: faClock,
  logo,
  clock: faClockRotateLeft,
  completed: faCircleCheck,
  delete: faTrash,
  edit: faPenToSquare,
};

export default icons;
