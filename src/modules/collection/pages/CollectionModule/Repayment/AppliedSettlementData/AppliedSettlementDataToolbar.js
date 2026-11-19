import React from "react";
import Toolbar from "components/Toolbar";
import IosShareIcon from "@mui/icons-material/IosShare";
import {useSelector} from "react-redux";

const ToolbarAppliedSettlementData = ({
                                          appliedSettlementData,
                                          handlePosted,
                                      }) => {
    const auth = useSelector((state) => state.auth.user);

    //show hide menus by permissions
    const show =
    auth?.permissions?.includes("Repayment-MonthlyInstalment-Post") ||
    auth?.permissions?.includes("Insufficient-Payment-Post") ||
    auth?.is_super === true;
  
    const toolbarData = [
        {
            title: "HOME",
            children: [
                {
                    title: "Process",
                    type: "multiple",
                    children: [
                        show ? {
                            icon: <IosShareIcon/>,
                            title: "Post",
                            onClick: () => handlePosted(),
                        } : '',
                    ],
                },
            ],
        },
    ];

    return (
        <>
            <Toolbar data={toolbarData}/>
        </>
    );
};

export default React.memo(ToolbarAppliedSettlementData);
