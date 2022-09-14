import React, { useRef, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography, Stack, Grid } from '@mui/material';



export default function RadioButtonsGroup(props) {
	const [isChecked, setIsChecked] = useState();

	function checkOnlyOneCamp(e) {
		const refName = e.target.value;
		props.func1(refName);
	}
	
  return (
    <FormControl>
			<Stack direction="row" spacing={1}>
				<FormLabel id="radio-button" sx={{ fontWeight : 'bold', fontSize : 18 }} >&lt;캠핑 소통&gt;</FormLabel>
				<Typography sx={{ fontSize : 13}}>캠핑장을 선택해주세요.</Typography>
			</Stack>
		  <RadioGroup
			  onChange={checkOnlyOneCamp}
				row
				aria-labelledby="radio-button"
				name="radio-button-group"
			>
				{/* 추후에 반응형 웹할 때 조절해야함!.. 임의로 조절함 */}
				<Grid md={12}>
					<FormControlLabel value="나눔"  control={<Radio />} label="나눔" />
					<FormControlLabel value="거래" control={<Radio />} label="거래" />
					<FormControlLabel value="후기" control={<Radio />} label="후기" />
					<FormControlLabel value="캠핑소통-자유" control={<Radio />} label="자유" />
				</Grid>
					<FormLabel id="radio-button" sx={{ fontWeight : 'bold', fontSize : 18, mt : 1 }}>&lt;자유 소통&gt;</FormLabel>
				<Grid md={12}>
					<FormControlLabel value="장비 후기" control={<Radio />} label="장비 후기" />
					<FormControlLabel value="자유소통-자유" control={<Radio />} label="자유" />
				</Grid>
			</RadioGroup>
			{/* <RadioGroup
				onChange={checkOnlyOneCommunity}
				row
				aria-labelledby="radio-button"
				name="radio-button-group"
			>
				<FormControlLabel value="equipment-review" control={<Radio />} label="장비 후기" />
				<FormControlLabel value="free" control={<Radio />} label="자유" />
			</RadioGroup> */}
    </FormControl>
  );
}