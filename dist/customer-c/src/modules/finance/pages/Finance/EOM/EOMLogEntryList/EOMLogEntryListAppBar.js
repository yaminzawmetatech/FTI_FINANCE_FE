import CustomAppBar from 'components/CustomAppBar'

import React from 'react'
import EOMLogEntryNewButton from './EOMLogEntryNewButton'

function JobQueueLogEntryListAppBar() {
    return (
        <>
            <CustomAppBar>
                <EOMLogEntryNewButton></EOMLogEntryNewButton>
            </CustomAppBar>
        </>
    )
}

export default React.memo(JobQueueLogEntryListAppBar)