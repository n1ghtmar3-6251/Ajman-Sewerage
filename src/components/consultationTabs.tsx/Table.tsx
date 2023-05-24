import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridEventListener,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup/Popup";
import Approved from '../../components/Approved/Approved'
import { ButtonSecondary } from "./consultation.styled";
import RequestEngine from "../../core/RequestEngine";
import { Memory } from "../../core/Memory";
import { stat } from "fs";
import { Navigate, useNavigate } from "react-router-dom";

// @ts-ignore
const ConsultantTable = ({ StatusId, NocType }) => {
  const [loading, setLoading] = useState(false);
  const [Application, setApplication] = useState<any>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [status, setStatus] = useState(Number(StatusId));
  const [searchCriteria, setSearchCriteria] = useState("");
  const [sorting, setSorting] = useState("desc");

  const [open, setOpen] = useState<boolean>(false);
  const [Backloading, setBackLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<[]>([]);
  const [statusList, setStatusList] = useState<[]>([]);

  const navigate = useNavigate()

  useEffect(() => {}, [status, searchCriteria, sorting]);

  const handleClose = () => {
    setOpen(false);
    setBackLoading(false);
  };

  const onRowClick: GridEventListener<"rowClick"> = (
    params,
    event,
    details
  ) => {
    openApplication(params.row);
  };

  const onSearchRequestIdChanged = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setSearchCriteria(newValue);
    getApplications("requestId", newValue);
  };

  const openApplication = async (row: any) => {
    setBackLoading(true);

    let engine = new RequestEngine();

    let response = await engine.getItem(
      "api/noc/nocdetails/" + row.requestId + "?lang=en-US"
    );
    if (response && response.status === 200) {
      console.log(JSON.stringify(response.data.result.data));

      setApplication(response.data.result.data);
      setBackLoading(false);
      setOpen(true);
      // if(response.data.result.data.status=="Approved") 
      // navigate('/dummyRoute', {state: {
      //   nocType:Number(NocType),
      //   application:response.data.result.data,
      // // onClose:handleClose,
      // }})

    }



  };

  const getStatusList = async () => {
    let engine = new RequestEngine();

    let statusResponse = await engine.getItem("api/noc/statuslist");
    if (statusResponse && statusResponse.status === 200) {
      if (statusResponse.data.result) {
        statusResponse.data.result.forEach(function (x: any) {
          x.value = x.value.replace(/([A-Z])/g, " $1").trim();
        });

        setStatusList(statusResponse.data.result);
      }
      // setStatus(StatusId);
      await getApplications("status", StatusId);
    }
  };

  const getApplications = async (field: string, value: string) => {
    let engine = new RequestEngine();

    let userId = Memory.getItem("userId");
    //TODOSD: Pagination, make offset dynamic

    let url =
      "api/noc/noclist?UserId=" +
      userId +
      "&Page=1&PageSize=" +
      pageSize +
      "&SortField=date&NocType=" +
      NocType;

    if (field === "requestId" && value !== "") url += "&RequestId=" + value;
    // else if (searchCriteria && searchCriteria !== "")
    //   url += "&RequestId=" + searchCriteria;

    if (field === "status" && Number(value) > 0) {
      url += "&StatusId=" + value;
    } else if (Number(status) > 0) url += "&StatusId=" + status;

    if (field === "sorting") url += "&SortOrder=" + value;
    else url += "&SortOrder=" + sorting;

    let response = await engine.getItem(url);

    if (response && response.status === 200) {
      if (response.data.result.data) {
        response.data.result.data.forEach(function (x: any) {
          x.status = x.status.replace(/([A-Z])/g, " $1").trim();
        });

        setRows(response.data.result.data ?? []);
      }
    }

    console.log("rows==>", columns)
  };

  const prepareData = async () => {
    await getStatusList();
  };

  const [language, setLanguage] = useState<any>();

  const [colorNumber, setColorNumber] = useState<number>(14);

  useEffect(() => {
    const reciveLanguage: any = localStorage.getItem("LanguageChange");
    const reciveLanguage1: any = JSON.parse(reciveLanguage);
    setLanguage(reciveLanguage1);

    const colorNumb = localStorage.getItem("colorNum");
    if (colorNumb) {
      setColorNumber(Number(colorNumb));
    }
  });

  const columns: GridColDef[] = [
    {
      field: "requestId",
      headerName: language?.result?.cm_rq_id
        ? language?.result?.cm_rq_id.label
        : "Request ID",
      flex: 1,
      editable: false,
    },
    {
      field: "parcelId",
      headerName: language?.result?.cm_ascreate_label_parcelid
        ? language?.result?.cm_ascreate_label_parcelid.label
        : "Parcel ID",
      flex: 1,
      editable: false,
    },
    {
      field: "requestDate",
      headerName: language?.result?.cm_date_created
        ? language?.result?.cm_date_created.label
        : "Date Created",
      flex: 1,
      editable: false,
    },
    {
      field: "propertyType",
      headerName: language?.result?.cm_mob_proptype
        ? language?.result?.cm_mob_proptype.label
        : "Property Type",
      flex: 1,
      editable: false,
    },

    {
      field: "excavationNocNeeded",
      headerName: language?.result?.cm_exc_needed
        ? language?.result?.cm_exc_needed.label
        : "Excavation NOC Needed",
      flex: 2,
      editable: false,
    },
    {
      field: "status",
      headerName: language?.result?.cm_noc_status
        ? language?.result?.cm_noc_status.label
        : "Status",
      flex: 1,
      editable: false,
    },

    {
      field: "View",
      headerName: "View Order",
      description: "on Clicking this field you will see the Order Details",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <ButtonSecondary
            onClick={() => {openApplication(params.row)
            
            }}
            className={`${
              colorNumber === 1
                ? "bluee"
                : colorNumber === 2
                ? "blackk"
                : colorNumber === 3
                ? "greenn"
                : "bluee"
            }`}
          >
            View Order
          </ButtonSecondary>
        );
      },
    },
  ];

  useEffect(() => {
    prepareData();
  }, []);

  console.log("rows==>", rows);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [fontSize, setFontSize] = useState<number>(14);

  useEffect(() => {
    const storedFontSize = localStorage.getItem("fontSizeLocal");
    if (storedFontSize) {
      setFontSize(Number(storedFontSize));
    }
  });

  return (
    <div style={{ background: "#eee", marginBottom: "2rem" }}>
      <div style={{ width: "100vw", margin: "auto", background: "#E7E9F8" }}>
        <div
          style={{ marginLeft: 100, paddingTop: "30px", paddingBottom: "30px" }}
        >
          <p
            style={{
              fontSize: `${
                fontSize === 1
                  ? "2.3rem"
                  : fontSize === 2
                  ? "2.4rem"
                  : fontSize === 3
                  ? "2.5rem"
                  : fontSize === 4
                  ? "2.6rem"
                  : fontSize === 5
                  ? "2.7rem"
                  : "2.5rem"
              }`,
              color: "#101E8E",
              margin: 0,
            }}
          >
            {language?.result?.cm_nocapps_carousal
              ? language?.result?.cm_nocapps_carousal.label
              : "NOC Applications"}
          </p>
          <span
            style={{
              color: "#101E8E",
              fontSize: `${
                fontSize === 1
                  ? "16px"
                  : fontSize === 2
                  ? "18px"
                  : fontSize === 3
                  ? "20px"
                  : fontSize === 4
                  ? "22px"
                  : fontSize === 5
                  ? "24px"
                  : "20px"
              }`,
            }}
          >
            {language?.result?.cm_all_nocs_and_requests
              ? language?.result?.cm_all_nocs_and_requests.label
              : "Here are all your NOCs and Requests"}
          </span>
        </div>
      </div>

      <Box
        sx={{
          minHeight: "80vh",
          width: "90%",
          ...(isLargeScreen && { height: "80vh" }),
          background: "#fff",
          margin: "auto",
        }}
        className='pb-4'
      >
        <div
          className="filter-responsive px-2 pb-2"
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: "30px",
            paddingTop: "30px",
          }}
        >
          <div>
            <select
              name="status"
              onChange={async (e) => {
                setStatus(Number(e.target.value));
                await getApplications("status", e.target.value);
              }}
              className="filter-responsive-select filter-responsive-select1"
              style={{ width: "200px", background: "#e5eff2" }}
            >
              {/* <option key={0} value="0">All Status</option> */}
              {statusList &&
                statusList.map((item: any) => {
                  return (
                    <option
                      style={{
                        fontSize: `${
                          fontSize === 1
                            ? "10px"
                            : fontSize === 2
                            ? "12px"
                            : fontSize === 3
                            ? "14px"
                            : fontSize === 4
                            ? "16px"
                            : fontSize === 5
                            ? "18px"
                            : "14px"
                        }`,
                      }}
                      key={item.id}
                      value={item.id==12?11:item.id}
                      selected={item.id === status ? true : false}
                    >
                      {item.value}
                    </option>
                  );
                })}
            </select>

            <input
              type="text"
              placeholder={
                language?.result?.cm_search_by_request_id
                  ? language?.result?.cm_search_by_request_id.label
                  : "Search by Request ID"
              }
              onChange={onSearchRequestIdChanged}
              className="filter-responsive-select"
              style={{
                width: "280px",
                background: "#e5eff2",
                marginLeft: 20,
                fontSize: `${
                  fontSize === 1
                    ? "10px"
                    : fontSize === 2
                    ? "12px"
                    : fontSize === 3
                    ? "14px"
                    : fontSize === 4
                    ? "16px"
                    : fontSize === 5
                    ? "18px"
                    : "14px"
                }`,
              }}
            />
          </div>

          <select
            name="sorting"
            defaultValue={sorting}
            onChange={async (e) => {
              setSorting(e.target.value);
              await getApplications("sorting", e.target.value);
            }}
            className="filter-responsive-select"
            style={{ width: "231px", background: "#e5eff2" }}
          >
            <option
              key="1"
              value="desc"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "10px"
                    : fontSize === 2
                    ? "12px"
                    : fontSize === 3
                    ? "14px"
                    : fontSize === 4
                    ? "16px"
                    : fontSize === 5
                    ? "18px"
                    : "14px"
                }`,
              }}
            >
              {language?.result?.cm_sort_by_date_descending
                ? language?.result?.cm_sort_by_date_descending.label
                : "Sort by Date Descending"}
            </option>
            <option
              key="2"
              value="asc"
              style={{
                fontSize: `${
                  fontSize === 1
                    ? "10px"
                    : fontSize === 2
                    ? "12px"
                    : fontSize === 3
                    ? "14px"
                    : fontSize === 4
                    ? "16px"
                    : fontSize === 5
                    ? "18px"
                    : "14px"
                }`,
              }}
            >
              {language?.result?.cm_sort_by_date_ascending
                ? language?.result?.cm_sort_by_date_ascending.label
                : "Sort by Date Ascending"}
            </option>
          </select>
        </div>

        {!isLargeScreen ? (
          <div className="px-2">
            <div className="px-0">
              {rows?.map((item: any, index) => (
                <>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="d-flex flex-column pb-2">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_rq_id
                            ? language?.result?.cm_rq_id.label
                            : "Request ID"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          {item.requestId}
                        </span>
                      </div>

                      <div className="d-flex flex-column ">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_mob_proptype
                            ? language?.result?.cm_mob_proptype.label
                            : "Property Type"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          {item.locationType}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="d-flex flex-column pb-2">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_ascreate_label_parcelid
                            ? language?.result?.cm_ascreate_label_parcelid.label
                            : "Parcel ID"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          {item.parcelId}
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_exc_needed
                            ? language?.result?.cm_exc_needed.label
                            : "Excavation NOC Needed"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          No
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="d-flex flex-column pb-2">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_date_created
                            ? language?.result?.cm_date_created.label
                            : "Date Created"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          {item.requestDate}
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span
                          className="view-all-heading-text1"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "12px"
                                : fontSize === 2
                                ? "10px"
                                : fontSize === 3
                                ? "12px"
                                : fontSize === 4
                                ? "14px"
                                : fontSize === 5
                                ? "16px"
                                : "12px"
                            }`,
                          }}
                        >
                          {language?.result?.cm_noc_status
                            ? language?.result?.cm_noc_status.label
                            : "Status"}
                        </span>
                        <span
                          className="view-all-header-text2"
                          style={{
                            fontSize: `${
                              fontSize === 1
                                ? "6px"
                                : fontSize === 2
                                ? "8px"
                                : fontSize === 3
                                ? "10px"
                                : fontSize === 4
                                ? "12px"
                                : fontSize === 5
                                ? "14px"
                                : "10px"
                            }`,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />
                </>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        <DataGrid
          getRowId={(row) => row.requestId}
          loading={loading}
          checkboxSelection={false}
          columns={columns}
          rows={rows}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick={true}
          pagination={true}
          // components={{ Toolbar: GridToolbar, }}
          onRowDoubleClick={onRowClick}
          sx={{
            color: "#101e8e",
            width: "90%",
            height: "80%",
            margin: "auto",
            "& .MuiDataGrid-cell,.MuiDataGrid-row": {
              whiteSpace: "normal !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E5EFF2",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
        />
      </Box>
      <Backdrop open={open}>
        {Backloading ? (
          <CircularProgress color="inherit" />
        ) : (
         <>

          <Popup
             nocType={Number(NocType)}
             application={Application}
           onClose={handleClose}
          ></Popup>

          {/* <Approved    nocType={Number(NocType)}
             application={Application}
           onClose={handleClose} /> */}

         </>

        )}
      </Backdrop>
    </div>
  );
};

export default ConsultantTable;
