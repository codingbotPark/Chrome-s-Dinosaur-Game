var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
// 캔버스를 사용하기 위해 넣어야하는 코드

// 캔버스로 초록색 네모를 그리는 법
// ctx.fillStyle = 'green';
// 왼쪽 좌표 10, 10 에 100 , 100 크기의 네모를 그리는 것
// ctx.fillRect(10,10,100,100);

var img2 = new Image();
img2.src = 'computer-pain-ting.png';

//등장 캐릭터의 속성부터 object자료에 정리한다
var dino = {
    //공룡 등장 좌표
    x : 10,
    y : 200,
    //공룡 사이즈
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y);
    }
}
dino.draw()

//네모대신 이미지 넣기
var img1 = new Image();
img1.src = 'JS-pain-ting.png';


//장애물도 속성부터 object자료에 정리해 둔다
//장애물은 속성이 조금씩 다를 수 있기 때문에 class 를 사용한다
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}
var cactus = new Cactus();
//새로운 장애물 하나를 생성
cactus.draw(); 

//일정 시간마다 만드는 장애물을 위한 타이머
var timer = 0;
//여러개의 장애물을 관리하기 위한 배열
var cactus여러개 = [];
//점프한 시간을 측정하고 계속 올라가는 것을 막는 변수
var 점프timer = 0;
//게임이 끝났을 때 프레임마다 실행을 멈추기 위해 만드는 변수
var animation;

//애니메이션을 만드려면 좌표를 움직이면 된다
function 프레임마다실행할거(){
    //모니터 fps에 따라 프레임마다 실행시킨다
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    //잔상을 없기 위해 캔버스를 삭제시키고 다시 만든다
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //장애물을 생성한다
    //장애물은 프레임마다 실행되면 안되고
    //일정 시간마다 실행되어야 한다
    if (timer % 300 === 0){//300프레임마다 장애물이 생성된다
        var cactus = new Cactus();
        //120프레임마다 배열에 장애물을 넣어서 관리
        cactus여러개.push(cactus);  
    }

    cactus여러개.forEach((a,i,o)=>{
        //장애물의 x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i,1);
        }
        
        a.x-=2;//장애물이 움직이도록
        
        충돌하냐(dino,a);//공룡(dino)와 장애물(a (반복문을 a로 돌림)) 
        //충돌체크는 주인공과 모든 장애물의
        //충돌을 체크해야하기 때문에
        //이 반복문에 넣는다

        a.draw();
    })

    //프레임마다 y축을 건드려서 점프
    if (점프중 == true){
        dino.y-=2;
        점프timer+=1.4;
    }
    //점프를 다하고 밑으로 내려오도록 함
    if (점프중 == false && dino.y < 200){
        dino.y+=2;
    }
    if (점프timer > 100){
        점프중 = false; 
        //점프 타이머를 리셋
        점프timer = 0;
    }

    dino.draw();
}

프레임마다실행할거();


//충돌을 체크하는 함수
function 충돌하냐(dino,cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    //장애물의 왼쪽 좌표와 공룡의 오른쪽 좌표를 비교해야하기 때문에
    //공룡의 넓이를 더해준다
    var y축차이 = cactus.y - (dino.y + dino.height);
    //y축도 같다

    //점프했을수도 있기 때문에 x축, y축을 모두 비교한다
    if (x축차이 < 0 && y축차이 < 0){//충돌
        //캠버스 클리어
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //프레임마다 실행을 정지
        cancelAnimationFrame(animation);
    }
}

//foreach반복문에서 실행시키기 위한 변수
var 점프중 = false;

//스페이스바가 눌렸을 때 점프를 시킨다
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        점프중 = true;   
    }
})
