
let camera = {};
let hadoHand = 0;

//デバイスカメラの映像読込とHandsによる指の認識を実行している
window.onload = function(){

    //HTMLのvideoタグのidを取得
    const video2 = document.getElementById('video');
    
    //HANS関連ファイルの読み込み
    const config = {
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    };

    //configの情報を保持するHandsオブジェクトを生成
    const hands = new Hands(config);

    //デバイスカメラからの映像動画をhands.jsで利用する
    const camera2 = new Camera(video2, {
        onFrame: async () => {
          await hands.send({image: video2});
        },
        width: 1440,
        height: 650
    });

    //handsでの手認識の設定
    hands.setOptions({
        maxNumHands: 2,              //検出する手の最大数
        modelComplexity: 1,          //ランドマーク検出精度(0か1)
        minDetectionConfidence: 0.5, //手を検出するための信頼値(0.0~1.0)
        minTrackingConfidence: 0.5   //ランドマーク追跡の信頼度(0.0~1.0)
    });
      
    //手認識した結果の取得
    hands.onResults(results => {
        if(results.multiHandLandmarks) {
            results.multiHandLandmarks.forEach(marks => {

                if(results.multiHandLandmarks.length == 2){
                    hadoHand = 1;
                }
                
                if(results.multiHandLandmarks.length == 1){
                    hadoHand = 0;
                }
                
            })
         }

      //手がデバイスカメラからフレームアウトしたら（results.multiHandLandmarks.length == 0となったら）、
      if(results.multiHandLandmarks.length == 0){
                hadoHand = 0;
      }
    });
    
    //デバイスカメラの映像をHTMLのvideoタグの部分に表示させるための初期設定
    var media = navigator.mediaDevices.getUserMedia({
        video:{facingMode:"user"},
        audio:false
    });

    //streamの取得
    media.then((stream) =>{
        video.srcObject = stream;
    });

    //videoタグの縦横の大きさを取得
    video.onloadeddata = function(){
        var w = document.getElementById('video').width();
        var h = document.getElementById('video').height();
        document.getElementById('#canvas').attr('width', w);
        ('#canvas').attr('height', h);
    }

    //HTMLのvideoタグのidを取得
    camera2.start();
    
}



window.addEventListener('DOMContentLoaded', init);



