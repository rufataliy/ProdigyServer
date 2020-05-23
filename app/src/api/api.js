export default async (config, submitValues) => {
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

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
