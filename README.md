
# Compare & View Rust Stats
![image](https://github.com/not-nic/ruststatscompare/assets/67616855/bc467b6f-ad34-4fe8-99ec-c2b3c1d360d2)
## Project Description
This is a small project that leverages the Steam API to compare users Rust statistics. Whether you’re a solo player or part of a group, you can use this app to keep track of your stats and compare them with other players. 
#### [Try it here!](http://rust.notnic.uk/)

I have used Vue.js and Pinia to create this project. The bulk of the code to retrieve, compare and store stats can be seen within [StatStore.ts](https://github.com/not-nic/ruststatscompare/blob/master/src/stores/StatStore.ts). In addition, [StatViewer.vue](https://github.com/not-nic/ruststatscompare/blob/master/src/components/StatViewer.vue) is the main component for rendering statistics to the page.

## How to Use
Use the search bar and insert a URL in one of the following formats:
- Vanity URL: https://steamcommunity.com/id/notnic4/
- Profile URL: https://steamcommunity.com/profiles/76561198129259594
- 64 ID: 76561198129259594

After submitting the profile, data about that profile will be shown, to compare stats against other users add more URLs.

## Install Guide
1. Clone this repository on your machine using the following command:
```bash
git clone https://github.com/not-nic/ruststatscompare.git
cd ruststatscompare
```
2. Navigate to the project and install the required dependencies using:
```bash
npm install
```
3. To access user statistics from steam you will require an API key from [here](https://steamcommunity.com/dev/apikey).\
After creating an API key, create a file called `.env.development.local`, within this file use `VITE_API_KEY=` with your own API key.
```bash
# .env.development.local
VITE_STEAM_API_KEY=YOUR_KEY_HERE
```
4. Start a development server by using:
```bash
npm run dev
```
5. Access the app by visiting [http://localhost:5173/](http://localhost:5173/)

## Deployment
### Building the Application
if you want to build this application for deployment follow these steps:
1. Create a `.env.production` file for your API key:
```bash
# .env.production
VITE_STEAM_API_KEY=YOUR_KEY_HERE
```
2. Run `npm preview` to check everything works.
```bash
npm run preview
```
3. Build the application:
```bash
npm run build
```
4. Copy the files from the created `dist`  or follow [this guide.](https://vitejs.dev/guide/build.html)

### Apache2
if you decide to build and deploy the project using apache2, ensure you have created a `.htaccess file`
```bash
RewriteEngine On
RewriteRule ^api/(.*) http://api.steampowered.com/$1 [P]
```

## Contributing
If you'd like to contribute your own features, follow the steps below:
1.  Fork it.
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request.
