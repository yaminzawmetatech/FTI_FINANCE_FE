import { useCallback, useEffect, useMemo, useRef } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getInsuranceCompaines } from "features/insuranceCompany/insuranceCompanySlice";
import {
  getInsuranceInspectionByUuid,
  updateInsuranceInspection,
} from "features/insuranceInspection/insuranceInspectionSlice";
import { getInitialPaymentCalculation } from "features/initialPaymentCalculation/initialPaymentCalSlice";
import { createCOR } from "features/COR/CORSlice";
import { getAllVehicles } from "features/vehicleSetup/vehicleSlice";
import { getCMCO } from "features/users/usersSlice";
import { getDealerContactPeople } from "features/dealerContactPerson/dealerContactPersonSlice";
import { getGuarantors } from "features/guarantor/guarantorSlice";
import { getJointApplicants } from "features/jointApplicant/jointApplicantSlice";
import { getApplicationSignatures } from "features/application/applicationSignatureSlice";
import { getVehicleInformation } from "features/vehicleInformation/vehicleInformationSlice";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";

const useCORForm = () => {
  const { uuid, id, route } = useParams();

  const dispatch = useDispatch();

  const sigCanvasCMCO = useRef(null);
  const sigCanvasApplicant = useRef(null);
  const sigCanvasDealer = useRef(null);

  const sigCanvasGuarantor = useRef({});
  const sigCanvasJointApplicant = useRef({});

  const { control, getValues, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { vehicles, isLoading: vehicleLoading } = useSelector(
    (state) => state.vehicles
  );

  const { initialPaymentCalculations, isLoading: initialPaymentCalLoading } =
    useSelector((state) => state.initialPaymentCalculations);

  const { COR, isLoading } = useSelector((state) => state.COR);

  const { CMCO, isLoading: CMCOLoading } = useSelector((state) => state.users);

  const { dealerContactPeople, isLoading: isContatPeopleLoading } = useSelector(
    (state) => state.dealerContactPeople
  );

  const { guarantors, isLoading: isGuarantorLoading } = useSelector(
    (state) => state.guarantors
  );

  const { jointApplicants, isLoading: isJointApplicantsLoading } = useSelector(
    (state) => state.jointApplicants
  );

  const { applicationSignatures } = useSelector(
    (state) => state.applicationSignatures
  );

  const { application } = useSelector((state) => state.applicationDetail);

  useEffect(() => {
    if(initialPaymentCalculations[0]?.application?.dealer_id) {
      dispatch(
      getDealerContactPeople({
        params: {
          dealer_id: initialPaymentCalculations[0]?.application?.dealer_id,
          type: "Authorized Signer",
        },
        // allFlag: true,
      })
    );
    }
  }, [dispatch, initialPaymentCalculations]);

  useEffect(() => {
    if(route === "signature-correction"){
      dispatch(
        getApplicationByUuid({uuid: uuid})
      );
    }else{
      dispatch(
        getInitialPaymentCalculation({
          params: {
            application_id: id,
          },
        })
      );
    }
   
    dispatch(
      getGuarantors({
        params: {
          application_id: id,
        },
      })
    );
    dispatch(
      getJointApplicants({
        params: {
          application_id: id,
        },
      })
    );
    dispatch(getApplicationSignatures({ id }));
  }, [dispatch,route,id,uuid]);

  useEffect(() => {
    dispatch(
      getVehicleInformation({
        params: {
          application_id: initialPaymentCalculations[0]?.application?.id,
        },
      })
    );
    dispatch(
      getAllVehicles({
        params: {
          category_id: initialPaymentCalculations[0]?.application?.category_id,
          sub_category_id:
            initialPaymentCalculations[0]?.application?.sub_category_id,
        },
      })
    );
    dispatch(getCMCO("CMCO"));
  }, [dispatch, initialPaymentCalculations]);

  useEffect(
    () => {
      console.log("application haha",application)
      const appData = initialPaymentCalculations[0]?.application || {};
      const vehicleInfo =
        initialPaymentCalculations[0]?.latest_vehicle_information?.[0] || {};

      reset({
        ...initialPaymentCalculations[0],
        applicant_name: initialPaymentCalculations[0]?.application?.applicant_name ?? application?.applicant_name,
        dealer_signer_id: applicationSignatures[0]?.dealer_signer_id,
        model_id: vehicleInfo?.vehicle?.model_id,
        brand_id: vehicleInfo?.vehicle?.brand_id,
        vehicle_color: vehicleInfo?.vehicle_color,
        engine_power: vehicleInfo?.engine_power,
        year_of_manufacture: vehicleInfo?.year_of_manufacture,
        manufacturer: vehicleInfo?.manufacturer,
        division: vehicleInfo?.division,
        plate_no: vehicleInfo?.plate_no,
        chassis_no: vehicleInfo?.chassis_no,
        engine_no: vehicleInfo?.engine_no,
        cmco_id: appData.cmco_id,
      });
    },
    [reset, initialPaymentCalculations[0], dealerContactPeople[0], application],
    applicationSignatures,
    
  );

  const onSubmit = useCallback(
    async (body) => {
      const cmcoSignatureDataUrl = sigCanvasCMCO?.current?.isEmpty()
        ? null
        : sigCanvasCMCO?.current?.getTrimmedCanvas().toDataURL("image/jpeg", 0.75);
      // const applicantSignatureDataUrl = sigCanvasApplicant.current.isEmpty()
      //   ? null
      //   : sigCanvasApplicant.current.toDataURL();
      const applicantSignatureDataUrl = sigCanvasApplicant.current.isEmpty()
        ? null
        : sigCanvasApplicant?.current.getTrimmedCanvas().toDataURL("image/jpeg", 0.75);
        
      const dealerSignatureDataUrl = sigCanvasDealer?.current?.isEmpty()
        ? null
        : sigCanvasDealer?.current?.getTrimmedCanvas().toDataURL("image/jpeg", 0.75);

      const finalBody = {
        ...body,
        application_id: id,
        cmco_signature: cmcoSignatureDataUrl,
        applicant_signature: applicantSignatureDataUrl,
        dealer_signature: dealerSignatureDataUrl,
      };
      finalBody.guarantor_signatures = [];
      finalBody.joint_applicant_signatures = [];

      guarantors.forEach((guarantor) => {
        const guarantorSignature = sigCanvasGuarantor.current[
          guarantor.id
        ].current.isEmpty()
          ? null
          : sigCanvasGuarantor.current[guarantor.id].current.getTrimmedCanvas().toDataURL("image/jpeg", 0.75);

        if (guarantorSignature) {
          finalBody.guarantor_signatures.push({
            id: guarantor.id,
            signature: guarantorSignature,
          });
        }
      });

      // Handle joint applicant signatures
      jointApplicants.forEach((jointApplicant) => {
        const jointApplicantSignature = sigCanvasJointApplicant.current[
          jointApplicant.id
        ].current.isEmpty()
          ? null
          : sigCanvasJointApplicant.current[
              jointApplicant.id
            ].current.getTrimmedCanvas().toDataURL("image/jpeg", 0.75);
        if (jointApplicantSignature) {
          finalBody.joint_applicant_signatures.push({
            id: jointApplicant.id,
            signature:
              sigCanvasJointApplicant.current[
                jointApplicant.id
              ].current.getTrimmedCanvas().toDataURL("image/jpeg", 0.75)
          });
          // finalBody[`joint_applicant_signature_${jointApplicant.id}`] = jointApplicantSignature;
        }
      });

      await dispatch(
        createCOR({
          body: {
            ...finalBody,
          },
        })
      );
      showSuccessToast(CommonMessage.MFS00008);

      await dispatch(getApplicationSignatures({ id }));
    },
    [dispatch, guarantors, jointApplicants]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      COR,
      isLoading,
      vehicleLoading,
      vehicles,
      CMCO,
      CMCOLoading,
      sigCanvasCMCO,
      sigCanvasApplicant,
      dealerContactPeople,
      isContatPeopleLoading,
      sigCanvasDealer,
      guarantors,
      isGuarantorLoading,
      sigCanvasGuarantor,
      jointApplicants,
      isJointApplicantsLoading,
      sigCanvasJointApplicant,
      applicationSignatures,
      initialPaymentCalculations,
      application
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      COR,
      isLoading,
      vehicleLoading,
      vehicles,
      CMCO,
      CMCOLoading,
      sigCanvasCMCO,
      sigCanvasApplicant,
      dealerContactPeople,
      isContatPeopleLoading,
      sigCanvasDealer,
      guarantors,
      isGuarantorLoading,
      sigCanvasGuarantor,
      jointApplicants,
      isJointApplicantsLoading,
      sigCanvasJointApplicant,
      applicationSignatures,
      initialPaymentCalculations,
      application
    ]
  );
};

export default useCORForm;
