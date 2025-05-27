// Serviço de autenticação fictício
export async function login(email: string, password: string) {
  // Simulação: troque para chamada real ao backend
  if (email === "admin@teste.com" && password === "123456") {
    localStorage.setItem("auth", "true");
    return true;
  }
  throw new Error("Credenciais inválidas");
}

export function isAuthenticated() {
  return !!localStorage.getItem("auth");
}

export function logout() {
  localStorage.removeItem("auth");
}