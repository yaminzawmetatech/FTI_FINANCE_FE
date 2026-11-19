// import PropTypes from 'prop-types';

// // material-ui
// import { Box, Card, Grid, Stack, Typography } from '@mui/material';

// // project import
// import MainCard from 'components/MainCard';
// import ComponentSkeleton from './ComponentSkeleton';

// // ===============================|| COLOR BOX ||=============================== //

// function ColorBox({ bgcolor, title, data, dark, main }) {
//   return (
//     <>
//       <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             py: 2.5,
//             bgcolor,
//             color: dark ? 'grey.800' : '#ffffff',
//             border: main ? '1px dashed' : '1px solid transparent'
//           }}
//         >
//           {title && (
//             <Grid container justifyContent="space-around" alignItems="center">
//               <Grid item>
//                 {data && (
//                   <Stack spacing={0.75} alignItems="center">
//                     <Typography variant="subtitle2">{data.label}</Typography>
//                     <Typography variant="subtitle1">{data.color}</Typography>
//                   </Stack>
//                 )}
//               </Grid>
//               <Grid item>
//                 <Typography variant="subtitle1" color="inherit">
//                   {title}
//                 </Typography>
//               </Grid>
//             </Grid>
//           )}
//         </Box>
//       </Card>
//     </>
//   );
// }

// ColorBox.propTypes = {
//   bgcolor: PropTypes.string,
//   title: PropTypes.string,
//   data: PropTypes.object.isRequired,
//   dark: PropTypes.bool,
//   main: PropTypes.bool
// };

// // ===============================|| COMPONENT - COLOR ||=============================== //

// const ComponentColor = () => (
//   <ComponentSkeleton>
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Primary Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="primary.lighter" data={{ label: 'Blue-1', color: '#e6f7ff' }} title="primary.lighter" dark />
//             <ColorBox bgcolor="primary.100" data={{ label: 'Blue-2', color: '#bae7ff' }} title="primary[100]" dark />
//             <ColorBox bgcolor="primary.200" data={{ label: 'Blue-3', color: '#91d5ff' }} title="primary[200]" dark />
//             <ColorBox bgcolor="primary.light" data={{ label: 'Blue-4', color: '#69c0ff' }} title="primary.light" dark />
//             <ColorBox bgcolor="primary.400" data={{ label: 'Blue-5', color: '#40a9ff' }} title="primary[400]" />
//             <ColorBox bgcolor="primary.main" data={{ label: 'Blue-6', color: '#1890ff' }} title="primary.main" main />
//             <ColorBox bgcolor="primary.dark" data={{ label: 'Blue-7', color: '#096dd9' }} title="primary.dark" />
//             <ColorBox bgcolor="primary.700" data={{ label: 'Blue-8', color: '#0050b3' }} title="primary[700]" />
//             <ColorBox bgcolor="primary.darker" data={{ label: 'Blue-9', color: '#003a8c' }} title="primary.darker" />
//             <ColorBox bgcolor="primary.900" data={{ label: 'Blue-10', color: '#002766' }} title="primary.900" />
//           </Stack>
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Secondary Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="secondary.lighter" data={{ label: 'Grey-1', color: '#fafafa' }} title="secondary.lighter" dark />
//             <ColorBox bgcolor="secondary.100" data={{ label: 'Grey-2', color: '#f5f5f5' }} title="secondary[100]" dark />
//             <ColorBox bgcolor="secondary.200" data={{ label: 'Grey-3', color: '#f0f0f0' }} title="secondary[200]" dark />
//             <ColorBox bgcolor="secondary.light" data={{ label: 'Grey-4', color: '#d9d9d9' }} title="secondary.light" dark />
//             <ColorBox bgcolor="secondary.400" data={{ label: 'Grey-5', color: '#bfbfbf' }} title="secondary[400]" dark />
//             <ColorBox bgcolor="secondary.main" data={{ label: 'Grey-6', color: '#8c8c8c' }} title="secondary.main" main />
//             <ColorBox bgcolor="secondary.600" data={{ label: 'Grey-7', color: '#595959' }} title="secondary.600" />
//             <ColorBox bgcolor="secondary.dark" data={{ label: 'Grey-8', color: '#262626' }} title="secondary.dark" />
//             <ColorBox bgcolor="secondary.800" data={{ label: 'Grey-9', color: '#141414' }} title="secondary[800]" />
//             <ColorBox bgcolor="secondary.darker" data={{ label: 'Grey-10', color: '#000000' }} title="secondary.darker" />
//           </Stack>
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Other Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="secondary.A100" data={{ label: 'Grey-A1', color: '#ffffff' }} title="secondary.A100" dark />
//             <ColorBox bgcolor="secondary.A200" data={{ label: 'Grey-A2', color: '#434343' }} title="secondary.A200" />
//             <ColorBox bgcolor="secondary.A300" data={{ label: 'Grey-A3', color: '#1f1f1f' }} title="secondary.A300" />
//           </Stack>
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Success Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="success.lighter" data={{ label: 'Green-1', color: '#f6ffed' }} title="success.lighter" dark />
//             <ColorBox bgcolor="success.light" data={{ label: 'Green-4', color: '#95de64' }} title="success.light" dark />
//             <ColorBox bgcolor="success.main" data={{ label: 'Green-6', color: '#52c41a' }} title="success.main" main />
//             <ColorBox bgcolor="success.dark" data={{ label: 'Green-8', color: '#237804' }} title="success.dark" />
//             <ColorBox bgcolor="success.darker" data={{ label: 'Green-10', color: '#092b00' }} title="success.darker" />
//           </Stack>
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Error Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="error.lighter" data={{ label: 'Red-1', color: '#fff1f0' }} title="error.lighter" dark />
//             <ColorBox bgcolor="error.light" data={{ label: 'Red-4', color: '#ff7875' }} title="error.light" dark />
//             <ColorBox bgcolor="error.main" data={{ label: 'Red-6', color: '#f5222d' }} title="error.main" main />
//             <ColorBox bgcolor="error.dark" data={{ label: 'Red-8', color: '#a8071a' }} title="error.dark" />
//             <ColorBox bgcolor="error.darker" data={{ label: 'Red-10', color: '#5c0011' }} title="error.darker" />
//           </Stack>
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MainCard title="Warning Color" codeHighlight>
//           <Stack>
//             <ColorBox bgcolor="warning.lighter" data={{ label: 'Gold-1', color: '#fffbe6' }} title="warning.lighter" dark />
//             <ColorBox bgcolor="warning.light" data={{ label: 'Gold-4', color: '#ffd666' }} title="warning.light" dark />
//             <ColorBox bgcolor="warning.main" data={{ label: 'Gold-6', color: '#faad14' }} title="warning.main" main />
//             <ColorBox bgcolor="warning.dark" data={{ label: 'Gold-8', color: '#ad6800' }} title="warning.dark" />
//             <ColorBox bgcolor="warning.darker" data={{ label: 'Gold-10', color: '#613400' }} title="warning.darker" />
//           </Stack>
//         </MainCard>
//       </Grid>
//     </Grid>
//   </ComponentSkeleton>
// );

