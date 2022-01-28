import { kurage } from './js/kurage.js';
console.log(kurage.counter);
//ここで実行
$(()=>{
     setInterval(animate, 1000/ 100);
     setInterval(update, 1000/ 40);
     setInterval(update_s, 1000 / 100);
    
     $('#bubble').on('click',function(){
        kurage.is_push = true;
        kurage.is_teisi = true;
   });
     //クリックした位置にクラゲを移動
     $('#lUI').on('click', function(e) {
         console.log("lAnime1");
        if(!kurage.is_push){
            kurage.is_click = true;
        //クリック時のX,Y取得
        kurage.goal_x = e.offsetX;
        kurage.goal_y = e.offsetY;
        
        kurage.is_goal_x = true;
        kurage.is_goal_y = true;
        }
      });
    
    // ボタン表示非表示設定
    $('.conf').hide();
    $('#end').hide();

    $('#menu').on('click', () => {
        $('.conf').show();
    });
    $('#close').on('click', () => {
        $('.conf').hide();
    })
    $('#appreciation').on('click', () => {
        $('.hide').hide();
        $('#end').show();
    })
    $('#end').on('click', () => {
        $('.hide').show();
        $('#end').hide();
    })
});

//クラゲアニメーション
let animate = ()=>{
    kurage.animate();
}

//クラゲのサイズと向き変更
let update_s = (e)=>{ 
    //ゴール位置までずっと回転する
    if(kurage.is_push){
        kurage.kurage_y<=200?kurage.kakudo2+=2:kurage.kakudo2+=5;
        kurage.kakudo2>=360?kurage.kakudo2=0:"";
    }else{
        if(kurage.is_teisi){
            if((kurage.kakudo1_2>=0&&kurage.kakudo1_2<=180)||kurage.kakudo1_2<=-180){
                //右に回転
                kurage.kakudo2++;
                kurage.kakudo2>=360?kurage.kakudo2=0:"";
            }else{
                //左に回転
                kurage.kakudo2==0?kurage.kakudo2=360:"";
                kurage.kakudo2--;
            }
            //現在角度と進みたい角度が一致した場合、is_teisiをtrueにする
            kurage.kakudo1==kurage.kakudo2?kurage.is_teisi=false:"";
        }
    }
    //サイズ変更
    kurage.size = kurage.size >= kurage.MAX_SIZE ? kurage.MAX_SIZE : kurage.size+0.0001;
    //画像アップデート
    $(".img").css("width", kurage.size);
    $('.img').css({transform: "rotate( "+kurage.kakudo2+"deg )"});
}

//クラゲを前にすすめる・ゴール位置の設定
let update = (e)=>{
    kurage.update();
}