//まず初めにお詫びをば、、、
//コメントアウトしておりますコードはトライ＆エラーで消したり入れたりしている部分でございます。（消しておらずすみません。。）


//指の座標で物体を操作するための変数を用意（関数をまたがるのでグローバルで宣言）
//変数cameraは配列ではなくオブジェクトとして宣言。THREE.jsのオブジェクトを入れるため。
let teninshiki = 0;
let teninshiki_camera = 0;
let teninshiki_camera_y = 0;
let hand_x = [];
let hand_y = [];
let camera = {};

//こちらはデバイスの映像読み込みと指の認識をやっている部分です。
window.onload = function(){
    const video2 = document.getElementById('video');
    //const canvas = document.getElementById('output');
    //const ctx = canvas.getContext('2d');
    console.log(video2);
    //関連ファイルの読み込み
    const config = {
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    };
    const hands = new Hands(config);
    console.log(hands);

    //カメラからの映像をhands.jsで使えるようにする
    const camera2 = new Camera(video2, {
        onFrame: async () => {
          await hands.send({image: video2});
        },
        width: 1440,
        height: 650
      });
  
      hands.setOptions({
          maxNumHands: 2,              //検出する手の最大数
          modelComplexity: 1,          //ランドマーク検出精度(0か1)
          minDetectionConfidence: 0.5, //手を検出するための信頼値(0.0~1.0)
          minTrackingConfidence: 0.5   //ランドマーク追跡の信頼度(0.0~1.0)
      });
      
      //形状認識した結果の取得
      hands.onResults(results => {
        if(results.multiHandLandmarks) {
          results.multiHandLandmarks.forEach(marks => {
            // 緑色の線で骨組みを可視化
            //drawConnectors(ctx, marks, HAND_CONNECTIONS, {color: '#0f0'});
            //console.log(results.multiHandLandmarks.length);
            //console.log(results.multiHandLandmarks[0][0]);//手首のx、y、z座標を見れるよ
            //親指の先端と人差し指の先端のx座標によってa,bを出し分ける
            //console.log(results.multiHandLandmarks);
            if(results.multiHandLandmarks[0][4].x > results.multiHandLandmarks[0][8].x){
                console.log("a");
                teninshiki = 0;
                
            }
            if(results.multiHandLandmarks[0][4].x < results.multiHandLandmarks[0][8].x){
                console.log("b");
                teninshiki = 5;
            } 
            
           /*  if(results.multiHandLandmarks.length == 2){
              if(results.multiHandLandmarks[0][4].x < results.multiHandLandmarks[1][4].x){
                console.log("c");
                teninshiki_camera = 1;
              }else{
                console.log("d");
                teninshiki_camera = -1;
              }
            } */
            hand_x.push(results.multiHandLandmarks[0][8].x);
            if(results.multiHandLandmarks[0][8].x > hand_x[hand_x.length - 2]){
                console.log("c");
                teninshiki_camera = -0.5;
            }else{
                console.log("d");
                teninshiki_camera = 0.5;
            }

            hand_y.push(results.multiHandLandmarks[0][8].y);
            if(results.multiHandLandmarks[0][8].y > hand_y[hand_y.length - 2]){
                console.log("e");
                teninshiki_camera_y = 0.5;
            }else{
                console.log("f");
                teninshiki_camera_y = -0.5;
            }
            
            // 赤色でランドマークを可視化
            //drawLandmarks(ctx, marks, {color: '#f00'});
          })
        }
        //手が画面からアウトしたらカメラを元に戻す
        if(results.multiHandLandmarks.length == 0){
          console.log("stop");
          teninshiki_camera = 0;
          teninshiki_camera_y = 0;
          camera.position.x = 0;
          camera.position.y = 0;
        }

      });
    

    
    var media = navigator.mediaDevices.getUserMedia({
        video:{facingMode:"user"},
        audio:false
    });
    media.then((stream) =>{
        video.srcObject = stream;
    });
        video.onloadeddata = function(){
    var w = document.getElementById('video').width();
    var h = document.getElementById('video').height();
    document.getElementById('#canvas').attr('width', w);
    ('#canvas').attr('height', h);
    }

    camera2.start();
    //addEventListener('DOMContentLoaded', () => camera2.start());
}



