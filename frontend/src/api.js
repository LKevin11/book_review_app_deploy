const API = "http://localhost:5000"

export async function api(path, method = "GET", body = null) {
  const opts = { 
    method, 
    headers: { 
      "Content-Type": "application/json" 
    } 
  };
  
  if (body && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
    opts.body = JSON.stringify(body)
  }
  
  const res = await fetch(API + path, opts)
  
  if (!res.ok) {
    let errorMessage = `HTTP error! status: ${res.status}`
    
    try {
      const errorData = await res.json()
      if (errorData && errorData.error) {
        errorMessage = errorData.error
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message
      }
    } catch (e) {
      errorMessage = res.statusText || errorMessage
    }
    
    throw new Error(errorMessage)
  }
  
  if (method === "DELETE" && res.status === 204) {
    return { success: true }
  }
  
  return res.json()
}

export const apiGet = (path) => api(path, "GET")
export const apiPost = (path, body) => api(path, "POST", body)
export const apiPut = (path, body) => api(path, "PUT", body)
export const apiDelete = (path, body = null) => api(path, "DELETE", body)