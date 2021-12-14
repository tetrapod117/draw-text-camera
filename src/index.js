const canvas = document.createElement('canvas');
const video  = document.createElement('video');
video.width    = 640
video.height   = 480
video.autoplay = true
canvas.width = 640;
canvas.height = 480;
const ctx = canvas.getContext('2d');
let text = "急急救命吸引具";
let color = '#ff0000'

// const insertPoint = document.body;
// _insertPanel(insertPoint);

const _getUserMedia = navigator.mediaDevices.getUserMedia.bind(
    navigator.mediaDevices
  );

navigator.mediaDevices.getUserMedia = async function (constraints) {
    // 音声が取得された場合は保持しているgetUserMediaを返す
    if (constraints.audio || !constraints.video) {
      return _getUserMedia(constraints);
    }

    // 画面キャプチャのStream情報を取得する
    const stream = await getCaptureCanvasStream();

    return stream;
  };


async function getCaptureCanvasStream(){
    // video要素にWebカメラの映像を表示させる
    _getUserMedia({video: {
      width: "640px",
      height: "480px"
    }, audio: false}).then(function(stream) {
        video.srcObject = stream;
    });

    // video要素の映像をcanvasに描画する
    _drawCanvas();

    const stream = canvas.captureStream(10);
    return stream;
}


function _drawCanvas() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  _drawText();
  requestAnimationFrame(_drawCanvas);
};

function _drawText(){
  //文字のスタイルを指定
  ctx.font = "70px kirugo";
  ctx.fillStyle = color;
  //文字の配置の指定
  ctx.textBaseline = 'center';
  ctx.textAlign = 'center';
  //座標を指定して文字を描く（座標は画像の中心に）
  var x = (canvas.width / 2);
  var y = (canvas.height / 1.2);
  ctx.fillText(text, x, y);
}

function _insertPanel(node) {
    try {
        const html =
          `<div id="gum_panel" style="border: 1px solid blue; position: absolute; left:2px; top:2px;  z-index: 2001; background-color: rgba(192, 250, 192, 0.7);">
            <tr>
                <p>表示したいテキスト<p>
                <td><input type="text" id="input-message"></td>
                <td><input type="button" id="send" value="送信"></td>
            </tr>
            <tr>
            <p>表示したい色<p>
            <select id="color" name="language">
            <option value="red">赤</option>
            <option value="yellow">黄色</option>
            </select>
            </tr>
          </table>
          </div>`;
    
          node.insertAdjacentHTML('beforeend', html);
          node.querySelector('#send').addEventListener('click', (evt) => {
            const txt = node.querySelector('#input-message').value
            console.log(txt)
            _changeText(txt);
          }, false)
          node.querySelector('#color').addEventListener('change', (evt) => {
            const txt = node.querySelector('#color').value
            console.log(txt)
            _changeColor(txt);
          }, false)
        
      } catch (e) {
        console.error('_insertPanel() ERROR:', e);
      }
    }

function _changeText(txt){
    text = txt;
}

function _changeColor(txt){
    if(txt==="red"){
      color = '#ff0000'
    } else {
        color = `#FFF450`
    }


}