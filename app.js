// import { esayari, esayari2 } from "./js/esa.js"
import kurage from "./js/kurage.js"

kurage.eat();
kurage.move();

console.log(kurage.counter);


//画像番号の変数
let counter = 0;
//画像213枚
const NUM_IMAGES = 213;
//クラゲの現在地
let kurage_x = 200;
let kurage_y = 500;
//イーズアウト変数
let sx = 0;
let sy = 0;
//クラゲの向かいたい位置
let goal_x = 200;
let goal_y = 200;

let kaiten;
let kakudo1 = 1;
let kakudo2 = 0;
//（向かいたい角度　-　現在角度）
let kakudo1_2 = 0;

let is_goal_x = false;
let is_goal_y = false;
let is_teisi = true;
let is_click = false;
let is_push = false;
//クラゲ現在のサイズ
let size = 100;
//クラゲ最大サイズ
let MAX_SIZE = 400;



//ここで実行
$(()=>{
     setInterval(animate, 1000/ 100);
     setInterval(update, 1000/ 40);
     setInterval(update_s, 1000 / 100);
    
     $('#push').on('click',function(){
         is_push = true;
         is_teisi = true;
    });
     //クリックした位置にクラゲを移動
     $('.container').on('click', function(e) {
        if(!is_push){
        is_click = true;
        //クリック時のX,Y取得
        goal_x = e.offsetX;
        goal_y = e.offsetY;
        
        is_goal_x = true;
        is_goal_y = true;
        }
      });
      
});

//クラゲアニメーション
let animate = (e)=>{
    $("#kurage").attr("src", `images/jf/jf06_2/06_${counter}.png`);
    counter = (counter+1) % NUM_IMAGES;
}

//クラゲのサイズと向き変更
let update_s = (e)=>{ 
    //ゴール位置までずっと回転する
    if(is_push){
        kurage_y<=200?kakudo2+=2:kakudo2+=5;
        kakudo2>=360?kakudo2=0:"";
    }else{
        if(is_teisi){
            if((kakudo1_2>=0&&kakudo1_2<=180)||kakudo1_2<=-180){
                //右に回転
                kakudo2++;
                kakudo2>=360?kakudo2=0:"";
            }else{
                //左に回転
                kakudo2==0?kakudo2=360:"";
                kakudo2--;
            }
            //現在角度と進みたい角度が一致した場合、is_teisiをtrueにする
            kakudo1==kakudo2?is_teisi=false:"";
        }
    }
    //サイズ変更
    size = size >= MAX_SIZE ? MAX_SIZE : size+0.0001;
    //画像アップデート
    $(".img").css("width", size);
    $('.img').css({transform: "rotate( "+kakudo2+"deg )"});
}

//クラゲを前にすすめる・ゴール位置の設定
let update = (e)=>{
    //クラゲを上に移動
    if(is_push&&(Math.abs(50 - kurage_y) > 30)){
        sy = ( 50 - kurage_y ) / 100;
        kurage_y += sy;
    }else if(is_teisi&&is_push){
        is_goal_x = true;
        is_goal_y = true;
    }
    //クラゲが回転停止したら実行
    if(!is_teisi) {
        if(Math.abs(goal_x - kurage_x) > 30) {
            //イーズアウト計算
            sx = ( goal_x - kurage_x ) / 100;
            kurage_x += sx;
        } else {
            is_goal_x = true;
        }
    
        if(Math.abs(goal_y - kurage_y) > 30) {
            //イーズアウト計算
            sy = ( goal_y - kurage_y ) / 100;
            kurage_y += sy;
        } else {
            is_goal_y = true;
        }    
    }
    //クラゲがゴール位置についたら実行
    if( is_goal_x && is_goal_y ) {
        is_push = false;
        is_teisi = true;
        is_goal_x = false;
        is_goal_y = false;
        //クリックされていなければ実行
        if(!is_click){
            //ゴール位置設定
            goal_x = Math.random()*300;
            goal_y = Math.random()*500;
        }else{
            is_click = false;
        }
        //現在地からゴール位置の角度計算
        kaiten = Math.atan2( goal_y - kurage_y, goal_x - kurage_x );
        kakudo1 = Math.round(kaiten * (180 / Math.PI)+90);
        kakudo1<0?kakudo1=360+kakudo1:"";
        kakudo1_2 = kakudo1-kakudo2;
    }
    //画像アップデート
     $(".img").css("top", kurage_y);
     $(".img").css("left", kurage_x);
}