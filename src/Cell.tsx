// ScratchCell.tsx
import React, { useState } from 'react';
import './Cell.css';
import boyLogo from './assets/boy.webp';
import girlLogo from './assets/girl.webp';

type Gender = 'boy' | 'girl';

type ScratchCellProps = {
	onScratch: () => void;
	gender: Gender;
}

const ScratchCell: React.FC<ScratchCellProps> = ({ gender, onScratch }) => {
	const [scratched, setScratched] = useState<boolean>(false);

	const handleScratch = () => {
		if (!scratched) {
			setScratched(true);
			onScratch();
		}
	};

	const img = gender == 'boy' ?boyLogo:girlLogo;

	return (
		<div className={`scratch-cell ${scratched ? 'revealed' : ''}`} onClick={handleScratch}>
			{scratched ? <Img img={img} name={gender}/> : ''}
		</div>
	);
};

const Img: React.FC<{img:string,name:string}> = ({ img  }) => {
	return (
		<div style={{width:'100%',height:'100%',position:'relative'}}>
			<img src={img} style={{position:"absolute",width:'100%',height:'100%',left:0,top:0}} className={'scratch-'}/>
		</div>
	)
}

export default ScratchCell;
