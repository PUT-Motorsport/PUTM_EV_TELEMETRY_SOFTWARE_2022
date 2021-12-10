import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmark,
  faCirclePlay,
  faCircleStop,
  faGear,
  faFloppyDisk,
  faEye,
  faEyeSlash,
  faPalette,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);
library.add(faCirclePlay);
library.add(faCircleStop);
library.add(faGear);
library.add(faFloppyDisk);
library.add(faEye);
library.add(faEyeSlash);
library.add(faPalette);
library.add(faSquare);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

// eslint-disable-next-line vue/component-definition-name-casing
app.component("font-awesome-icon", FontAwesomeIcon);

// add necessary dependencies...

app.mount("#app");
