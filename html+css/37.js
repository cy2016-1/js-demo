const canvas_bg = document.getElementById('canvas_bg');
// 导出照片
function exportCanvasAsPNGAmdWidth(width, height, name) {
    var MIME_TYPE = "image/png";
    let canvas_temp = document.getElementById("remove_bg_show_result_temp")
    let ctx_temp = canvas_temp.getContext("2d")
    canvas_temp.width = width
    canvas_temp.height = height
    let canvasElement = document.getElementById("image_reulst");
    ctx_temp.drawImage(canvasElement, 0, 0, width, height)
    var imgURL = canvas_temp.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    dlLink.download = name;
    console.log(name);
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
function downloadImage(width, height, name) {
    exportCanvasAsPNGAmdWidth( width, height, name)
}
// 拍导出照片
function exportCanvasAsPNG(id, fileName) {
    var canvasElement = document.getElementById(id);
    var MIME_TYPE = "image/png";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
// 效果图 返回 效果图的URL
function exportCanvasAsUrl() {
    let canvasElement = document.getElementById("remove_bg_show_result");
    let MIME_TYPE = "image/png";
    let imgURL = canvasElement.toDataURL(MIME_TYPE);
    return imgURL;
}

//   调用模型进行去除背景化处理
async function main() {
    const video = document.querySelector('video');
    const canvas = document.getElementById('remove_bg_show_result');;
    console.log(video.height);
    console.log(video.width);
    video.width = 295;
    video.height = 413;
    canvas.width = 295
    canvas.height = 413
    var loading = layer.load(1);
    const webcam = await tf.data.webcam(video);
    const model = await tf.loadGraphModel('./model/model.json');

    // Set initial recurrent state
    let [r1i, r2i, r3i, r4i] = [tf.tensor(0.), tf.tensor(0.), tf.tensor(0.), tf.tensor(0.)];

    // Set downsample ratio
    const downsample_ratio = tf.tensor(0.5);

    // Inference loop
    let s1 = new Date().getSeconds()
    layer.close(loading);
    while (true) {
        await tf.nextFrame();
        // console.log(s);
        const img = await webcam.capture();
        const src = tf.tidy(() => img.expandDims(0).div(255)); // normalize input
        const [fgr, pha, r1o, r2o, r3o, r4o] = await model.executeAsync(
            { src, r1i, r2i, r3i, r4i, downsample_ratio }, // provide inputs
            ['fgr', 'pha', 'r1o', 'r2o', 'r3o', 'r4o']   // select outputs
        );
        // Draw the result based on selected view
        const viewOption = "blue";
        drawMatte(fgr.clone(), pha.clone(), canvas);
        // Dispose old tensors.
        tf.dispose([img, src, fgr, pha, r1i, r2i, r3i, r4i]);
        // Update recurrent states.
        [r1i, r2i, r3i, r4i] = [r1o, r2o, r3o, r4o];
    }
}

async function drawMatte(fgr, pha, canvas) {
    const rgba = tf.tidy(() => {
        const rgb = (fgr !== null) ?
            fgr.squeeze(0).mul(255).cast('int32') :
            tf.fill([pha.shape[1], pha.shape[2], 3], 255, 'int32');
        const a = (pha !== null) ?
            pha.squeeze(0).mul(255).cast('int32') :
            tf.fill([fgr.shape[1], fgr.shape[2], 1], 255, 'int32');
        return tf.concat([rgb, a], -1);
    });

    fgr && fgr.dispose();
    pha && pha.dispose();
    const [height, width] = rgba.shape.slice(0, 2);
    const pixelData = new Uint8ClampedArray(await rgba.data());
    const imageData = new ImageData(pixelData, width, height);
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d")
    context.putImageData(imageData, 0, 0);
    var source_image = context.getImageData(0, 0, width, height)
    context.globalCompositeOperation = "destination-over"
    context.drawImage(canvas_bg, 0, 0)
    rgba.dispose();
}
async function drawHidden(r, canvas) {
    const rgba = tf.tidy(() => {
        r = r.unstack(-1)
        r = tf.concat(r, 1)
        r = r.split(4, 1)
        r = tf.concat(r, 2)
        r = r.squeeze(0)
        r = r.expandDims(-1)
        r = r.add(1).mul(127.5).cast('int32')
        r = r.tile([1, 1, 3])
        r = tf.concat([r, tf.fill([r.shape[0], r.shape[1], 1], 255, 'int32')], -1)
        return r;
    });
    const [height, width] = rgba.shape.slice(0, 2);
    const pixelData = new Uint8ClampedArray(await rgba.data());
    const imageData = new ImageData(pixelData, width, height);
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    rgba.dispose();
}
//      选择参数
function open_photo() {
    var photo_parameter_html = document.getElementById("photo-parameter").innerHTML;
    layer.open({
        type: 1,
        title: "照片格式参数选择",
        offset: 'auto',
        content: $('#photo-parameter'),
        cancel: function () {
            //右上角关闭回调
            document.getElementById("photo-parameter").style.display = "none"
            //return false 开启该代码可禁止点击该按钮关闭
        }
    })
}

function start_photo() {
    let photo_body = document.getElementById("photo_body")
    photo_body.style.display = "block"
    let start_button = document.getElementById("start_button")
    start_button.style.display = "none"
    var photo_parameter_html = document.getElementById("photo-parameter").innerHTML;
    layer.open({
        type: 1,
        title: "照片格式参数选择",
        offset: 'auto',
        content: $('#photo-parameter'),
        cancel: function () {
            //右上角关闭回调
            document.getElementById("photo-parameter").style.display = "none"
            //return false 开启该代码可禁止点击该按钮关闭
        }
    })
}
function delay_photo() {
    let number = 5
    let count_down = document.getElementById("count_down")
    let timer = setInterval(function () {
        count_down.innerText = number
        number--
        if (number < 0) {
            clearInterval(timer);
            taking_pictures()
            count_down.innerText = 5
        }
    }, 1000)

}