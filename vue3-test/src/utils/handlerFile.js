const IMG_MINE = {
  png: "image/png",
  jpe: "image/jpeg",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  apk: "application/vnd.android.package-archive",
};
const PDF_MINE = {
  pdf: "application/pdf",
};
const MINE = {
  ...IMG_MINE,
  ...PDF_MINE,
};
const getMine = function (type = "img") {
  const result = [];
  let useMINE = MINE;
  if (type == "img") {
    useMINE = IMG_MINE;
  }

  for (const key in useMINE) {
    if (Object.hasOwnProperty.call(useMINE, key)) {
      const element = useMINE[key];
      result.push(element);
    }
  }
  return result.filter((e) => e).join(",");
};

/**
 * @param {'img' | 'pdf'} mineType  要获取的文件类型 传入img 获取所有图片类型
 * @param {Boolean} multiple  选择多个文件
 * @description 传入要获取的文件类型 自动获取文件
 */
export async function handlerFile(mineType, multiple = false) {
  const mine = getMine(mineType);
  let input = document.createElement("input");
  input.type = "file";
  input.accept = mine;
  multiple && (input.multiple = "multiple");

  const files = await new Promise((resolve, reject) => {
    input.onchange = (e) => {
      const files = e.target.files;
      // console.log(files);
      resolve(files);
    };
    input.click();
  });

  //文件预览（能用就行 不知道有啥问题）
  let fileUrls = [];
  let promises = [];

  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      let file = files[key]; //上传的每一项对象

      promises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            let arrBuffer = reader.result;
            let url = window.URL.createObjectURL(
              new Blob([arrBuffer], { type: file.type })
            );
            fileUrls.push(url);
            resolve();
          };
          reader.readAsArrayBuffer(file);
        })
      );
    }
  }

  return Promise.all(promises).then(() => ({
    files: files,
    preview: fileUrls,
  }));
}

/**
 * file或blob转base64
 * @param {File} blob file或者blob
 * @param {*}
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(blob);
  });
}
