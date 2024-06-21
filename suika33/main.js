import { FRUITS } from "/suika33/fruit.js";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false,//true면 색적용 안됨
        background: '#F7F4C8',
        width: 620,
        height: 850,
    }
});

// 월드 선언
const world = engine.world;

// 왼쪽 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true, // true는 고정해주는 기능
    render: { fillStyle: '#E6B143' } // 색상 지정
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true, // true는 고정해주는 기능
    render: { fillStyle: '#E6B143' } // 색상 지정
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true, // true는 고정해주는 기능
    render: { fillStyle: '#E6B143' } // 색상 지정
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic: true, // true는 고정해주는 기능
    isSensor: true, // 충동은 감지하나 물리엔진은 적용 안함
    render: { fillStyle: '#E6B143' } // 색상 지정
});

// 벽 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

// 현재 과일 값을 저장할 변수 생성
let currentBody = null;
let currentFruit = null;

// 과일 떨어지는 함수 만들기
function addFruit() {
    // 과일 index 저장
    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
        index : index,
        isSleeping : true,
        render: {
            sprite: { texture: `${fruit.name}.png` }
            // texture : fruit.name + 'png'; }

        },
        restitution: 0.2,
    });

    currentBody = body;
    currentFruit = fruit;

    // 현재 과일 값 저장

    World.add(world, body);
}

addFruit();