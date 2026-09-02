import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicationSetupList } from "../../../../../features/menuApplicationSetup/menuApplicationSetupSlice";

const useApplicationSetup = ( categoryId, SUB_CATEGORY) => {
    const { data: applicationSetups, isLoading: applicationSetupsLoading } =
        useSelector((state) => state.menuApplicationSetup.applicationSetups);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApplicationSetupList());
    }, [dispatch]);

    const applicationSetup = useMemo(() => {
        if (!categoryId || !applicationSetups?.length) return null;

        // Try finding with both category and subcategory
        const setupWithSubCategory = applicationSetups.find(
            (item) =>
                +item.category_id === +categoryId &&
                item.sub_category_id === SUB_CATEGORY
        );

        if (setupWithSubCategory) return setupWithSubCategory;

        // Fall back to only category match
        return applicationSetups.find(
            (item) => +item.category_id === +categoryId
        );
    }, [categoryId, SUB_CATEGORY, applicationSetups]);


    const application_fields = useMemo(
        () => applicationSetup?.application_fields || {},
        [applicationSetup]
    );

    return useMemo(
        () => ({
            applicationSetupsLoading,
            application_fields,
        }),
        [applicationSetupsLoading, application_fields]
    );
};

export default useApplicationSetup;
