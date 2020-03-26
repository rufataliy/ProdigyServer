export default async(config, submitValues) => {
    console.log(config);
    console.log(submitValues);

    const editPath = {
        post: "",
        get: "",
        put: "/edit",
        delete: "/delete"
    };
    const docId = config.docId ? `/${config.docId}` : "";
    let url = `https://localhost:3000/api/${config.collectionName +
    editPath[config.method] +
    docId}`;
    if (config.collectionName === "profile") {
        url = `https://localhost:3000/${config.collectionName}`;
    }
    const options = {
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        method: config.method
    };
    console.log(url, options);

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