// export default ComponentColor;


import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

// ===============================|| COLOR BOX ||=============================== //

function ColorBox({ bgcolor, title, data, dark, main }) {
  return (
    <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff',
          border: main ? '1px dashed' : '1px solid transparent'
        }}
      >
        {title && (
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              {data && (
                <Stack spacing={0.75} alignItems="center">
                  <Typography variant="subtitle2">
                    {data.label}
                  </Typography>
                  <Typography variant="subtitle1">
                    {data.color}
                  </Typography>
                </Stack>
              )}
            </Grid>

            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {title}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Card>
  );
}

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool,
  main: PropTypes.bool
};

// ===============================|| COMPONENT - COLOR ||=============================== //

const ComponentColor = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>

      {/* ===================== PRIMARY ORANGE ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Primary Orange" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#FFF7ED"
              data={{ label: 'Orange-1', color: '#FFF7ED' }}
              title="primary.lighter"
              dark
            />

            <ColorBox
              bgcolor="#FFEDD5"
              data={{ label: 'Orange-2', color: '#FFEDD5' }}
              title="primary[100]"
              dark
            />

            <ColorBox
              bgcolor="#FED7AA"
              data={{ label: 'Orange-3', color: '#FED7AA' }}
              title="primary[200]"
              dark
            />

            <ColorBox
              bgcolor="#FDBA74"
              data={{ label: 'Orange-4', color: '#FDBA74' }}
              title="primary.light"
              dark
            />

            <ColorBox
              bgcolor="#FB923C"
              data={{ label: 'Orange-5', color: '#FB923C' }}
              title="primary[400]"
            />

            <ColorBox
              bgcolor="#F97316"
              data={{ label: 'Orange-6', color: '#F97316' }}
              title="primary.main"
              main
            />

            <ColorBox
              bgcolor="#EA580C"
              data={{ label: 'Orange-7', color: '#EA580C' }}
              title="primary.dark"
            />

            <ColorBox
              bgcolor="#C2410C"
              data={{ label: 'Orange-8', color: '#C2410C' }}
              title="primary[700]"
            />

            <ColorBox
              bgcolor="#9A3412"
              data={{ label: 'Orange-9', color: '#9A3412' }}
              title="primary.darker"
            />

            <ColorBox
              bgcolor="#7C2D12"
              data={{ label: 'Orange-10', color: '#7C2D12' }}
              title="primary[900]"
            />

          </Stack>
        </MainCard>
      </Grid>

      {/* ===================== SECONDARY ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Secondary Color" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#FFF7ED"
              data={{ label: 'Orange-A1', color: '#FFF7ED' }}
              title="secondary.lighter"
              dark
            />

            <ColorBox
              bgcolor="#FFEDD5"
              data={{ label: 'Orange-A2', color: '#FFEDD5' }}
              title="secondary.light"
              dark
            />

            <ColorBox
              bgcolor="#FED7AA"
              data={{ label: 'Orange-A3', color: '#FED7AA' }}
              title="secondary[200]"
              dark
            />

            <ColorBox
              bgcolor="#FDBA74"
              data={{ label: 'Orange-A4', color: '#FDBA74' }}
              title="secondary[400]"
              dark
            />

            <ColorBox
              bgcolor="#FB923C"
              data={{ label: 'Orange-A5', color: '#FB923C' }}
              title="secondary.main"
            />

            <ColorBox
              bgcolor="#F97316"
              data={{ label: 'Orange-A6', color: '#F97316' }}
              title="secondary.dark"
            />

            <ColorBox
              bgcolor="#EA580C"
              data={{ label: 'Orange-A7', color: '#EA580C' }}
              title="secondary[700]"
            />

          </Stack>
        </MainCard>
      </Grid>

      {/* ===================== ACCENT ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Accent Color" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#FFF3E0"
              data={{ label: 'Peach-1', color: '#FFF3E0' }}
              title="accent.lighter"
              dark
            />

            <ColorBox
              bgcolor="#FFE0B2"
              data={{ label: 'Peach-2', color: '#FFE0B2' }}
              title="accent.light"
              dark
            />

            <ColorBox
              bgcolor="#FFB74D"
              data={{ label: 'Peach-3', color: '#FFB74D' }}
              title="accent.main"
              dark
            />

            <ColorBox
              bgcolor="#F57C00"
              data={{ label: 'Orange-Deep', color: '#F57C00' }}
              title="accent.dark"
            />

          </Stack>
        </MainCard>
      </Grid>

      {/* ===================== SUCCESS ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Success Color" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#F0FDF4"
              data={{ label: 'Green-1', color: '#F0FDF4' }}
              title="success.lighter"
              dark
            />

            <ColorBox
              bgcolor="#86EFAC"
              data={{ label: 'Green-4', color: '#86EFAC' }}
              title="success.light"
              dark
            />

            <ColorBox
              bgcolor="#22C55E"
              data={{ label: 'Green-6', color: '#22C55E' }}
              title="success.main"
              main
            />

            <ColorBox
              bgcolor="#15803D"
              data={{ label: 'Green-8', color: '#15803D' }}
              title="success.dark"
            />

            <ColorBox
              bgcolor="#14532D"
              data={{ label: 'Green-10', color: '#14532D' }}
              title="success.darker"
            />

          </Stack>
        </MainCard>
      </Grid>

      {/* ===================== ERROR ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Error Color" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#FEF2F2"
              data={{ label: 'Red-1', color: '#FEF2F2' }}
              title="error.lighter"
              dark
            />

            <ColorBox
              bgcolor="#FCA5A5"
              data={{ label: 'Red-4', color: '#FCA5A5' }}
              title="error.light"
              dark
            />

            <ColorBox
              bgcolor="#EF4444"
              data={{ label: 'Red-6', color: '#EF4444' }}
              title="error.main"
              main
            />

            <ColorBox
              bgcolor="#B91C1C"
              data={{ label: 'Red-8', color: '#B91C1C' }}
              title="error.dark"
            />

            <ColorBox
              bgcolor="#7F1D1D"
              data={{ label: 'Red-10', color: '#7F1D1D' }}
              title="error.darker"
            />

          </Stack>
        </MainCard>
      </Grid>

      {/* ===================== WARNING ===================== */}
      <Grid item xs={12} sm={6} md={4}>
        <MainCard title="Warning Color" codeHighlight>
          <Stack>

            <ColorBox
              bgcolor="#FFFBEB"
              data={{ label: 'Amber-1', color: '#FFFBEB' }}
              title="warning.lighter"
              dark
            />

            <ColorBox
              bgcolor="#FDE68A"
              data={{ label: 'Amber-4', color: '#FDE68A' }}
              title="warning.light"
              dark
            />

            <ColorBox
              bgcolor="#F59E0B"
              data={{ label: 'Amber-6', color: '#F59E0B' }}
              title="warning.main"
              main
            />

            <ColorBox
              bgcolor="#B45309"
              data={{ label: 'Amber-8', color: '#B45309' }}
              title="warning.dark"
            />

            <ColorBox
              bgcolor="#78350F"
              data={{ label: 'Amber-10', color: '#78350F' }}
              title="warning.darker"
            />

          </Stack>
        </MainCard>
      </Grid>

    </Grid>
  </ComponentSkeleton>
);

export default ComponentColor;