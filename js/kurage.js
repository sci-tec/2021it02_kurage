export let kurage= {
    counter: 0,
    NUM_IMAGES: 213,
    kurage_x: innerWidth/2,
    kurage_y: innerHeight/2,
    sx: 0,
    sy: 0,
    goal_y: 200,
    kaiten:0,
    kakudo1: 1,
    kakudo2: 0,
    kakudo1_2: 0,
    awa: $("#lUI").css("height").split("px").map(Number)[0],
    hamon: 0,
    is_goal_x: false,
    is_goal_y: false,
    is_teisi: true,
    is_click: false,
    is_push: false,
    is_awa: false,
    is_hamon: false,
    is_eat_x: false,
    is_eat_y: false,
    size: 100,
    MAX_SIZE: 400,
    esa: 0,
    esaArr: [],
    manzoku: localStorage.getItem("manzoku"),

    //クラゲアニメーシ
    animate: function(){
        $("#kurage").attr("src", `images/jf/jf06_2/06_${this.counter}.png`);
        this.counter = (this.counter+3) % this.NUM_IMAGES;
        //泡アニメーション
       this.awa>-innerHeight&&this.is_awa?this.awa-=7:this.is_awa=false;
        if(this.kurage_y>=this.awa&&this.is_awa){
            this.is_push = true;
            this.is_teisi = true;
        }
        if(this.is_hamon){
            this.hamon++;
            $("#hamon").css({width:this.hamon,height:this.hamon,opacity:(50-this.hamon)/50});
            $("#hamon").css("margin-top",this.goal_y-(this.hamon/2));
            $("#hamon").css("margin-left",this.goal_x-(this.hamon/2));
            if(this.hamon >= 50){
                this.hamon = 0;
                this.is_hamon = false;
                $("#hamon").remove();
            }
        }
        $("#awa1").css("margin-top",this.awa);
    },

    //クラゲを前にすすめる・ゴール位置の設定
    update: function(){
        //クラゲを上に移動
        if(this.is_push&&(Math.abs(50 - this.kurage_y) > 30)){
            this.sy = ( 50 - this.kurage_y ) / 50;
            this.kurage_y += this.sy;
        }else if(this.is_teisi&&this.is_push){
            this.is_goal_x = true;
            this.is_goal_y = true;
        }
        //クラゲが回転停止したら実行
        if(!this.is_teisi || this.esaArr.length>0) {
            if(Math.abs(this.goal_x - this.kurage_x) > 3) {
                //イーズアウト計算
                this.sx = ( this.goal_x - this.kurage_x ) / 100;
                this.is_eat_y = false;
                if(this.sx<=1 && this.sx>0){
                    this.sx = 1;
                }else if(this.sx>=-1 && this.sx<0){
                    this.sx = -1;
                }
                
            this.kurage_x += this.sx;
            } else {
                this.is_eat_x = true;
                this.is_goal_x = true;
            }
        
            if(Math.abs(this.goal_y - this.kurage_y) > 3) {
                //イーズアウト計算
                this.sy = ( this.goal_y - this.kurage_y ) / 100;
                this.is_eat_x = false;
                    if(this.sy<=1 && this.sy>0){
                        this.sy = 1;
                    }else if(this.sy>=-1 && this.sy<0){
                        this.sy = -1;
                    }
                    
                this.kurage_y += this.sy;
            } else {
                this.is_eat_y = true;
                this.is_goal_y = true;
            }    
            
        }
        //クラゲがゴール位置についたら実行
        if( this.is_goal_x && this.is_goal_y ) {
            if(this.is_eat_x&&this.is_eat_y&&this.esaArr.length>0){
                localStorage.setItem("manzoku",Number(this.manzoku)+34560);
                this.manzoku = localStorage.getItem("manzoku");
                console.log("esa");
                this.is_click = false;
                this.esaArr.splice(0, 1);
            }
            this.is_push = false;
            this.is_teisi = true;
            this.is_goal_x = false;
            this.is_goal_y = false;
            //クリックされていなければ実行
            if(!this.is_click){
                //ゴール位置設定
                this.goal_x = Math.random()*(innerWidth-this.size);
                this.goal_y = Math.random()*(innerHeight-this.size);
            }else{
                this.is_click = false;
            }
            //現在地からゴール位置の角度計算
            this.kaiten = Math.atan2( this.goal_y - this.kurage_y, this.goal_x - this.kurage_x );
            this.kakudo1 = Math.round(this.kaiten * (180 / Math.PI)+90);
            this.kakudo1<0?this.kakudo1=360+this.kakudo1:"";
            this.kakudo1_2 = this.kakudo1-this.kakudo2;
        }
        //画像アップデート
         $(".img").css("top", this.kurage_y);
         $(".img").css("left", this.kurage_x);
    }
};
