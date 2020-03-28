// var request = require("request");

// // var options = {
// //     method: 'POST',
// //     url: 'https://prodigy-gate.auth0.com/oauth/token',
// //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
// //     form: {
// //         grant_type: 'client_credentials',
// //         client_id: "uz6EME6apBI5HNS5K0szg8LY3pgDtqdB",
// //         client_secret: "uR8U8x0-zSHMkaGrAkFwSOgHw4whyLA6jpttpeuz8InrK3wAvVKwyDX42Ljcs-lj",
// //         audience: 'https://prodigy-gate.auth0.com/api/v2/'
// //     }
// // };

// // request(options, function(error, response, body) {
// //     if (error) throw new Error(error);
// //     console.log(body);
// //     process.env.ACCESS_TOKEN = body.access_token
// //     console.log(body.access_token === process.env.ACCESS_TOKEN);

// // });
// console.log(process.env.ACCESS_TOKEN);

// const options = {
//     method: "GET",
//     url: "https://prodigy-gate.auth0.com/api/v2/users",
//     qs: {
//         q: 'user_id:("auth0|5d6b1c23aac2cb0f5036a402" OR "auth0|5d6b26917dbf4e0f14608d81" OR "auth0|5e1c43090cfe730cc1b4f526")',
//         search_engine: 'v3'
//     },
//     headers: {
//         authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qaEJNRU13TkVVeE16TXdOME16UmpORE16WTRORGMwTmpkR056TTRNamsyTVRkR01qRXhNdyJ9.eyJpc3MiOiJodHRwczovL3Byb2RpZ3ktZ2F0ZS5hdXRoMC5jb20vIiwic3ViIjoiYjZTdkc3ZDdyV25pQkoyV0ZlT1U2UGxqaDJuMDVMV0lAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcHJvZGlneS1nYXRlLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTg1MzQ2MzYzLCJleHAiOjE1ODU0MzI3NjMsImF6cCI6ImI2U3ZHN2Q3clduaUJKMldGZU9VNlBsamgybjA1TFdJIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.KLlDr_f3d7acCjSlG6rfKKipOb0xANuWacCvG_Ax-ikj35taDFgSvju959zsPgbk-Jm-FCxxaJa_py2SytYIBp5XduOQh_VZ_gqi5OzG6AHZzusjzOwXVTC6K7KF7XjvHRSAqCgCeLvMAchLAS9gj65oOxQi1I_wIeQjGJ7VVMEItDBEmtY8Vc5tGHowlda3LzCb1vJMv_BFKyTTQU2fYW0Wju1iEOm-DxMB6FVbeSvwQt_EXa5YCrIHqO6rjpcopklwqljE2PaxPgL_wXy1orjlQHoRAOQhx0pTuav6Ns-ggpV4zbj8IhbT892oPRSWoGCZlen9497fUPn0Bqs65A`
//     }
// };
// request(options, function(error, response, users) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(JSON.parse(users));


// });