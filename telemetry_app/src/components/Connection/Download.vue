<template>
  <div id="downloadButtons">
    <!-- <div>
      <input id="selectFiles" type="file" />
      <pre id="result" style="height:0px, width:0px; opacity:0;"></pre>
    </div> -->
    <button @click="upload">Upload</button>
    <button @click="download">Download</button>
  </div>
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
  emits: ["uploadedData"],
  data() {
    return {
      uploadData: new Array(),
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
    upload() {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result);
          this.$emit("uploadedData", data);
        };
        reader.readAsText(file);
      };
      input.click();
    },
    /* upload() {
      const files = document.getElementById("selectFiles").files;
      if (files.length <= 0) {
        return false;
      }

      const fr = new FileReader();

      fr.onload = (e) => {
        const result = JSON.parse(e.target.result);
        const formatted = JSON.stringify(result, null, 2);
        document.getElementById("result").innerHTML = formatted;
        let output = JSON.parse(document.getElementById("result").innerHTML);
        this.$emit("uploadedData", output);
      };
      fr.readAsText(files.item(0));
    }, */
  },
};
</script>

<style lang="scss" scoped>
#downloadButtons {
  height: 26px;
  background-color: $color-background;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  button {
    background-color: $color-dark;
    margin: 0px;
    margin-right: 2px;
    border: none;
    font-size: $font-xs;
    height: 100%;
    background-color: $color-dark;
    color: $color-white;
    &:hover {
      cursor: pointer;
      color: $color-accent;
    }
  }
}
</style>
