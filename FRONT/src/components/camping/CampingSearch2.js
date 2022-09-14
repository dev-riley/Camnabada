import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CampingSearch(props) {
  const [campings, setCampings] = React.useState([]);
  let campingList = [];
  let campingFormatList = [];
  
  React.useEffect(() => {
    getCampings()
  }, []);

  const CAMP_GET_URL = 'http://i6c109.p.ssafy.io:8000/camp/basic/list';
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  const getCampings = async() => {
    const json = await (
      await fetch (
        CAMP_GET_URL,HEADER
      )
    ).json();
    setCampings(json);
  };

  function checkOnlyOneCamp(e) {
    const content = e.target;
    const campName = content.innerText;
    let data = campingFormatList.filter(camp => camp.name == campName);
    props.func(data);
  }

  for (let i = 0; i < campings.length; i++){
    if (!campingList.includes(campings[i].facltNm)) {
      campingList.push(campings[i].facltNm);
    }
    const campData = {
      "id": campings[i].campId,
      "name": campings[i].facltNm.trim()
    };
    campingFormatList.push(campData);
  }

  return (
    <Autocomplete
      sx={{width: 300, m:1}}
      freeSolo
      id="free-solo"
      disableClearable
      onChange={checkOnlyOneCamp}
      options={campingList.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="캠핑장 이름을 입력하세요."
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}
