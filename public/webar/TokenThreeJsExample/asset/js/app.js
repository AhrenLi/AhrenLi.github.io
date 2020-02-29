//             别间隔时间(毫秒), 识别服务地址, 认证token
const webAR = new WebAR(1000, 'https://cn1-crs.easyar.com:8443/search', 'wumrOMr1Atn6q/uzHmF05WK1oBz1ULAPfhLxGtgM96TJTDJ4/ciSdQ9dMjNdxG1xQ+DM208vWHK9dDmtcm7JRw==');
// Threejs简单使用类
const threeHelper = new ThreeHelper();
// 列出并打开设备上的摄像头
document.querySelector('#openCamera').addEventListener('click', function () {
    const videoSelect = document.querySelector('#videoDevice');
    webAR.listCamera(videoSelect)
        .then(msg => {
            // 隐藏"打开摄像头"按钮
            this.style.display = 'none';
            videoSelect.style.display = 'inline-block';
            document.querySelector('#start').style.display = 'inline-block';
            document.querySelector('#stop').style.display = 'inline-block';
            videoSelect.onchange = () => {
                // JSON.parse(videoSelect.value)
                webAR.openCamera({ audio: false, video: { facingMode: { exact: 'environment' } } });
            };
            // 打开摄像头
            // 打开后置摄像头参数： {audio: false, video: {facingMode: {exact: 'environment'}}}
            // webAR.openCamera(JSON.parse(videoSelect.value))
            webAR.openCamera({ audio: false, video: { facingMode: { exact: 'environment' } } })
                .then(msg => {
                    console.info("打开相机：" + msg);
                }).catch(err => {
                    console.info(err);
                });
        })
        .catch(err => {
            // 没有找到摄像头
            console.info(err);
        });
});
// 开启识别
document.querySelector('#start').addEventListener('click', () => {
    webAR.startRecognize((msg) => {
        console.info("开启试别：" + msg);
        // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下
        // const setting = JSON.parse(window.atob(msg.target.meta));
        const setting = {
            model: 'asset/model/nv_zl01.fbx',
            scale: 0.02,
            position: [0, 0, 0]
        };
        threeHelper.loadObject(setting);
    });
}, false);
// 暂停识别
document.querySelector('#stop').addEventListener('click', () => {
    webAR.stopRecognize();
}, false);
//# sourceMappingURL=app.js.map
