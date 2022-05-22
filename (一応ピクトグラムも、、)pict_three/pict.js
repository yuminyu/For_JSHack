
window.addEventListener('DOMContentLoaded', init);
let moveX = 1;
let moveY = 1;
let moveZ = 1;

function init(){
    console.log(Math.random());
    //rendererのサイズのための変数
    const width = 1440;
    const height = 650;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#pictCanvas'),
        alpha:true,
        
    });
    renderer.setClearColor(0x000000,1);
    renderer.setSize(width,height);
    
    //シーンを作成
    const scene = new THREE.Scene();

    //ライトを作成
    const light1 = new THREE.DirectionalLight(0xFFFFFF);
    light1.intensity = 1;
    light1.position.set(0, 0, 1);
    // シーンにライトを追加
    scene.add(light1);

    //スポットライト new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
    const light2 = new THREE.SpotLight(0xFFFFFF, 4, 1000, Math.PI / 4, 0, 0.5);
    light2.position.set(0,0,-500*Math.sqrt(2));
    scene.add(light2);
    //スポットライトのヘルパー
    const lightHelper = new THREE.SpotLightHelper(light2);
    scene.add(lightHelper);

    //カメラを作成
    const camera = new THREE.PerspectiveCamera(45,width/height,1,10000);
    camera.position.x = 0;
    camera.position.y = 500;
    camera.position.z = 500;
    camera.lookAt(new THREE.Vector3(0,0,0));
    const controls = new THREE.OrbitControls(camera, document.body);

    //ピクトグラムのボディを作成
    const geometry_body = new THREE.BoxGeometry(6,10,4);
    const material_body = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    pict_body = new THREE.Mesh(geometry_body,material_body);
    pict_body.position.set(0,0,0);
    
    //ピクトグラムの右腕を作成
    const geometry_arm_right = new THREE.BoxGeometry(3,5,4);
    const material_arm_right = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    const pict_arm_right = new THREE.Mesh(geometry_arm_right,material_arm_right);
    pict_arm_right.position.set(4.6,2.5,0);

    //ピクトグラムの左腕を作成
    const geometry_arm_left = new THREE.BoxGeometry(3,5,4);
    const material_arm_left = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    const pict_arm_left = new THREE.Mesh(geometry_arm_left,material_arm_left);
    pict_arm_left.position.set(-4.7,2.5,0);

    //ピクトグラムの右脚を作成
    const geometry_leg_right = new THREE.BoxGeometry(2.9,5,4);
    const material_leg_right = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    const pict_leg_right = new THREE.Mesh(geometry_leg_right,material_leg_right);
    pict_leg_right.position.set(1.6,-7.8,0);

    //ピクトグラムの左足を作成
    const geometry_leg_left = new THREE.BoxGeometry(2.9,5,4);
    const material_leg_left = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    const pict_leg_left = new THREE.Mesh(geometry_leg_right,material_leg_right);
    pict_leg_left.position.set(-1.6,-7.8,0);


    //ピクトグラムの頭を作成
    const geometry_head = new THREE.SphereGeometry(3,64,32);
    const material_head = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
    });
    const pict_head = new THREE.Mesh(geometry_head,material_head);
    pict_head.position.set(0,8,0);

    //pictオブジェクトグループを作成
    pict = new THREE.Group();

    //パーツをpictにまとめる
    pict.add(pict_body);
    pict.add(pict_arm_right);
    pict.add(pict_arm_left);
    pict.add(pict_leg_right);
    pict.add(pict_leg_left);
    pict.add(pict_head);

    //球体を作成
    const geometry_sphere = new THREE.SphereGeometry(500,64,32);
    const material_sphere = new THREE.MeshStandardMaterial({
        color:0xFFFFFF,
        transparent:true,
        opacity:0.5
    });
    const sphere_wrap = new THREE.Mesh(geometry_sphere,material_sphere);
    sphere_wrap.position.set(0,0,0);

    //ヘルパーとして座標軸を入れる
    const axes = new THREE.AxesHelper(100000);
    scene.add(axes);

    //pictをpict_number個ランダム配置する
    const pict_number = 100;
    const pict_array=[];
    //pictを表示する場所を球の内とするため、球の半径を設定
    const radi = 500;
    for(let i = 0 ; i<pict_number; i++){
        //pictをランダム配置するための処理
        const random_number1 = Math.floor(Math.random()*361);
        const random_number2 = Math.floor(Math.random()*361);
        const radi_random = Math.floor(Math.random()*(radi+1));
        pict_array[i] = pict.clone();
        pict_array[i].position.set(radi_random*Math.sin(random_number1*Math.PI/180)*Math.cos(random_number2*Math.PI/180),radi_random*Math.sin(random_number1*Math.PI/180)*Math.sin(random_number2*Math.PI/180),radi_random*Math.cos(random_number1*Math.PI/180));
        
        //pictの姿勢をランダムにするための処理
        const random_number3 = Math.floor(Math.random()*361);
        const random_number4 = Math.floor(Math.random()*361);
        const random_number5 = Math.floor(Math.random()*361);
        pict_array[i].rotation.set(random_number3*Math.PI/180,random_number4*Math.PI/180,random_number5*Math.PI/180);
        
        //pictをシーンに追加
        //scene.add(pict_array[i]);
    }

    //pict_arrayの全要素と球体をオブジェクトグループにする
    picts_sphere = new THREE.Group();
    for(let i = 0; i<pict_number; i++){
        picts_sphere.add(pict_array[i]);
    }
    picts_sphere.add(sphere_wrap);
    scene.add(picts_sphere)

    picts_sphere2 = picts_sphere.clone();
    picts_sphere2.position.set(1000,1000,1000);
    scene.add(picts_sphere2);

    scene.add(pict);
    pict.position.set(0,0,0);
    
    //letter_blockを作る
    const geometry_letter_block = new THREE.BoxGeometry(1,1,1);
    const material_letter_block = new THREE.MeshStandardMaterial({
        color:0xFFFFFF
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

    //描写
    tick();
    animate_pict();

    function tick() {
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }


    function animate_pict(){
        if(((pict.position.x)*(pict.position.x)+(pict.position.y)*(pict.position.y)+(pict.position.z)*(pict.position.z)) > 250000){
            moveX *= -1;
            moveY *= -1;
            moveZ *= -1;
        }
        pict.position.x += moveX;
        pict.position.y += moveY;
        pict.position.z += moveZ;
        // なんとなく回転もさせておく
        pict.rotation.x += 0.01;
        pict.rotation.y += 0.01;
        pict.rotation.z += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animate_pict);
    }

}
