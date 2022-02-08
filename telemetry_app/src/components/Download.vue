<template>
  <button @click="download">Download</button>
</template>
<script>
export default {
  name: "Download",

  props: {
    //informations about channels
    data: {
      type: Object,
      default: Object,
      required: false,
    },
  },
  data() {
    return {
      cats: [
        { name: "Alese", gender: "female", age: 10 },
        { name: "Sammy", gender: "male", age: 12 },
        { name: "Luna", gender: "female", age: 8 },
        { name: "Cracker", gender: "male", age: 7 },
        { name: "Pig", gender: "female", age: 6 },
      ],
    };
  },
  methods: {
    download() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(this.data);
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      const HH = String(today.getHours()).padStart(2, "0");
      const MM = String(today.getMinutes()).padStart(2, "0");

      today = dd + "/" + mm + "/" + yyyy + "_" + HH + ":" + MM;
      let filename = "PUTM_Telemetry_Data_" + today + ".json";

      //let filename = "PUTM_Telemetry_Data_.json";
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
  },
};
</script>

<style lang="scss" scoped></style>
