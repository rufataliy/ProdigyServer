export default async(config, submitValues) => {
    const editPath = {
        post: "",
        get: "",
        put: "/edit",
        delete: "/delete"
    };
    const docId = config.docId ? `/${config.docId}` : "";
    const url = `https://localhost:3000/api/${config.collectionName +
    editPath[config.method] +
    docId}`;
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
            return response.json();
        })
        .catch(err => console.log(err));
};