import './App.css'
import {Card} from "./Card.tsx";
import {useEffect, useRef, useState} from "react";
import { useReward } from "react-rewards";
import backgroundImage from './assets/background.webp';

const useInterval = (callback: () => void) => {
    const callbackRef = useRef(() => {});

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const timerId = setInterval(() => callbackRef.current(), 100);
        return () => clearInterval(timerId);
    }, []);
};


function App() {
    const [open, setOpen] = useState<boolean>(false);
    const { reward: rewardLeft, isAnimating: isAnimatingLeft } = useReward(
        "rewardLeft",
        "confetti",
        {
            angle: 45,
        }
    );
    const { reward: rewardRight, isAnimating: isAnimatingRight } = useReward(
        "rewardRight",
        "confetti",
        {
            angle: 135,
        }
    );

    useInterval(() => {
        if (!open) {
            return
        }
        if (!isAnimatingRight || !isAnimatingLeft) {
            rewardLeft();
            rewardRight();
        }
    });


    const openResult = () => {
        //1秒後に結果を表示

        rewardLeft();
        rewardRight();
        setTimeout(() => {
            setOpen(true);
        }, 3000);
    }

  return (
    <div style={{overflow:"hidden",width:"100vw",height:"100vh"}}>
        {!open&&<div className='cardContainer'><Card openResult={openResult}/></div>}
        <div id='rewardLeft' style={{position:'absolute',bottom:0,left:0}}></div>
        <div id='rewardRight' style={{position:'absolute',bottom:0,right:0}}></div>
        <OpenResultModal isOpen={open}/>
        <img src={backgroundImage} style={{position:'absolute',top:'0',left:'0',zIndex:-1,height:'100%',width:'100%',objectFit:'cover'}}/>
        <audio controls autoPlay src="~"></audio>
    </div>
  )
}

const OpenResultModal: React.FC<{isOpen:boolean}> = ({isOpen}) => {
    return (
        <div className={`result ${isOpen?'resultOpen':'resultHidden'}`}>
            <div className={'resultContainer'} >
            <h4 className={'resultTitle'}>Girlが生まれます❤</h4>
            <div className={'resultContent'}>
                <p style={{fontSize:28,margin:12}}>性別はなんと女の子！！</p>
                <p>
                    生まれてくるまでまだまだドキドキですが、<br/>夫婦力を合わせて頑張っていくので、<br/>応援とサポートお願いします！
                </p>
            </div>
            </div>
        </div>
    )
}

export default App
