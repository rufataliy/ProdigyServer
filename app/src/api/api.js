export default async (config, submitValues) => {
  const path = {
    post: "",
    get: "",
    put: "/edit",
    delete: "/delete",
  };
  // const baseUrl = window.location.origin;
  // const params = config.params ? `/${config.params}` : "";
  //     let url = `${baseUrl}/api/${
  //     config.collectionName + path[config.method] + params
  //   }`;

  const options = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    method: config.method,
  };

  if (submitValues) {
    options.body = JSON.stringify(submitValues);
  }
  const { endpoint } = config;
  let url = endpoint.replace("app", "api");
  console.log(url);

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
