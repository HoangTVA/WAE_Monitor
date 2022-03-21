export const firebaseConfig = {
  apiKey: 'AIzaSyAFINDqy9QtwEWqYuY9Bpg0pI1wiJBuhfI',
  authDomain: 'wae-monitor.firebaseapp.com',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: 'wae-monitor',
  storageBucket: 'wae-monitor.appspot.com',
  messagingSenderId: '224197759123',
  appId: '1:224197759123:web:c1235001d54cd0fb2dbd66',
  measurementId: 'G-Q8N958WCX6'
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
