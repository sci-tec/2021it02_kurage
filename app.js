import { kurage } from './js/kurage.js';
let awa_width = -10;
let awa_height = 0;
var f_awa = true;
let bgm = new Audio('bgm/01.mp3');
let bgm_num = 1;
//泡の配置
while(f_awa){
    let awa_left = (Math.floor(Math.random() * 2))*25;
    let awa_top =(Math.floor(Math.random() * 4))*20;
    let awa_size =(Math.floor(Math.random() * (4 - 2)) + 2)*10;
    awa_width += awa_left;
        //htlmに追加
        $('#awa1').append(`<div id="awa" style="width:${awa_size}px;height:${awa_size}px;margin-top:${awa_top+awa_height}px;margin-left: ${awa_width}px;"></div>`);
        awa_width += (50-awa_left);
    if(awa_width>innerWidth){
        awa_height += 80;
        awa_height > (innerHeight-100)?f_awa=false:"";
        awa_width = 0; 
    }
    // console.log("泡数");
}


//ここで実行
$(()=>{
     setInterval(date_time, 1000/1);
     setInterval(animate, 1000/ 100);
     setInterval(update, 1000/ 40);
     setInterval(update_s, 1000 / 100);


    
    // bgm再生
    bgm.play();
    bgm.loop = true;
    // bgm切り替え
    $('#bgm').on('click', () => {
        if(bgm_num < 5){
            bgm_num++;
        } else {
            bgm_num = 1;
        }
        bgm.pause();
        bgm = new Audio(`bgm/0${bgm_num}.mp3`);      
        bgm.play();
        console.log(bgm_num);
    });


    //あわクリック
     $('#bubble').on('click',function(){
         kurage.is_awa = true;
         kurage.awa = $("#lUI").css("height").split("px").map(Number)[0];
    });
    // //  餌クリック
    // $('#food').on('click',function(){
    //     if(!kurage.is_push){
    //         kurage.is_eat = true;
    //         kurage.is_click = true;
    //     //クリック時のX,Y取得
    //     kurage.goal_x = $('#ab').offset().left;
    //     kurage.goal_y = $('#ab').offset().top;
        
    //     kurage.is_goal_x = true;
    //     kurage.is_goal_y = true;
    //     }
        
//    });
     //クリックした位置にクラゲを移動
     $('#lUI').on('click', function(e) {
        $('#tat').append(`<div id="aaa"style="margin-top:${e.offsetY-50}px;margin-left: ${e.offsetX-50}px;"></div>`);
        kurage.is_hamon=true;
        if(!kurage.is_push){
            kurage.is_click = true;
        //クリック時のX,Y取得
        // console.log(e.offsetX,e.offsetY);
        kurage.goal_x = e.offsetX;
        kurage.goal_y = e.offsetY;
        
        kurage.is_goal_x = true;
        kurage.is_goal_y = true;
        }
    });
    //水交換クリックで水質が100%になる
    $("#waterChange").on('click',()=>localStorage.removeItem("Twater"));
    //データリセット
    $("#reset").on('click',()=>localStorage.clear());

    $("#nameChange").on('click',()=>{
        var nameC = prompt("name");
        $('.kurage-name').text(nameC);
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
    $("#food").click(()=>{
        addEsa();
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
        kurage.kurage_y<=200?kurage.kakudo2+=4:kurage.kakudo2+=6;
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
    kurage.size = kurage.size >= kurage.MAX_SIZE ? kurage.MAX_SIZE : kurage.size;
    //画像アップデート
    $('#kurage').css({transform: "rotate( "+kurage.kakudo2+"deg )"});
}
//大きさ、満腹度、水質
let date_time = ()=>{
    //console.log($("#lUI").css("height"));
    //現在の時間を取得
    let time_Now = new Date();
    let time = `${time_Now.getFullYear()},${time_Now.getMonth() + 1},${time_Now.getDate()},${time_Now.getHours()},${time_Now.getMinutes()},${time_Now.getSeconds()}`;
    //ローカルストレージが空の場合に時間を保存する関数
    let date_all = (key)=>{
        if(!localStorage.getItem(key)){
            localStorage.setItem(key,time);
        }
    }
    //ローカルストレージが保存されての、経過時間を取得する関数
    let elapsed = (key)=>{
        var s =localStorage.getItem(key).split(",").map(Number);
        var date1 = new Date(s[0],s[1],s[2],s[3],s[4],s[5]);
        var date2 = new Date(time_Now.getFullYear(),time_Now.getMonth() + 1,time_Now.getDate(),time_Now.getHours(),time_Now.getMinutes(),time_Now.getSeconds());
        return (date2 - date1)/1000;
    }
    //console.log(elapsed("Tsize"));
    //ローカルストレージ関数実行
    date_all("Tsize");
    date_all("Teat");
    date_all("Twater");
    //クラゲサイズ変更、大きさ更新
    $("#kurage").css("width", kurage.size+(elapsed("Tsize")*0.0013));
    $('.kurage-size').text((Math.round((kurage.size+(elapsed("Tsize")*0.0013))*1000)/1000)+"mm");
    $('.kurage-date').text(Math.ceil(elapsed("Tsize")/86400)+"日目");
    //今の満腹度、水質を表示
    $("suisitu").css("opacity",1-((100-Math.floor(elapsed("Teat")/3456))/100));
    //console.log(1-((100-Math.floor(elapsed("Teat")/3456))/100));
    $('.kurage-Satisfaction').text(100-Math.floor(elapsed("Teat")/3456)+"%");
    $('.kurage-Water').text(100-Math.floor(elapsed("Twater")/6048)+"%");
    //満腹度か水質が0%になったら,リセットされる
    if(Math.floor(elapsed("Teat")/3456)>=100||Math.floor(elapsed("Twater")/6048)>=100){
        localStorage.clear();
        alert("死にました。");
    }
}
//クラゲを前にすすめる・ゴール位置の設定
let update = (e)=>{
    kurage.update();
    moveEsa();
}

let esaArr = [];

let addEsa = ()=>{
    if(esaArr.length<15){
        let esaX = Math.random()*window.innerWidth;
        let esaY = Math.random()*10;
        let esaJson = {"x": esaX, "y": esaY}
        esaArr.push(esaJson);
    }
}

let moveEsa = ()=>{
    $("#esaarea").html("");
    for(let i=0; i<esaArr.length; i++) {
        esaArr[i].y++;
        $("#esaarea").append(getNewEsa(esaArr[i].x, esaArr[i].y));
    }
}

let getNewEsa = (x, y)=>{
    let esa = `<div class="esa" style="position: fixed; top:${y}px; left:${x}px;">●</div>`
    return esa;
}