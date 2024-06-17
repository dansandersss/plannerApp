import icons from "./icons";

icons;

const links = [
  {
    icon: icons.dashboadrdIcon,
    text: "Dashboard",
    forward: "/dashboard",
  },
  {
    icon: icons.vitalIcon,
    text: "Vital Tasks",
    forward: "/pageOne",
  },
  {
    icon: icons.tasksIcon,
    text: "My Tasks",
    forward: "/pageTwo",
  },
];

const projects = [
  {
    icon: icons.activityIcon,
    title: "Flower Shop",
  },
  {
    icon: icons.activityIcon,
    title: "Cloth",
  },
  {
    icon: icons.activityIcon,
    title: "GamerBoy",
  },
];
const tasks = [
  {
    icon: icons.notesIcon,
    text: "Manage Finances",
    textColor: "text-newTextColor-1",
    bgColor: "bg-newBgColor-1",
  },

  {
    icon: icons.notesIcon,
    text: "Integrate ChatGPT",
    textColor: "text-newTextColor-2",
    bgColor: "bg-newBgColor-2",
  },

  {
    icon: icons.notesIcon,
    text: "Integrate ChatGPT",
    textColor: "text-newTextColor-3",
    bgColor: "bg-newBgColor-3",
  },

  {
    icon: icons.notesIcon,
    text: "Invest in DOGE",
    textColor: "text-newTextColor-4",
    bgColor: "bg-newBgColor-4",
  },
];

export { links, projects, tasks };
