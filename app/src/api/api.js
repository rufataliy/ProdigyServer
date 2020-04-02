export default async(config, submitValues) => {
    const path = {
        post: "",
        get: "",
        put: "/edit",
        delete: "/delete"
    };
    const baseUrl = window.location.origin;
    const params = config.params ? `/${config.params}` : "";
    let url = `${baseUrl}/api/${config.collectionName +
    path[config.method] +
    params}`;
    if (config.collectionName === "profile") {
        url = `${baseUrl}/${config.collectionName}`;
    }
    const options = {
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        method: config.method
    };

    if (submitValues) {
        options.body = JSON.stringify(submitValues);
    }

    return fetch(url, options)
        .then(response => {
            console.log(response);

            return response.json();
        })
        .catch(err => console.log(err));
};