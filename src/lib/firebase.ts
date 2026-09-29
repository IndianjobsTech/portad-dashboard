"use client";

import type { FirebaseOptions } from "firebase/app";
import type { Auth } from "firebase/auth";

type AuthModule = typeof import("firebase/auth");

export type FirebaseApi = { auth: Auth } & Pick<
  AuthModule,
  | "onIdTokenChanged"
  | "signInWithEmailAndPassword"
  | "createUserWithEmailAndPassword"
  | "signInWithPopup"
  | "signOut"
  | "GithubAuthProvider"
  | "GoogleAuthProvider"
>;

const env = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseEnabled = Boolean(
  env.apiKey && env.authDomain && env.projectId && env.appId,
);

function buildConfig(): FirebaseOptions {
  const config: FirebaseOptions = {};
  if (env.apiKey) config.apiKey = env.apiKey;
  if (env.authDomain) config.authDomain = env.authDomain;
  if (env.projectId) config.projectId = env.projectId;
  if (env.appId) config.appId = env.appId;
  if (env.storageBucket) config.storageBucket = env.storageBucket;
  if (env.messagingSenderId) config.messagingSenderId = env.messagingSenderId;
  return config;
}

let apiPromise: Promise<FirebaseApi> | null = null;

export function getFirebaseApi(): Promise<FirebaseApi> | null {
  if (!firebaseEnabled) return null;
  if (!apiPromise) {
    apiPromise = (async (): Promise<FirebaseApi> => {
      const [appMod, authMod] = await Promise.all([
        import("firebase/app"),
        import("firebase/auth"),
      ]);
      const app = appMod.getApps()[0] ?? appMod.initializeApp(buildConfig());
      const auth = authMod.getAuth(app);
      return {
        auth,
        onIdTokenChanged: authMod.onIdTokenChanged,
        signInWithEmailAndPassword: authMod.signInWithEmailAndPassword,
        createUserWithEmailAndPassword: authMod.createUserWithEmailAndPassword,
        signInWithPopup: authMod.signInWithPopup,
        signOut: authMod.signOut,
        GithubAuthProvider: authMod.GithubAuthProvider,
        GoogleAuthProvider: authMod.GoogleAuthProvider,
      };
    })();
  }
  return apiPromise;
}
