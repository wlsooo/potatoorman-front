import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from "react";
import "./css/round.css";

function GaugeBar({index}) {
    return <div className='gaugebar'>
        <img src={`../images/play_potatos/play_potato${index+1}.png`} alt='gaugePotatoImg'/>
        <img src={`../images/play_potatos/play_potato${index+2}.png`} alt='gaugePotatoImg'/>
        {console.log('gaugebar')}
    </div>
}
function MainPlayView({potatoImg, time}) {
    return <>
        <p className='time'>{time}</p>
        <img src={`${potatoImg}`} className='mainPotatoImg' alt='playPotatoImg'/>
        {console.log('mainplayview')}
    </>
}
function ResultPlayView({potatoImg}) {
    return <div className='resultDiv'>
        <img src={`${potatoImg}`} className='resultPotato' alt='playPotatoImg'/>
        {console.log('resultplayview')}
    </div>;
}
function PlayView({index, potatoImg, time}){
    if(index !== 3) {
        return <div className='playDiv'>
            <GaugeBar index={index}/>
            <MainPlayView potatoImg={potatoImg} time={time}/>
        </div>;
    }
    else if(index ===3) {
        return <ResultPlayView potatoImg={potatoImg} />
    }
}

export default function Round() {
    const location = useLocation(); // Link로 props값 받아오기
    const index = location.state.index; //stroy에서 넘긴 index값 저장
    // useMemo를 써서 불필요하게 객체가 생성되는 것을 막음
    const playData = useMemo(()=>({        //({}) <= 이렇게 써주기
        bgImg : ["../images/backgrounds/play_background1.png", "../images/backgrounds/play_background2.png", "../images/backgrounds/play_background3.png", "../images/backgrounds/play_background3.png"],
        potatoImg : [`../images/potatos/potato${index}_1.png`, `../images/potatos/potato${index}_1.png`, `../images/potatos/potato${index}_2.png`,`../images/potatos/potato${index}_3.png`]
        }),[index]);
    const [playIdx, setPlayIdx] = useState(0);
    const [time, setTime] = useState(10);

    const bgImg = playData.bgImg[playIdx];
    const potatoImg = playData.potatoImg[playIdx];

    // 배경이미지와 playIdx를 바꾸는 useEffect 함수
    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgImg})`;
        const timeoutId = setTimeout(() => {
            if (playIdx !== 3) setPlayIdx((prevIdx) => prevIdx + 1);
        }, 11000);
        return () => clearTimeout(timeoutId);
    }, [playIdx, bgImg]);
    // time을 설정하는 useEffect 함수
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (time > 0) setTime((prevTime) => prevTime - 1);
            else setTime(10); // 한 라운드가 끝나면 time을 5로 초기화시켜줌
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [time]);

    return <>
    <PlayView index={playIdx} potatoImg={potatoImg} time={time}/>
    </>;
}