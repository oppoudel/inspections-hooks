const today = new Date();
const newDate = new Date(today.setDate(today.getDate() - 60));
const trimDate = newDate
  .toISOString()
  .substr(0, newDate.toISOString().indexOf("."));
const urlExt =
  "&$where=calldatetime>'" + trimDate + "'&$order=calldatetime desc";
const callsUrl = encodeURI(
  "https://data.baltimorecity.gov/resource/m8g9-abgb.geojson?$limit=50000" +
    urlExt
);
export const geoQueries = {
  liquorLicenses: {
    name: "liquorLicenses",
    title: "Liquor Licenses",
    url:
      "https://data.baltimorecity.gov/resource/g2jf-x8pp.geojson?$limit=50000&licenseyear=2017",
    attributes: {
      "Trade Name": "tradename",
      "License End Date": "licenseenddate",
      "Licensee First Name": "licenseefirstname",
      "Licensee Last Name": "licenseelastname"
    }
  },
  callsForService: {
    name: "callsForService",
    title: "CAD Calls",
    url: callsUrl,
    attributes: {
      Description: "description",
      Location: "incidentlocation",
      Priority: "priority",
      "Call Date Time": "calldatetime",
      "Call Number": "callnumber"
    }
  },
  openNotices: {
    name: "openNotices",
    title: "Housing Open Notices",
    url:
      "https://geodata.baltimorecity.gov/egis/rest/services/BPD/Open_Notices/MapServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
    attributes: {
      Address: "Address",
      "Notice Number": "NoticeNum",
      "Notice Date": "DateNotice",
      "Notice Type": "NoticeType",
      Status: "Status"
    }
  },
  permitPoints: {
    name: "permitPoints",
    title: "Permit Points",
    url:
      "https://geodata.baltimorecity.gov/egis/rest/services/BPD/Permit_Points/MapServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
    attributes: {
      CaseNo: "Case No",
      Description: "Description",
      "Issued Date": "Issued_Date",
      Applicant: "Applicant",
      Lessee: "Lessee"
    }
  }
};
