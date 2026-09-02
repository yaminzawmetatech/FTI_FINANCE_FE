import React, { Fragment } from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import Accordion from "../../../../components/Accordion";

const dealerStatics = {
  "Number of Application": 46,
  "No.": "030140005",
  "Dealer Name": "Jaifa (1), 84th Street Motors",
  "Owner Name": "U Bo Bo Mya",
  "Showroom Address": "Shop (1) - North Avenue, Cityville, State, ZIP Code",
  "Showroom Phone No": "123-456-7890",
};

const InHouseSurveyMyNotification = () => {
  return (
    <Accordion title="My Notifications" type="statics">
      <Grid container spacing={2}>
        {Object.keys(dealerStatics).map((objectKey) => (
          <Fragment key={objectKey}>
            <Grid item xs={8}>
              {objectKey} :
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              <Tooltip describeChild title={dealerStatics[objectKey]}>
                <Typography noWrap>{dealerStatics[objectKey]}</Typography>
              </Tooltip>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Accordion>
  );
};

export default React.memo(InHouseSurveyMyNotification);
