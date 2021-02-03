function tokenConfig(method, token, body) {
    const config = {
        method,
        headers: {
            "Content-type": "application/json",
        },
    }
    if (token) config.headers['x-auth-token'] = localStorage.getItem('accessToken');
    if (body) config.body = body;
    return config;
}

export function resetPassword(data) {
    const body = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/dev/verifyPasswordReset', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function sendResetPasswordLink(data) {
    const body = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/sendPasswordReset`, tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function getPostById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/posts/${id}`, tokenConfig('GET', false));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    })
}

export function updatePost(id, data) {
    const body = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/posts/${id}`, tokenConfig('PUT', true, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function getPostsByUser(userId) {
    console.log(userId);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/users/${userId}/posts`, tokenConfig('GET', true));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                console.log(data);
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function createPost(data) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(data);
        try {
            const response = await fetch('/dev/posts', tokenConfig('POST', true, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function verifyToken() {
    return new Promise(async (resolve, reject) => {       
        try {
            const response = await fetch('/dev/auth', tokenConfig('GET', true));
            const data = await response.json();
            // check for errors
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);                
            } 
        } catch (error) {
            return reject({ error });
        }
    });
}

export function signInRequest({ email, password }) {
    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify({ email, password });
        // Headers
        try {
            const response = await fetch('/dev/auth', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}

export function registerRequest(values) {
    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify(values);
        // Headers
        try {
            const response = await fetch('/dev/users', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}

export function getAllPosts() {
    return new Promise(async (resolve, reject) => {
        // Headers
        try {
            const response = await fetch('/dev/posts', tokenConfig('GET', false));
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}

export function getPostsByLocation(location) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/location/${location}/posts`, tokenConfig('GET', false));
            const data = await response.json();
            return resolve(data);
        } catch (error) {
            return reject({ error });
        }
    });
}

export function searchPosts(key, value) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/search/posts?${key}=${value}`, tokenConfig('GET', false));
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function updateAnalytics(id, analytics) {
    const body = JSON.stringify(analytics);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/posts/analytics/${id}`, tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function resendLink(email) {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch(`/dev/resend/${email}`);
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}


// POST http://localhost:3000/dev/sendPasswordReset
