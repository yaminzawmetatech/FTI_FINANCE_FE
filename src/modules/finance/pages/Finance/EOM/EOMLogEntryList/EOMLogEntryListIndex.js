import React, { memo } from 'react'


import EOMLogEntryListAppBar from './EOMLogEntryListAppBar'
import EOMListTable from './EOMListTable'

function JobQueueLogEntryListIndex() {
    return (
        <>
            <EOMLogEntryListAppBar></EOMLogEntryListAppBar>
            <EOMListTable></EOMListTable>
        </>
    )
}

export default React.memo(JobQueueLogEntryListIndex)