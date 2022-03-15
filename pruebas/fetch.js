const fetch = require("node-fetch");
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Basic YXBpLmZ1bGxyYXBpZEBmdWxscmFwaWQuY29tLmFyOjNlODlmY2ZjMDdlM2Q2ZjRiM2FiOTYzYWNhZmQ3MGI5OTVhMTgwYTY2ZWU3MzZiNDJmYjMwM2EyYmM2MjI2NGU=");

var raw = JSON.stringify({
  action: "validate",
  token:
    "03AGdBq24-AvSD4Dy-C1Y3cFOS-mTAOFinFTXrxNsCZaYG5sVGeiKW-3OqFWJbvQqZQX1iG0FoYmbSzRA9enMmx00hzt33iRzhY8xRfbeV2vtFuCVLRyeqx6-nuH0Lx5TY7QISodgN1l0YIgrxchwysGDyooD0bDtVvSiiY0_gH7DDF27ZtHyrDlvNJqlG6soH0v9otyCkDPq1hfaFND38hxyOZ6rqZflU23mkuOMZ8r-HnBF9uRaL9Kjbnt1F6kZHBjSD2H2dgFSxwn7evK12OYB5sDCKbsCz3gAExWnCu5pnZq3bfVpch1khKN1LJtjrU06JeoW9g2p0NJxOxMQYhRYRY1Ujz2z_YxmEZrpi_MJkTSEOR4NKKxcmXia-l76c9tBzuHJkjhziSI8ykakrSR1RaeJsj6lB8b77IWxYEpGHJz95LQQ9kJ5rBHNyI7vcBfgmRJ_jic2n",
  first_name: "franco",
  last_name: "escamilla",
  phone: "2634934887",
  email: "franco@gmail.com",
  medium: "slider",
  campaign: "vn-peugeo3pasos",
  company: "Denver",
  area: "vn",
  source: "Landing Page",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:8765/api/leads/web", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
