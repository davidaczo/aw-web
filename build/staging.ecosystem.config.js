module.exports = {
 apps: [
  {
   name: 'test-frontend-staging',
   script: 'npm',
   args: 'run start',
   env: {
    PORT: process.env.PORT || 3000,
    SECURE_COOKIES: process.env.SECURE_COOKIES || "true",
   },
  },
 ],
};
