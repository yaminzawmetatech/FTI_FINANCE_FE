import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Table from "components/Table";

const rows = [
  {
    No: 1,
    "Full Name": "John Doe",
    NRC: "123456/78/90(XX)123456",
    "NRC State/Division": "Yangon",
    "NRC District/Township": "Hlaing",
  },
  {
    No: 2,
    "Full Name": "Jane Smith",
    NRC: "987654/32/10(YY)987654",
    "NRC State/Division": "Mandalay",
    "NRC District/Township": "Chanmyathazi",
  },
  {
    No: 3,
    "Full Name": "Bob Johnson",
    NRC: "456789/45/67(ZZ)234567",
    "NRC State/Division": "Sagaing",
    "NRC District/Township": "Sagaing",
  },
  {
    No: 4,
    "Full Name": "Alice Brown",
    NRC: "789012/34/56(AB)345678",
    "NRC State/Division": "Magway",
    "NRC District/Township": "Magway",
  },
  {
    No: 5,
    "Full Name": "David Lee",
    NRC: "345678/90/12(CD)456789",
    "NRC State/Division": "Ayeyarwady",
    "NRC District/Township": "Pathein",
  },
  {
    No: 6,
    "Full Name": "Sarah Wilson",
    NRC: "567890/12/34(EF)567890",
    "NRC State/Division": "Tanintharyi",
    "NRC District/Township": "Dawei",
  },
  {
    No: 7,
    "Full Name": "Michael Jones",
    NRC: "234567/89/01(GH)678901",
    "NRC State/Division": "Bago",
    "NRC District/Township": "Bago",
  },
  {
    No: 8,
    "Full Name": "Emily Taylor",
    NRC: "890123/45/67(IJ)789012",
    "NRC State/Division": "Kachin",
    "NRC District/Township": "Myitkyina",
  },
  {
    No: 9,
    "Full Name": "William Smith",
    NRC: "456789/01/23(KL)890123",
    "NRC State/Division": "Kayah",
    "NRC District/Township": "Loikaw",
  },
  {
    No: 10,
    "Full Name": "Olivia Davis",
    NRC: "234567/89/01(MN)234567",
    "NRC State/Division": "Kayin",
    "NRC District/Township": "Hpa-an",
  },
  {
    No: 11,
    "Full Name": "James Miller",
    NRC: "678901/23/45(OP)345678",
    "NRC State/Division": "Chin",
    "NRC District/Township": "Hakha",
  },
  {
    No: 12,
    "Full Name": "Ava Wilson",
    NRC: "123456/78/90(QR)456789",
    "NRC State/Division": "Mon",
    "NRC District/Township": "Mawlamyine",
  },
  {
    No: 13,
    "Full Name": "Liam Brown",
    NRC: "345678/90/12(ST)567890",
    "NRC State/Division": "Rakhine",
    "NRC District/Township": "Sittwe",
  },
  {
    No: 14,
    "Full Name": "Sophia Lee",
    NRC: "567890/12/34(UV)678901",
    "NRC State/Division": "Shan",
    "NRC District/Township": "Taunggyi",
  },
  {
    No: 15,
    "Full Name": "Ethan Davis",
    NRC: "234567/89/01(WX)890123",
    "NRC State/Division": "Ayeyarwady",
    "NRC District/Township": "Pyapon",
  },
  {
    No: 16,
    "Full Name": "Mia Jones",
    NRC: "890123/45/67(YZ)234567",
    "NRC State/Division": "Bago",
    "NRC District/Township": "Pyay",
  },
  {
    No: 17,
    "Full Name": "Noah Taylor",
    NRC: "456789/01/23(AB)345678",
    "NRC State/Division": "Chin",
    "NRC District/Township": "Falam",
  },
  {
    No: 18,
    "Full Name": "Charlotte Smith",
    NRC: "234567/89/01(CD)456789",
    "NRC State/Division": "Kachin",
    "NRC District/Township": "Putao",
  },
  {
    No: 19,
    "Full Name": "Liam Wilson",
    NRC: "678901/23/45(EF)567890",
    "NRC State/Division": "Kayin",
    "NRC District/Township": "Myawaddy",
  },
  {
    No: 20,
    "Full Name": "Ava Davis",
    NRC: "123456/78/90(GH)678901",
    "NRC State/Division": "Mon",
    "NRC District/Township": "Thaton",
  },
  {
    No: 21,
    "Full Name": "Oliver Miller",
    NRC: "345678/90/12(IJ)123456",
    "NRC State/Division": "Mandalay",
    "NRC District/Township": "Mandalay",
  },
  {
    No: 22,
    "Full Name": "Emma Taylor",
    NRC: "567890/12/34(KL)234567",
    "NRC State/Division": "Yangon",
    "NRC District/Township": "Botahtaung",
  },
  {
    No: 23,
    "Full Name": "Lucas Brown",
    NRC: "234567/89/01(MN)345678",
    "NRC State/Division": "Magway",
    "NRC District/Township": "Magway",
  },
  {
    No: 24,
    "Full Name": "Aria Davis",
    NRC: "890123/45/67(OP)456789",
    "NRC State/Division": "Ayeyarwady",
    "NRC District/Township": "Labutta",
  },
  {
    No: 25,
    "Full Name": "Elijah Lee",
    NRC: "456789/01/23(QR)567890",
    "NRC State/Division": "Tanintharyi",
    "NRC District/Township": "Dawei",
  },
  {
    No: 26,
    "Full Name": "Grace Smith",
    NRC: "234567/89/01(ST)678901",
    "NRC State/Division": "Rakhine",
    "NRC District/Township": "Sittwe",
  },
  {
    No: 27,
    "Full Name": "Logan Wilson",
    NRC: "678901/23/45(UV)123456",
    "NRC State/Division": "Shan",
    "NRC District/Township": "Taunggyi",
  },
  {
    No: 28,
    "Full Name": "Lily Davis",
    NRC: "123456/78/90(WX)234567",
    "NRC State/Division": "Yangon",
    "NRC District/Township": "Hlaing",
  },
  {
    No: 29,
    "Full Name": "Mason Smith",
    NRC: "345678/90/12(YZ)345678",
    "NRC State/Division": "Bago",
    "NRC District/Township": "Bago",
  },
  {
    No: 30,
    "Full Name": "Zoe Johnson",
    NRC: "567890/12/34(AB)567890",
    "NRC State/Division": "Kachin",
    "NRC District/Township": "Myitkyina",
  },
];

const InHouseSurveyGuarantor = ({ open, onClose }) => {
  const columnDefs = [
    {
      field: "No",
      headerName: "No",
      width: 200,
      sortable: true,
      resizable: true,
      pinned: "left",
    },
    {
      field: "Full Name",
      headerName: "Full Name",
      width: 200,
      sortable: true,
      resizable: true,
    },
    {
      field: "NRC",
      headerName: "NRC",
      width: 200,
      sortable: true,
      resizable: true,
    },
    {
      field: "NRC State/Division",
      headerName: "NRC State/Division",
      width: 200,
      sortable: true,
      resizable: true,
    },
    {
      field: "NRC District/Township",
      headerName: "NRC District/Township",
      width: 200,
      sortable: true,
      resizable: true,
    },
  ];
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="lg"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        Guarantor Information List
      </DialogTitle>
      <DialogContent dividers>
        <Table
          rowSelection={"single"}
          columnDefs={columnDefs}
          name="InHouseSurveyGuarantor"
          rowData={rows}
          rowKey="No"
          defaultColDef={{
            flex: 1,
          }}
          agThemeStyle={{
            height: "calc(100vh - 220px)",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(InHouseSurveyGuarantor);