window.addEventListener('DOMContentLoaded', init);



//こちらは物体を作ったり、作った物体をcanvasにレンダリングする部分です。
function init(){
    //rendererのサイズのための変数
    const width = 1440;
    const height = 650;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        alpha:true,
        
    });
    renderer.setSize(width,height);
    
    //シーンを作成
    const scene = new THREE.Scene();

    //ライトを作成
    const light1 = new THREE.DirectionalLight(0xFFFFFF);
    light1.intensity = 1;
    light1.position.set(0, 0, 1);
    // シーンにライトを追加
    scene.add(light1);

    //ライトを作成
    const light2 = new THREE.DirectionalLight(0xFFFFFF);
    light2.intensity = 1;
    light2.position.set(1, 0, 0);
    // シーンにライトを追加
    scene.add(light2);

      //ライトを作成
    const light3 = new THREE.DirectionalLight(0xFFFFFF);
    light3.intensity = 1;
    light3.position.set(-1, 0, 0);
    // シーンにライトを追加
    //scene.add(light3);

        //ライトを作成
    const light4 = new THREE.DirectionalLight(0xFFFFFF);
    light4.intensity = 1;
    light4.position.set(0, 0, -1);
    // シーンにライトを追加
    //scene.add(light4);

    const light5 = new THREE.DirectionalLight(0xFFFFFF);
    light5.intensity = 1;
    light5.position.set(0, 1, 0);
    // シーンにライトを追加
    //scene.add(light5);

        //ライトを作成
    const light6 = new THREE.DirectionalLight(0xFFFFFF);
    light6.intensity = 1;
    light6.position.set(0, -1, 0);
    // シーンにライトを追加
    //scene.add(light6);

    //カメラを作成
    camera = new THREE.PerspectiveCamera(45,width/height,1,10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 30;
    camera.lookAt(new THREE.Vector3(0,0,0));
    const controls = new THREE.OrbitControls(camera, document.body);

    //ヘルパーとして座標軸を入れる
    const axes = new THREE.AxesHelper(100000);
    scene.add(axes);
    
    //letter_blockを作る
    const geometry_letter_block = new THREE.BoxGeometry(1,1,1);
    const material_letter_block = new THREE.MeshStandardMaterial({
        color:0xffb8c6,
    });
    const letter_block = new THREE.Mesh(geometry_letter_block,material_letter_block);


    //文字「T」を作る
    letter_T = new THREE.Group();

    T_1 = letter_block.clone();
    T_1.position.set(0,0.5,0);
    letter_T.add(T_1);

    T_2 = letter_block.clone();
    T_2.position.set(0,1.5,0);
    letter_T.add(T_2);

    T_3 = letter_block.clone();
    T_3.position.set(0,2.5,0);
    letter_T.add(T_3);

    T_4 = letter_block.clone();
    T_4.position.set(0,3.5,0);
    letter_T.add(T_4);

    T_5 = letter_block.clone();
    T_5.position.set(0,4.5,0);
    letter_T.add(T_5);

    T_5 = letter_block.clone();
    T_5.position.set(0,4.5,0);
    letter_T.add(T_5);

    T_6 = letter_block.clone();
    T_6.position.set(1,4.5,0);
    letter_T.add(T_6);

    T_7 = letter_block.clone();
    T_7.position.set(2,4.5,0);
    letter_T.add(T_7);

    T_8 = letter_block.clone();
    T_8.position.set(-1,4.5,0);
    letter_T.add(T_8);

    T_9 = letter_block.clone();
    T_9.position.set(-2,4.5,0);
    letter_T.add(T_9);

    scene.add(letter_T);

    //文字「H」を作る
    letter_H = new THREE.Group();

    H_1 = letter_block.clone();
    H_1.position.set(0,2.5,0);
    letter_H.add(H_1);

    H_2 = letter_block.clone();
    H_2.position.set(1,2.5,0);
    letter_H.add(H_2);

    H_3 = letter_block.clone();
    H_3.position.set(2,2.5,0);
    letter_H.add(H_3);

    H_4 = letter_block.clone();
    H_4.position.set(-1,2.5,0);
    letter_H.add(H_4);

    H_5 = letter_block.clone();
    H_5.position.set(-2,2.5,0);
    letter_H.add(H_5);

    H_6 = letter_block.clone();
    H_6.position.set(2,0.5,0);
    letter_H.add(H_6);

    H_7 = letter_block.clone();
    H_7.position.set(2,1.5,0);
    letter_H.add(H_7);

    H_8 = letter_block.clone();
    H_8.position.set(2,3.5,0);
    letter_H.add(H_8);

    H_9 = letter_block.clone();
    H_9.position.set(2,4.5,0);
    letter_H.add(H_9);

    H_10 = letter_block.clone();
    H_10.position.set(-2,0.5,0);
    letter_H.add(H_10);

    H_11 = letter_block.clone();
    H_11.position.set(-2,1.5,0);
    letter_H.add(H_11);

    H_12 = letter_block.clone();
    H_12.position.set(-2,3.5,0);
    letter_H.add(H_12);

    H_13 = letter_block.clone();
    H_13.position.set(-2,4.5,0);
    letter_H.add(H_13);

    scene.add(letter_H);
    letter_H.position.set(5.5,0,0);

    //文字「A」を作る
    letter_A = new THREE.Group();

    A_1 = letter_block.clone();
    A_1.position.set(0,2.5,0);
    letter_A.add(A_1);

    A_2 = letter_block.clone();
    A_2.position.set(1,2.5,0);
    letter_A.add(A_2);

    A_3 = letter_block.clone();
    A_3.position.set(2,2.5,0);
    letter_A.add(A_3);

    A_4 = letter_block.clone();
    A_4.position.set(-1,2.5,0);
    letter_A.add(A_4);

    A_5 = letter_block.clone();
    A_5.position.set(-2,2.5,0);
    letter_A.add(A_5);

    A_6 = letter_block.clone();
    A_6.position.set(2,0.5,0);
    letter_A.add(A_6);

    A_7 = letter_block.clone();
    A_7.position.set(2,1.5,0);
    letter_A.add(A_7);

    A_8 = letter_block.clone();
    A_8.position.set(2,3.5,0);
    letter_A.add(A_8);

    A_9 = letter_block.clone();
    A_9.position.set(2,4.5,0);
    letter_A.add(A_9);

    A_10 = letter_block.clone();
    A_10.position.set(-2,0.5,0);
    letter_A.add(A_10);

    A_11 = letter_block.clone();
    A_11.position.set(-2,1.5,0);
    letter_A.add(A_11);

    A_12 = letter_block.clone();
    A_12.position.set(-2,3.5,0);
    letter_A.add(A_12);

    A_13 = letter_block.clone();
    A_13.position.set(-2,4.5,0);
    letter_A.add(A_13);

    A_14 = letter_block.clone();
    A_14.position.set(0,4.5,0);
    letter_A.add(A_14);

    A_15 = letter_block.clone();
    A_15.position.set(1,4.5,0);
    letter_A.add(A_15);

    A_16 = letter_block.clone();
    A_16.position.set(-1,4.5,0);
    letter_A.add(A_16);

    scene.add(letter_A);
    letter_A.position.set(11,0,0);

    //文字「N」を作る
    letter_N = new THREE.Group();

    N_1 = letter_block.clone();
    N_1.position.set(0,2.5,0);
    letter_N.add(N_1);

    N_2 = letter_block.clone();
    N_2.position.set(1,1.5,0);
    letter_N.add(N_2);

    N_3 = letter_block.clone();
    N_3.position.set(-1,3.5,0);
    letter_N.add(N_3);

    N_4 = letter_block.clone();
    N_4.position.set(2,0.5,0);
    letter_N.add(N_4);

    N_5 = letter_block.clone();
    N_5.position.set(2,1.5,0);
    letter_N.add(N_5);

    N_6 = letter_block.clone();
    N_6.position.set(2,2.5,0);
    letter_N.add(N_6);

    N_7 = letter_block.clone();
    N_7.position.set(2,3.5,0);
    letter_N.add(N_7);

    N_8 = letter_block.clone();
    N_8.position.set(2,4.5,0);
    letter_N.add(N_8);

    N_9 = letter_block.clone();
    N_9.position.set(-2,0.5,0);
    letter_N.add(N_9);

    N_10 = letter_block.clone();
    N_10.position.set(-2,1.5,0);
    letter_N.add(N_10);

    N_11 = letter_block.clone();
    N_11.position.set(-2,2.5,0);
    letter_N.add(N_11);

    N_12 = letter_block.clone();
    N_12.position.set(-2,3.5,0);
    letter_N.add(N_12);

    N_13 = letter_block.clone();
    N_13.position.set(-2,4.5,0);
    letter_N.add(N_13);

    scene.add(letter_N);
    letter_N.position.set(16.5,0,0);


    //文字「K」を作る
    letter_K = new THREE.Group();

    K_1 = letter_block.clone();
    K_1.position.set(-2,2.5,0);
    letter_K.add(K_1);

    K_2 = letter_block.clone();
    K_2.position.set(-2,3.5,0);
    letter_K.add(K_2);

    K_3 = letter_block.clone();
    K_3.position.set(-2,4.5,0);
    letter_K.add(K_3);

    K_4 = letter_block.clone();
    K_4.position.set(-2,1.5,0);
    letter_K.add(K_4);

    K_5 = letter_block.clone();
    K_5.position.set(-2,0.5,0);
    letter_K.add(K_5);

    K_6 = letter_block.clone();
    K_6.position.set(-1,2.5,0);
    letter_K.add(K_6);

    K_7 = letter_block.clone();
    K_7.position.set(0,3.5,0);
    letter_K.add(K_7);

    K_8 = letter_block.clone();
    K_8.position.set(0,1.5,0);
    letter_K.add(K_8);

    K_9 = letter_block.clone();
    K_9.position.set(1,4.5,0);
    letter_K.add(K_9);

    K_10 = letter_block.clone();
    K_10.position.set(2,4.5,0);
    letter_K.add(K_10);

    K_11 = letter_block.clone();
    K_11.position.set(1,0.5,0);
    letter_K.add(K_11);

    K_12 = letter_block.clone();
    K_12.position.set(2,0.5,0);
    letter_K.add(K_12);

    scene.add(letter_K);
    letter_K.position.set(22,0,0);

    //文字「Y」を作る
    letter_Y = new THREE.Group();

    Y_1 = letter_block.clone();
    Y_1.position.set(0,2.5,0);
    letter_Y.add(Y_1);

    Y_2 = letter_block.clone();
    Y_2.position.set(0,1.5,0);
    letter_Y.add(Y_2);

    Y_3 = letter_block.clone();
    Y_3.position.set(0,0.5,0);
    letter_Y.add(Y_3);

    Y_4 = letter_block.clone();
    Y_4.position.set(1,3.5,0);
    letter_Y.add(Y_4);

    Y_5 = letter_block.clone();
    Y_5.position.set(-1,3.5,0);
    letter_Y.add(Y_5);
    
    Y_6 = letter_block.clone();
    Y_6.position.set(2,4.5,0);
    letter_Y.add(Y_6);

    Y_7 = letter_block.clone();
    Y_7.position.set(-2,4.5,0);
    letter_Y.add(Y_7);

    scene.add(letter_Y);
    letter_Y.position.set(28.5,0,0);
    
    //文字「O」を作る
    letter_O = new THREE.Group();

    O_1 = letter_block.clone();
    O_1.position.set(0,0.5,0);
    letter_O.add(O_1);

    O_2 = letter_block.clone();
    O_2.position.set(1,0.5,0);
    letter_O.add(O_2);

    O_3 = letter_block.clone();
    O_3.position.set(-1,0.5,0);
    letter_O.add(O_3);

    O_4 = letter_block.clone();
    O_4.position.set(0,4.5,0);
    letter_O.add(O_4);

    O_5 = letter_block.clone();
    O_5.position.set(1,4.5,0);
    letter_O.add(O_5);

    O_6 = letter_block.clone();
    O_6.position.set(-1,4.5,0);
    letter_O.add(O_6);

    O_7 = letter_block.clone();
    O_7.position.set(-2,2.5,0);
    letter_O.add(O_7);

    O_8 = letter_block.clone();
    O_8.position.set(-2,3.5,0);
    letter_O.add(O_8);

    O_9 = letter_block.clone();
    O_9.position.set(-2,1.5,0);
    letter_O.add(O_9);

    O_10 = letter_block.clone();
    O_10.position.set(2,2.5,0);
    letter_O.add(O_10);

    O_11 = letter_block.clone();
    O_11.position.set(2,3.5,0);
    letter_O.add(O_11);

    O_12 = letter_block.clone();
    O_12.position.set(2,1.5,0);
    letter_O.add(O_12);

    scene.add(letter_O);
    letter_O.position.set(34,0,0);

    //文字「U」を作る
    letter_U = new THREE.Group();

    U_1 = letter_block.clone();
    U_1.position.set(0,0.5,0);
    letter_U.add(U_1);

    U_2 = letter_block.clone();
    U_2.position.set(1,0.5,0);
    letter_U.add(U_2);

    U_3 = letter_block.clone();
    U_3.position.set(-1,0.5,0);
    letter_U.add(U_3);

    U_4 = letter_block.clone();
    U_4.position.set(2,1.5,0);
    letter_U.add(U_4);

    U_5 = letter_block.clone();
    U_5.position.set(2,2.5,0);
    letter_U.add(U_5);

    U_6 = letter_block.clone();
    U_6.position.set(2,3.5,0);
    letter_U.add(U_6);

    U_7 = letter_block.clone();
    U_7.position.set(2,4.5,0);
    letter_U.add(U_7);

    U_8 = letter_block.clone();
    U_8.position.set(-2,1.5,0);
    letter_U.add(U_8);

    U_9 = letter_block.clone();
    U_9.position.set(-2,2.5,0);
    letter_U.add(U_9);

    U_10 = letter_block.clone();
    U_10.position.set(-2,3.5,0);
    letter_U.add(U_10);

    U_11 = letter_block.clone();
    U_11.position.set(-2,4.5,0);
    letter_U.add(U_11);

    scene.add(letter_U);
    letter_U.position.set(39.5,0,0);

    //単語「THANK」グループを作る
    word_THANK = new THREE.Group();
    word_THANK.add(letter_T);
    word_THANK.add(letter_H);
    word_THANK.add(letter_A);
    word_THANK.add(letter_N);
    word_THANK.add(letter_K);

    //単語「YOU」グループを作る
    word_YOU = new THREE.Group();
    word_YOU.add(letter_Y);
    word_YOU.add(letter_O);
    word_YOU.add(letter_U);



    const input_char = document.getElementById("input_char");
    const send_char = document.getElementById("send_char");
    console.log(input_char);
    console.log(send_char);
    send_char.addEventListener('click', function(){
      if(input_char.value == "THANKYOU"){
        scene.add(word_THANK);
        word_THANK.position.set(0,5.5,0);
        scene.add(word_YOU);
        word_YOU.position.set(-22,0,-5.5);
      }else{
        console.log("no input");
      }
    });

    //描写
    tick();

    function tick() {
        // レンダリング
        word_THANK.rotation.y += Math.PI/180*teninshiki;
        camera.position.x += 1*teninshiki_camera;
        camera.position.y += 1*teninshiki_camera_y;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}



   
