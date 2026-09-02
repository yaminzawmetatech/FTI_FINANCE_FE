import React from "react";
import CustomAppBar from "components/CustomAppBar";
import ProvisionSetupListNewButton from "./ProvisionSetupListNewButton";

const ProvisionListAppBar = () => {

    return (
        <>
            <CustomAppBar>
                <ProvisionSetupListNewButton></ProvisionSetupListNewButton>
            </CustomAppBar>
        </>
    );
};

export default React.memo(ProvisionListAppBar);
