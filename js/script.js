function getJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else reject(xhr.statusText);
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}