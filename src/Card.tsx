import React, {useEffect, useState} from 'react';
import ScratchCell from "./Cell.tsx";
import './Card.css';
import headerLogo from './assets/header.jpg';

export const Card: React.FC<{
	openResult: () => void;
}> = ({openResult}) => {
	const [scratchCount, setScratchCount] = useState<number>(0);
	useEffect(() => {
		if (scratchCount >= 3) {
			openResult();
		}
	},[scratchCount]);
	const handleScratch = (correct:boolean)=> {
		if (!correct) {
			return ()=>{};
		}

		return () => {
			setScratchCount(prev => prev + 1);
		};
	}

	return (
		<div style={{padding: 12,background:'white',borderRadius: 12}}>
		<div className="card">
				<img className='header' src={headerLogo}/>
				<div className="scratch-grid">
					<ScratchCell  gender={'boy'} onScratch={handleScratch(false)} />
					<ScratchCell  gender={'boy'} onScratch={handleScratch(false)} />
					<ScratchCell  gender={'girl'} onScratch={handleScratch(true)} />
					<ScratchCell  gender={'girl'} onScratch={handleScratch(false)} />
					<ScratchCell  gender={'girl'} onScratch={handleScratch(true)} />
					<ScratchCell  gender={'boy'} onScratch={handleScratch(false)} />
					<ScratchCell  gender={'girl'} onScratch={handleScratch(true)} />
					<ScratchCell  gender={'boy'} onScratch={handleScratch(false)} />
					<ScratchCell  gender={'boy'} onScratch={handleScratch(false)} />
				</div>
		</div>
		</div>
	);
};