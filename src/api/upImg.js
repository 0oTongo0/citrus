import { upImg } from './user';

export async function upload(params) {
    let files = params.files || [],
        fileMaxSize = 1024 * Number(params.fileMaxSize || 10),
        count = params.count || 1,
        arr = [];

    if (files.length == 0) return files;
    let formData = new FormData();
    for (let i = 0, len = files.length; i < len; i++) {

        if (arr.length > count) continue;
        let file = files[i];
        formData.append("file", file); // 如果使用node 中 multer模块 必须与后台 一致
        // formData.append("userId", params.userId);
        let res = await upImg(
            formData,
            {
                'Content-Type': "multipart/form-data"
            });
        if (count == 1) {
            return res;
        } else {
            arr.push(res);
        }
    }
    return arr;
}