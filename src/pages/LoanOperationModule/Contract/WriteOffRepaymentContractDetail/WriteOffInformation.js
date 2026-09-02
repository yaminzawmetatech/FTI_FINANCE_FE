import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { useWatch } from "react-hook-form";


const WriteOffInformation = ({ control }) => {
    const disabled = useWatch({
        control,
        name: "disabled",
    });

    return (
        <Accordion title="Applicant Information">
            <Box sx={{ mt: 1 }}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        item
                        spacing={2}
                        xs={12}
                        sm={6}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <FormInputDateTimePicker
                                control={control}
                                label="Write Off Date"
                                name="write_off_date"
                                disabled={disabled}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormInputNumber
                                control={control}
                                label="Total Outstanding Amount(AR + AI + Penalties)"
                                name="total_outstanding_amount"
                                disabled={disabled}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        spacing={2}
                        xs={12}
                        sm={6}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <FormInputNumber
                                control={control}
                                label="Total Write Off Amount(AR + AI)"
                                name="total_write_off_amount"
                                disabled={disabled}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Accordion>
    );

};

export default React.memo(WriteOffInformation);
