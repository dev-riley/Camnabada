import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function CampingSearch(props) {
  const [campings, setCampings] = React.useState([]);
  let campingList = [];
  let campingFormatList = [];
  
  const CAMP_GET_URL = 'http://i6c109.p.ssafy.io:8000/camp/basic/list';
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  
  React.useEffect(() => {
    getCampings()
  }, []);

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
    <Stack spacing={2} sx={{ width: 500, mt: 2 }}>
      <Autocomplete
        freeSolo
        id="free-solo"
        disableClearable
        onChange={checkOnlyOneCamp}
        options={campingList.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="캠핑 찾기"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}
