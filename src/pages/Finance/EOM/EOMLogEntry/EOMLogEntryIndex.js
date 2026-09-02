import React from 'react'
import General from './General'
import { Box, Backdrop } from "@mui/material";
import { useSelector } from 'react-redux';
import EOMLogTable from './EOMLogTable';
import useJobQueueFrom from '../Hook/useJobQueueFrom';
function JobQueueLogEntryIndex() {
    
    const { control, setValue, handleSubmit, onSubmit, disabledFormAction } = useJobQueueFrom();
    const { isLoading, jobQueueLogEntryDetails ,logTableLoading} = useSelector(state => state.EOM);
    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            ></Backdrop>
            <Box
                sx={{
                    px: 1,
                    marginTop: "20px",
                }}
            >
                <General
                control={control}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                disabledFormAction={disabledFormAction}
                ></General>
                <EOMLogTable
                    isLoading={isLoading}
                    logTableLoading={logTableLoading}
                    jobQueueLogEntryDetails={jobQueueLogEntryDetails} 
                    disabledFormAction={disabledFormAction}/>
            </Box>

        </>
    )
}

export default React.memo(JobQueueLogEntryIndex) 