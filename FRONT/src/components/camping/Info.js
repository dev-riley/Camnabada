import Stack from '@mui/material/Stack';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Info = ({details}) => {

  return (
    <Stack>
      {details.tel ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              문의처
            </Typography>
            <Typography>
              {details.tel}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.lctCl ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              캠핑장 환경
            </Typography>
            <Typography>
              {details.lctCl}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.induty ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              캠핑장 유형
            </Typography>
            <Typography>
              {details.induty}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.operPdCl ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              운영기간
            </Typography>
            <Typography>
              {details.operPdCl}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.operDeCl ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              운영일
            </Typography>
            <Typography>
              {details.operDeCl}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.homepage ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              홈페이지
            </Typography>
            <Typography>
              <a href={details.homepage}>홈페이지 바로가기</a>
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.posblFcltyCl ? (
        <Stack>
          <Stack direction="row" >
            <Typography
              sx={{fontWeight: 'bold', width: '18ch'}}
            >
              주변 이용가능 시설
            </Typography>
            <Typography>
              {details.posblFcltyCl}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}

      {details.intro ? (
        <Stack>
          <Stack direction="row" >
            <Typography>
              {details.intro}
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
        </Stack>
      ) : null}
      
    </Stack>
  )
      
}

export default Info;