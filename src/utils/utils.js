/**
 * 下载文件
 */
function download(src, fileName) {
    let x = new XMLHttpRequest();
    x.open("GET", src, true);
    x.responseType = "blob";
    x.onload = function (e) {
        let url = window.URL.createObjectURL(x.response);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
    };
    x.send();
}
export const downloadFile = (url, fileName = '') => {
    fileName && fileName.indexOf(".txt") > -1 ||
        fileName && fileName.indexOf(".pdf") > -1 ||
        fileName && fileName.indexOf(".jpg") > -1 ||
        fileName && fileName.indexOf(".png") > -1 ||
        fileName && fileName.indexOf(".jpeg") > -1 ||
        fileName && fileName.indexOf(".TXT") > -1 ||
        fileName && fileName.indexOf(".PDF") > -1 ||
        fileName && fileName.indexOf(".JPG") > -1 ||
        fileName && fileName.indexOf(".PNG") > -1 ||
        fileName && fileName.indexOf(".JPEG") > -1 ||
        url.indexOf(".txt") > -1 ||
        url.indexOf(".pdf") > -1 ||
        (url.indexOf(".jpeg") > -1) | (url.indexOf(".jpg") > -1) ||
        url.indexOf(".png") > -1 ||
        url.indexOf(".TXT") > -1 ||
        url.indexOf(".PDF") > -1 ||
        (url.indexOf(".JPEG") > -1) | (url.indexOf(".JPG") > -1) ||
        url.indexOf(".PNG") > -1
        ? window.open(url)
        : download(url, fileName);
}