//3D物体を作り、投影する
function init(){

    //WebGLRendererのオブジェクトを作成する
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),//canvasの指定
        alpha:true,//背景は透明
    });

    //rendererのサイズのための変数
    const width = 1440;
    const height = 650;
    
    //rendererに縦横を設定
    renderer.setSize(width,height);
    
    //シーンを作成
    const scene = new THREE.Scene();
    const scene2 = new THREE.Scene();

    //直線光ライトを作成
    const light1 = new THREE.DirectionalLight(0xFFFFFF);
    light1.intensity = 1;
    light1.position.set(0, 0, 1);

    // シーンにライトを追加
    scene.add(light1);
    scene2.add(light1);

    //２つ目の直線光ライトを作成
    const light5 = new THREE.DirectionalLight(0xFFFFFF);
    light5.intensity = 1;
    light5.position.set(0, 1, 0);
    
    //シーンに２つ目のライトを追加
    scene.add(light5);
    scene2.add(light5);

    //カメラを作成
    camera = new THREE.PerspectiveCamera(45,width/height,1,10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 30;
    camera.lookAt(new THREE.Vector3(0,0,0));
    const controls = new THREE.OrbitControls(camera, document.body);

    //ヘルパーとして座標軸を作成
    const axes = new THREE.AxesHelper(100000);
    scene.add(axes);
    scene2.add(axes);
    

    //３D物体としてアルファベットを作るための最小単位letter_blockを作る
    const geometry_letter_block = new THREE.BoxGeometry(1,1,1);
    const material_letter_block = new THREE.MeshStandardMaterial({
        color:0xff0000,
    });
    const letter_block = new THREE.Mesh(geometry_letter_block,material_letter_block);

//---------------------------------ここからはアルファベットの作成部分です。---------------------
    
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

//文字「B」を作る
    letter_B = new THREE.Group();

    B_1 = letter_block.clone();
    B_1.position.set(0,0.5,0);
    letter_B.add(B_1);

    B_2 = letter_block.clone();
    B_2.position.set(0,2.5,0);
    letter_B.add(B_2);

    B_3 = letter_block.clone();
    B_3.position.set(0,4.5,0);
    letter_B.add(B_3);

    B_4 = letter_block.clone();
    B_4.position.set(1,0.5,0);
    letter_B.add(B_4);

    B_5 = letter_block.clone();
    B_5.position.set(1,2.5,0);
    letter_B.add(B_5);

    B_6 = letter_block.clone();
    B_6.position.set(1,4.5,0);
    letter_B.add(B_6);

    B_7 = letter_block.clone();
    B_7.position.set(-1,0.5,0);
    letter_B.add(B_7);

    B_8 = letter_block.clone();
    B_8.position.set(-1,2.5,0);
    letter_B.add(B_8);

    B_9 = letter_block.clone();
    B_9.position.set(-1,4.5,0);
    letter_B.add(B_9);

    B_10 = letter_block.clone();
    B_10.position.set(-2,0.5,0);
    letter_B.add(B_10);

    B_11 = letter_block.clone();
    B_11.position.set(-2,1.5,0);
    letter_B.add(B_11);

    B_12 = letter_block.clone();
    B_12.position.set(-2,2.5,0);
    letter_B.add(B_12);

    B_13 = letter_block.clone();
    B_13.position.set(-2,3.5,0);
    letter_B.add(B_13);

    B_14 = letter_block.clone();
    B_14.position.set(-2,4.5,0);
    letter_B.add(B_14);

    B_15 = letter_block.clone();
    B_15.position.set(2,1.5,0);
    letter_B.add(B_15);

    B_16 = letter_block.clone();
    B_16.position.set(2,3.5,0);
    letter_B.add(B_16);

//文字「C」を作る
    letter_C = new THREE.Group();

    C_1 = letter_block.clone();
    C_1.position.set(0,0.5,0);
    letter_C.add(C_1);

    C_2 = letter_block.clone();
    C_2.position.set(0,4.5,0);
    letter_C.add(C_2);

    C_3 = letter_block.clone();
    C_3.position.set(1,0.5,0);
    letter_C.add(C_3);

    C_4 = letter_block.clone();
    C_4.position.set(1,4.5,0);
    letter_C.add(C_4);

    C_5 = letter_block.clone();
    C_5.position.set(2,0.5,0);
    letter_C.add(C_5);

    C_6 = letter_block.clone();
    C_6.position.set(2,4.5,0);
    letter_C.add(C_6);

    C_7 = letter_block.clone();
    C_7.position.set(-1,1.5,0);
    letter_C.add(C_7);

    C_8 = letter_block.clone();
    C_8.position.set(-1,3.5,0);
    letter_C.add(C_8);

    C_9 = letter_block.clone();
    C_9.position.set(-2,2.5,0);
    letter_C.add(C_9);

    //文字「D」を作る
    letter_D = new THREE.Group();

    D_1 = letter_block.clone();
    D_1.position.set(0,0.5,0);
    letter_D.add(D_1);

    D_2 = letter_block.clone();
    D_2.position.set(0,4.5,0);
    letter_D.add(D_2);

    D_3 = letter_block.clone();
    D_3.position.set(1,1.5,0);
    letter_D.add(D_3);

    D_4 = letter_block.clone();
    D_4.position.set(1,3.5,0);
    letter_D.add(D_4);

    D_5 = letter_block.clone();
    D_5.position.set(2,2.5,0);
    letter_D.add(D_4);

    D_6 = letter_block.clone();
    D_6.position.set(-1,0.5,0);
    letter_D.add(D_6);

    D_7 = letter_block.clone();
    D_7.position.set(-1,4.5,0);
    letter_D.add(D_7);

    D_8 = letter_block.clone();
    D_8.position.set(-2,0.5,0);
    letter_D.add(D_8);

    D_9 = letter_block.clone();
    D_9.position.set(-2,1.5,0);
    letter_D.add(D_9);

    D_10 = letter_block.clone();
    D_10.position.set(-2,2.5,0);
    letter_D.add(D_10);

    D_11 = letter_block.clone();
    D_11.position.set(-2,3.5,0);
    letter_D.add(D_11);

    D_12 = letter_block.clone();
    D_12.position.set(-2,4.5,0);
    letter_D.add(D_12);

//文字「E」を作る
    letter_E = new THREE.Group();

    E_1 = letter_block.clone();
    E_1.position.set(0,0.5,0);
    letter_E.add(E_1);

    E_2 = letter_block.clone();
    E_2.position.set(0,2.5,0);
    letter_E.add(E_2);

    E_3 = letter_block.clone();
    E_3.position.set(0,4.5,0);
    letter_E.add(E_3);

    E_4 = letter_block.clone();
    E_4.position.set(1,0.5,0);
    letter_E.add(E_4);

    E_5 = letter_block.clone();
    E_5.position.set(1,2.5,0);
    letter_E.add(E_5);

    E_6 = letter_block.clone();
    E_6.position.set(1,4.5,0);
    letter_E.add(E_6);

    E_7 = letter_block.clone();
    E_7.position.set(2,0.5,0);
    letter_E.add(E_7);

    E_8 = letter_block.clone();
    E_8.position.set(2,2.5,0);
    letter_E.add(E_8);

    E_9 = letter_block.clone();
    E_9.position.set(2,4.5,0);
    letter_E.add(E_9);

    E_10 = letter_block.clone();
    E_10.position.set(-1,0.5,0);
    letter_E.add(E_10);

    E_11 = letter_block.clone();
    E_11.position.set(-1,2.5,0);
    letter_E.add(E_11);

    E_12 = letter_block.clone();
    E_12.position.set(-1,4.5,0);
    letter_E.add(E_12);

    E_13 = letter_block.clone();
    E_13.position.set(-2,0.5,0);
    letter_E.add(E_13);

    E_14 = letter_block.clone();
    E_14.position.set(-2,1.5,0);
    letter_E.add(E_14);

    E_15 = letter_block.clone();
    E_15.position.set(-2,2.5,0);
    letter_E.add(E_15);

    E_16 = letter_block.clone();
    E_16.position.set(-2,3.5,0);
    letter_E.add(E_16);

    E_17 = letter_block.clone();
    E_17.position.set(-2,4.5,0);
    letter_E.add(E_17);

//文字「F」を作る
    letter_F = new THREE.Group();

    F_1 = letter_block.clone();
    F_1.position.set(0,2.5,0);
    letter_F.add(F_1);

    F_2 = letter_block.clone();
    F_2.position.set(0,4.5,0);
    letter_F.add(F_2);

    F_3 = letter_block.clone();
    F_3.position.set(1,2.5,0);
    letter_F.add(F_3);

    F_4 = letter_block.clone();
    F_4.position.set(1,4.5,0);
    letter_F.add(F_4);

    F_5 = letter_block.clone();
    F_5.position.set(2,2.5,0);
    letter_F.add(F_5);

    F_6 = letter_block.clone();
    F_6.position.set(2,4.5,0);
    letter_F.add(F_6);

    F_7 = letter_block.clone();
    F_7.position.set(-1,2.5,0);
    letter_F.add(F_7);

    F_8 = letter_block.clone();
    F_8.position.set(-1,4.5,0);
    letter_F.add(F_8);

    F_9 = letter_block.clone();
    F_9.position.set(-2,0.5,0);
    letter_F.add(F_9);

    F_10 = letter_block.clone();
    F_10.position.set(-2,1.5,0);
    letter_F.add(F_10);

    F_11 = letter_block.clone();
    F_11.position.set(-2,2.5,0);
    letter_F.add(F_11);

    F_12 = letter_block.clone();
    F_12.position.set(-2,3.5,0);
    letter_F.add(F_12);

    F_13 = letter_block.clone();
    F_13.position.set(-2,4.5,0);
    letter_F.add(F_13);

//文字「G」を作る
    letter_G = new THREE.Group();

    G_1 = letter_block.clone();
    G_1.position.set(0,0.5,0);
    letter_G.add(G_1);

    G_2 = letter_block.clone();
    G_2.position.set(0,4.5,0);
    letter_G.add(G_2);

    G_3 = letter_block.clone();
    G_3.position.set(1,0.5,0);
    letter_G.add(G_3);

    G_4 = letter_block.clone();
    G_4.position.set(1,2.5,0);
    letter_G.add(G_4);

    G_5 = letter_block.clone();
    G_5.position.set(1,4.5,0);
    letter_G.add(G_5);

    G_6 = letter_block.clone();
    G_6.position.set(2,1.5,0);
    letter_G.add(G_6);

    G_7 = letter_block.clone();
    G_7.position.set(2,4.5,0);
    letter_G.add(G_7);

    G_8 = letter_block.clone();
    G_8.position.set(-1,0.5,0);
    letter_G.add(G_8);

    G_9 = letter_block.clone();
    G_9.position.set(-1,4.5,0);
    letter_G.add(G_9);

    G_10 = letter_block.clone();
    G_10.position.set(-2,1.5,0);
    letter_G.add(G_10);

    G_11 = letter_block.clone();
    G_11.position.set(-2,2.5,0);
    letter_G.add(G_11);

    G_12 = letter_block.clone();
    G_12.position.set(-2,3.5,0);
    letter_G.add(G_12);

//文字「I」を作る
    letter_I = new THREE.Group();

    I_1 = letter_block.clone();
    I_1.position.set(0,0.5,0);
    letter_I.add(I_1);

    I_2 = letter_block.clone();
    I_2.position.set(0,1.5,0);
    letter_I.add(I_2);

    I_3 = letter_block.clone();
    I_3.position.set(0,2.5,0);
    letter_I.add(I_3);

    I_4 = letter_block.clone();
    I_4.position.set(0,3.5,0);
    letter_I.add(I_4);

    I_5 = letter_block.clone();
    I_5.position.set(0,4.5,0);
    letter_I.add(I_5);

    I_6 = letter_block.clone();
    I_6.position.set(1,0.5,0);
    letter_I.add(I_6);

    I_7 = letter_block.clone();
    I_7.position.set(1,4.5,0);
    letter_I.add(I_7);

    I_8 = letter_block.clone();
    I_8.position.set(-1,0.5,0);
    letter_I.add(I_8);

    I_9 = letter_block.clone();
    I_9.position.set(-1,4.5,0);
    letter_I.add(I_9);

//文字「J」を作る
    letter_J = new THREE.Group();

    J_1 = letter_block.clone();
    J_1.position.set(0,1.5,0);
    letter_J.add(J_1);

    J_2 = letter_block.clone();
    J_2.position.set(0,2.5,0);
    letter_J.add(J_2);

    J_3 = letter_block.clone();
    J_3.position.set(0,3.5,0);
    letter_J.add(J_3);

    J_4 = letter_block.clone();
    J_4.position.set(0,4.5,0);
    letter_J.add(J_4);

    J_5 = letter_block.clone();
    J_5.position.set(1,4.5,0);
    letter_J.add(J_5);

    J_6 = letter_block.clone();
    J_6.position.set(-1,4.5,0);
    letter_J.add(J_6);

    J_7 = letter_block.clone();
    J_7.position.set(-1,0.5,0);
    letter_J.add(J_7);

    J_8 = letter_block.clone();
    J_8.position.set(-2,1.5,0);
    letter_J.add(J_8);

//文字「L」を作る
    letter_L = new THREE.Group();

    L_1 = letter_block.clone();
    L_1.position.set(0,0.5,0);
    letter_L.add(L_1);

    L_2 = letter_block.clone();
    L_2.position.set(1,0.5,0);
    letter_L.add(L_2);

    L_3 = letter_block.clone();
    L_3.position.set(-1,0.5,0);
    letter_L.add(L_3);

    L_4 = letter_block.clone();
    L_4.position.set(-1,1.5,0);
    letter_L.add(L_4);

    L_5 = letter_block.clone();
    L_5.position.set(-1,2.5,0);
    letter_L.add(L_5);

    L_6 = letter_block.clone();
    L_6.position.set(-1,3.5,0);
    letter_L.add(L_6);

    L_7 = letter_block.clone();
    L_7.position.set(-1,4.5,0);
    letter_L.add(L_7);

//文字「M」を作る
    letter_M = new THREE.Group();

    M_1 = letter_block.clone();
    M_1.position.set(0,0.5,0);
    letter_M.add(M_1);

    M_2 = letter_block.clone();
    M_2.position.set(0,1.5,0);
    letter_M.add(M_2);

    M_3 = letter_block.clone();
    M_3.position.set(0,2.5,0);
    letter_M.add(M_3);

    M_4 = letter_block.clone();
    M_4.position.set(1,3.5,0);
    letter_M.add(M_4);

    M_5 = letter_block.clone();
    M_5.position.set(-1,3.5,0);
    letter_M.add(M_5);

    M_6 = letter_block.clone();
    M_6.position.set(-2,0.5,0);
    letter_M.add(M_6);

    M_7 = letter_block.clone();
    M_7.position.set(-2,1.5,0);
    letter_M.add(M_7);

    M_8 = letter_block.clone();
    M_8.position.set(-2,2.5,0);
    letter_M.add(M_8);

    M_9 = letter_block.clone();
    M_9.position.set(-2,3.5,0);
    letter_M.add(M_9);

    M_10 = letter_block.clone();
    M_10.position.set(-2,4.5,0);
    letter_M.add(M_10);

    M_11 = letter_block.clone();
    M_11.position.set(2,0.5,0);
    letter_M.add(M_11);

    M_12 = letter_block.clone();
    M_12.position.set(2,1.5,0);
    letter_M.add(M_12);

    M_13 = letter_block.clone();
    M_13.position.set(2,2.5,0);
    letter_M.add(M_13);

    M_14 = letter_block.clone();
    M_14.position.set(2,3.5,0);
    letter_M.add(M_14);

    M_15 = letter_block.clone();
    M_15.position.set(2,4.5,0);
    letter_M.add(M_15);

//文字「M」を作る
    letter_P = new THREE.Group();

    P_1 = letter_block.clone();
    P_1.position.set(0,2.5,0);
    letter_P.add(P_1);

    P_2 = letter_block.clone();
    P_2.position.set(0,4.5,0);
    letter_P.add(P_1);

    P_3 = letter_block.clone();
    P_3.position.set(1,2.5,0);
    letter_P.add(P_3);

    P_4 = letter_block.clone();
    P_4.position.set(1,4.5,0);
    letter_P.add(P_4);

    P_5 = letter_block.clone();
    P_5.position.set(2,2.5,0);
    letter_P.add(P_5);

    P_6 = letter_block.clone();
    P_6.position.set(2,3.5,0);
    letter_P.add(P_6);

    P_7 = letter_block.clone();
    P_7.position.set(2,4.5,0);
    letter_P.add(P_7);

    P_8 = letter_block.clone();
    P_8.position.set(-1,2.5,0);
    letter_P.add(P_8);

    P_9 = letter_block.clone();
    P_9.position.set(-1,4.5,0);
    letter_P.add(P_9);

    P_10 = letter_block.clone();
    P_10.position.set(-2,0.5,0);
    letter_P.add(P_10);

    P_11 = letter_block.clone();
    P_11.position.set(-2,1.5,0);
    letter_P.add(P_11);

    P_12 = letter_block.clone();
    P_12.position.set(-2,2.5,0);
    letter_P.add(P_12);

    P_13 = letter_block.clone();
    P_13.position.set(-2,3.5,0);
    letter_P.add(P_13);

    P_14 = letter_block.clone();
    P_14.position.set(-2,4.5,0);
    letter_P.add(P_14);

//文字「Q」を作る
    letter_Q = new THREE.Group();

    Q_1 = letter_block.clone();
    Q_1.position.set(0,1.5,0);
    letter_Q.add(Q_1);

    Q_2 = letter_block.clone();
    Q_2.position.set(0,4.5,0);
    letter_Q.add(Q_2);

    Q_3 = letter_block.clone();
    Q_3.position.set(1,1.5,0);
    letter_Q.add(Q_3);

    Q_4 = letter_block.clone();
    Q_4.position.set(1,2.5,0);
    letter_Q.add(Q_4);

    Q_5 = letter_block.clone();
    Q_5.position.set(1,4.5,0);
    letter_Q.add(Q_5);

    Q_6 = letter_block.clone();
    Q_6.position.set(2,0.5,0);
    letter_Q.add(Q_6);

    Q_7 = letter_block.clone();
    Q_7.position.set(2,3.5,0);
    letter_Q.add(Q_7);

    Q_8 = letter_block.clone();
    Q_8.position.set(-1,0.5,0);
    letter_Q.add(Q_8);

    Q_9 = letter_block.clone();
    Q_9.position.set(-1,4.5,0);
    letter_Q.add(Q_9);

    Q_10 = letter_block.clone();
    Q_10.position.set(-2,1.5,0);
    letter_Q.add(Q_10);

    Q_11 = letter_block.clone();
    Q_11.position.set(-2,2.5,0);
    letter_Q.add(Q_11);

    Q_12 = letter_block.clone();
    Q_12.position.set(-2,3.5,0);
    letter_Q.add(Q_12);

//文字「R」を作る
    letter_R = new THREE.Group();

    R_1 = letter_block.clone();
    R_1.position.set(0,1.5,0);
    letter_R.add(R_1);

    R_2 = letter_block.clone();
    R_2.position.set(0,2.5,0);
    letter_R.add(R_2);

    R_3 = letter_block.clone();
    R_3.position.set(0,4.5,0);
    letter_R.add(R_3);

    R_4 = letter_block.clone();
    R_4.position.set(1,0.5,0);
    letter_R.add(R_4);

    R_5 = letter_block.clone();
    R_5.position.set(1,2.5,0);
    letter_R.add(R_5);

    R_6 = letter_block.clone();
    R_6.position.set(1,4.5,0);
    letter_R.add(R_6);

    R_7 = letter_block.clone();
    R_7.position.set(2,0.5,0);
    letter_R.add(R_7);

    R_8 = letter_block.clone();
    R_8.position.set(2,2.5,0);
    letter_R.add(R_8);

    R_9 = letter_block.clone();
    R_9.position.set(-1,2.5,0);
    letter_R.add(R_9);

    R_10 = letter_block.clone();
    R_10.position.set(-1,4.5,0);
    letter_R.add(R_10);

    R_11 = letter_block.clone();
    R_11.position.set(-2,0.5,0);
    letter_R.add(R_11);

    R_12 = letter_block.clone();
    R_12.position.set(-2,1.5,0);
    letter_R.add(R_12);

    R_13 = letter_block.clone();
    R_13.position.set(-2,2.5,0);
    letter_R.add(R_13);

    R_14 = letter_block.clone();
    R_14.position.set(-2,3.5,0);
    letter_R.add(R_14);

    R_15 = letter_block.clone();
    R_15.position.set(-2,4.5,0);
    letter_R.add(R_15);

//文字「S」を作る
    letter_S = new THREE.Group();

    S_1 = letter_block.clone();
    S_1.position.set(0,0.5,0);
    letter_S.add(S_1);

    S_2 = letter_block.clone();
    S_2.position.set(0,2.5,0);
    letter_S.add(S_2);

    S_3 = letter_block.clone();
    S_3.position.set(0,4.5,0);
    letter_S.add(S_3);

    S_4 = letter_block.clone();
    S_4.position.set(1,0.5,0);
    letter_S.add(S_4);

    S_5 = letter_block.clone();
    S_5.position.set(1,2.5,0);
    letter_S.add(S_5);

    S_6 = letter_block.clone();
    S_6.position.set(1,4.5,0);
    letter_S.add(S_6);

    S_7 = letter_block.clone();
    S_7.position.set(2,1.5,0);
    letter_S.add(S_7);

    S_8 = letter_block.clone();
    S_8.position.set(2,4.5,0);
    letter_S.add(S_8);

    S_9 = letter_block.clone();
    S_9.position.set(-1,0.5,0);
    letter_S.add(S_9);

    S_10 = letter_block.clone();
    S_10.position.set(-1,2.5,0);
    letter_S.add(S_10);

    S_11 = letter_block.clone();
    S_11.position.set(-1,4.5,0);
    letter_S.add(S_11);

    S_12 = letter_block.clone();
    S_12.position.set(-2,0.5,0);
    letter_S.add(S_12);

    S_13 = letter_block.clone();
    S_13.position.set(-2,3.5,0);
    letter_S.add(S_13);

//文字「V」を作る
    letter_V = new THREE.Group();

    V_1 = letter_block.clone();
    V_1.position.set(0,0.5,0);
    letter_V.add(V_1);

    V_2 = letter_block.clone();
    V_2.position.set(1,1.5,0);
    letter_V.add(V_2);

    V_3 = letter_block.clone();
    V_3.position.set(1,2.5,0);
    letter_V.add(V_3);

    V_4 = letter_block.clone();
    V_4.position.set(2,3.5,0);
    letter_V.add(V_4);

    V_5 = letter_block.clone();
    V_5.position.set(2,4.5,0);
    letter_V.add(V_5);

    V_6 = letter_block.clone();
    V_6.position.set(-1,1.5,0);
    letter_V.add(V_6);

    V_7 = letter_block.clone();
    V_7.position.set(-1,2.5,0);
    letter_V.add(V_7);

    V_8 = letter_block.clone();
    V_8.position.set(-2,3.5,0);
    letter_V.add(V_8);

    V_9 = letter_block.clone();
    V_9.position.set(-2,4.5,0);
    letter_V.add(V_9);

//文字「W」を作る
    letter_W = new THREE.Group();

    W_1 = letter_block.clone();
    W_1.position.set(0,2.5,0);
    letter_W.add(W_1);

    W_2 = letter_block.clone();
    W_2.position.set(0,3.5,0);
    letter_W.add(W_2);

    W_3 = letter_block.clone();
    W_3.position.set(0,4.5,0);
    letter_W.add(W_3);

    W_4 = letter_block.clone();
    W_4.position.set(1,1.5,0);
    letter_W.add(W_4);

    W_5 = letter_block.clone();
    W_5.position.set(-1,1.5,0);
    letter_W.add(W_5);

    W_6 = letter_block.clone();
    W_6.position.set(2,0.5,0);
    letter_W.add(W_6);

    W_7 = letter_block.clone();
    W_7.position.set(2,1.5,0);
    letter_W.add(W_7);

    W_8 = letter_block.clone();
    W_8.position.set(2,2.5,0);
    letter_W.add(W_8);

    W_9 = letter_block.clone();
    W_9.position.set(2,3.5,0);
    letter_W.add(W_9);

    W_10 = letter_block.clone();
    W_10.position.set(2,4.5,0);
    letter_W.add(W_10);

    W_11 = letter_block.clone();
    W_11.position.set(-2,0.5,0);
    letter_W.add(W_11);

    W_12 = letter_block.clone();
    W_12.position.set(-2,1.5,0);
    letter_W.add(W_12);

    W_13 = letter_block.clone();
    W_13.position.set(-2,2.5,0);
    letter_W.add(W_13);

    W_14 = letter_block.clone();
    W_14.position.set(-2,3.5,0);
    letter_W.add(W_14);

    W_15 = letter_block.clone();
    W_15.position.set(-2,4.5,0);
    letter_W.add(W_15);

//文字「X」を作る
    letter_X = new THREE.Group();

    X_1 = letter_block.clone();
    X_1.position.set(0,2.5,0);
    letter_X.add(X_1);

    X_2 = letter_block.clone();
    X_2.position.set(1,1.5,0);
    letter_X.add(X_2);

    X_3 = letter_block.clone();
    X_3.position.set(1,3.5,0);
    letter_X.add(X_3);

    X_4 = letter_block.clone();
    X_4.position.set(2,0.5,0);
    letter_X.add(X_4);

    X_5 = letter_block.clone();
    X_5.position.set(2,4.5,0);
    letter_X.add(X_5);

    X_6 = letter_block.clone();
    X_6.position.set(-1,1.5,0);
    letter_X.add(X_6);

    X_7 = letter_block.clone();
    X_7.position.set(-1,3.5,0);
    letter_X.add(X_7);

    X_8 = letter_block.clone();
    X_8.position.set(-2,0.5,0);
    letter_X.add(X_8);

    X_9 = letter_block.clone();
    X_9.position.set(-2,4.5,0);
    letter_X.add(X_9);

//文字「Z」を作る
    letter_Z = new THREE.Group();

    Z_1 = letter_block.clone();
    Z_1.position.set(0,0.5,0);
    letter_Z.add(Z_1);

    Z_2 = letter_block.clone();
    Z_2.position.set(0,2.5,0);
    letter_Z.add(Z_2);

    Z_3 = letter_block.clone();
    Z_3.position.set(0,4.5,0);
    letter_Z.add(Z_3);

    Z_4 = letter_block.clone();
    Z_4.position.set(1,0.5,0);
    letter_Z.add(Z_4);

    Z_5 = letter_block.clone();
    Z_5.position.set(1,3.5,0);
    letter_Z.add(Z_5);

    Z_6 = letter_block.clone();
    Z_6.position.set(1,4.5,0);
    letter_Z.add(Z_6);

    Z_7 = letter_block.clone();
    Z_7.position.set(2,0.5,0);
    letter_Z.add(Z_7);

    Z_8 = letter_block.clone();
    Z_8.position.set(2,1.5,0);
    letter_Z.add(Z_8);

    Z_9 = letter_block.clone();
    Z_9.position.set(2,4.5,0);
    letter_Z.add(Z_9);

    Z_10 = letter_block.clone();
    Z_10.position.set(-1,0.5,0);
    letter_Z.add(Z_10);

    Z_11 = letter_block.clone();
    Z_11.position.set(-1,1.5,0);
    letter_Z.add(Z_11);

    Z_12 = letter_block.clone();
    Z_12.position.set(-1,4.5,0);
    letter_Z.add(Z_12);

    Z_13 = letter_block.clone();
    Z_13.position.set(-2,0.5,0);
    letter_Z.add(Z_13);

    Z_14 = letter_block.clone();
    Z_14.position.set(-2,3.5,0);
    letter_Z.add(Z_14);

    Z_15 = letter_block.clone();
    Z_15.position.set(-2,4.5,0);
    letter_Z.add(Z_15);
    
//-----------------------アルファベットの作成終了--------------------------

/*
    scene.add(letter_T);
    scene.add(letter_H);
    letter_H.position.set(5.5,0,0);
    scene.add(letter_A);
    letter_A.position.set(11,0,0);
    scene.add(letter_N);
    letter_N.position.set(16.5,0,0);
    scene.add(letter_K);
    letter_K.position.set(22,0,0);
    scene.add(letter_Y);
    letter_Y.position.set(28.5,0,0);
    scene.add(letter_O);
    letter_O.position.set(34,0,0);
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
*/

/*
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
*/


        Hadoken_H = letter_H.clone();
        Hadoken_A = letter_A.clone();
        Hadoken_D = letter_D.clone();
        Hadoken_O = letter_O.clone();
        Hadoken_K = letter_K.clone();
        Hadoken_E = letter_E.clone();
        Hadoken_N = letter_N.clone();

        Hadoken_H.position.set(-12.5,0,0);
        Hadoken_A.position.set(-7.5,0,0);
        Hadoken_D.position.set(-2.5,0,0);
        Hadoken_O.position.set(2.5,0,0);
        Hadoken_K.position.set(7.5,0,0);
        Hadoken_E.position.set(12.5,0,0);
        Hadoken_N.position.set(17.5,0,0);

        Hadoken_renda = new THREE.Group();
        Hadoken_renda.add(Hadoken_H);
        Hadoken_renda.add(Hadoken_A);
        Hadoken_renda.add(Hadoken_D);
        Hadoken_renda.add(Hadoken_O);
        Hadoken_renda.add(Hadoken_K);
        Hadoken_renda.add(Hadoken_E);
        Hadoken_renda.add(Hadoken_N);

        Hadoken_renda.position.set(0,0,-1000);
        scene2.add(Hadoken_renda);



    //描写
    tick();

    function tick() {
        // レンダリング
        if(hadoHand == 0){
            renderer.render(scene, camera);
            Hadoken_renda.position.set(0,0,-1000); 
        }
        if(hadoHand == 1){
            Hadoken_renda.position.z += 8;
            Hadoken_renda.rotation.y += Math.PI/180*1;
            renderer.render(scene2, camera);
        }
        requestAnimationFrame(tick);
    }

}



   
