<template>
  <uploader :options="options" class="uploader-example" ref="uploader">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import { fileMd5HeadTailTime } from "../../utils/md5.js";
export default {
  data() {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "http://localhost:12315/upload",
        testChunks: true,
        chunkSize: 64 * 1024 * 1024,
        preprocess: this.preprocess,
        simultaneousUploads: 1,
        query: function(file) {
          return { md5: file.md5 };
        }
      },
      attrs: {
        accept: "image/*"
      }
    };
  },
  methods: {
    preprocess(chunk) {
      let uploaderInstance = this.$refs.uploader.uploader;
      // 上传或test之前执行,生成md5(如果file存在md5 就不生成了)
      if (chunk.file.md5 === "" || chunk.file.md5 == null) {
        fileMd5HeadTailTime(chunk.file, uploaderInstance.opts.chunkSize).then(
          () => {
            chunk.preprocessFinished();
          }
        );
      } else {
        chunk.preprocessFinished();
      }
      console.log(chunk.file.md5);
    }
  }
};
</script>

<style scoped>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

</style>

<style>
.uploader-file-icon::before {
  content: url(../../assets/small-file.png) !important;
  display: block;
  height: 100%;
  font-size: 24px;
  line-height: 1;
  text-indent: 0;
}
.uploader-file-icon[icon=folder]::before {
  content: url(../../assets/small-folder.png) !important;
}
.uploader-file-icon[icon=image]::before {
  content: url(../../assets/small-image.png) !important;
}
.uploader-file-icon[icon=video]::before {
  content: url(../../assets/small-video.png) !important;
}
.uploader-file-icon[icon=audio]::before {
  content: url(../../assets/small-music.png) !important;
}
.uploader-file-icon[icon=document]::before {
  content: url(../../assets/small-document.png) !important;
}
</style>