export function fileMd5HeadTailTime(zenFile, chunkSize) {
  return new Promise((resolve, reject) => {
    let file = zenFile.file;
    let SparkMD5 = require("spark-md5");
    let spark = new SparkMD5.ArrayBuffer();
    let fileReader = new FileReader();
    let blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    let chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    fileReader.onload = e => {
      spark.append(e.target.result);
      if (currentChunk === chunks - 1) {
        // 所有 首尾chunks 完毕 追加lastModifier
        let time = new Int8Array(longToByteArray(file.lastModified));
        spark.append(time);
        // console.info('computed hash', spark.end()) // Compute hash
        zenFile.md5 = spark.end();
        resolve();
      } else {
        currentChunk = chunks - 1; // 第一块读完直接读取最后一块
        if (currentChunk <= 0) {
          // 若只分了一块 直接tm组合时间拼接md5
          let time = new Int8Array(longToByteArray(file.lastModified));
          spark.append(time);
          zenFile.md5 = spark.end();
          resolve();
        } else {
          load();
        }
      }
      fileReader.onerror = e => reject(e);
    };

    let load = () => {
      var start = currentChunk * chunkSize;
      var end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };

    load();
  });
}

function longToByteArray(val){
  return (val+'').split('');
}
