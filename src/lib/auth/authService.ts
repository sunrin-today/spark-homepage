import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

const TOKEN_KEY = "firebase_auth_token";
const COOKIE_KEY = "firebase_auth_token";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function saveTokenToCookie(token: string): void {
  try {
    document.cookie = `${COOKIE_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } catch (e) {
    console.error("cookie 저장 실패:", e);
  }
}

function removeTokenFromCookie(): void {
  try {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  } catch (e) {
    console.error("cookie 제거 실패:", e);
  }
}

export async function signInWithGoogle(): Promise<{ user: User; token: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    saveTokenToLocalStorage(idToken);
    saveTokenToCookie(idToken);
    return { user, token: idToken };
  } catch (error: any) {
    console.error("Google 로그인 실패:", error);
    throw new Error(error.message || "로그인에 실패했습니다.");
  }
}

export async function signOut(): Promise<void> {
  try {
    removeTokenFromLocalStorage();
    removeTokenFromCookie();
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error("로그아웃 실패:", error);
    throw new Error(error.message || "로그아웃에 실패했습니다.");
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        saveTokenToLocalStorage(idToken);
        saveTokenToCookie(idToken);
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
      }
    } else {
      removeTokenFromLocalStorage();
      removeTokenFromCookie();
    }
    callback(user);
  });
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

function saveTokenToLocalStorage(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("localStorage 저장 실패:", e);
  }
}

function removeTokenFromLocalStorage(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error("localStorage 제거 실패:", e);
  }
}

export function getTokenFromLocalStorage(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("localStorage 읽기 실패:", e);
    return null;
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = getTokenFromLocalStorage();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getCurrentUserInfo(): Promise<any> {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error("토큰이 없습니다.");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
      { method: "GET", headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error("사용자 정보를 가져올 수 없습니다.");
    return await response.json();
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw error;
  }
}