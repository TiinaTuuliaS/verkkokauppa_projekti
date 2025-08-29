

# Dreamland - Verkkokauppa

Dreamland on yksinkertainen verkkokauppasovellus, joka on suunnattu noin 25–40-vuotiaille kuluttajille jotka ovat kinnostuneita trendikkäistä koruista.  Sovelluksessa käyttäjä voi luoda tilin, kirjautua sisään, 
selata tuotteita kategorioittain ja lisätä niitä ostoskoriin ja viedä ostotapahtuman loppuun.  
Ylläpitäjä voi hallinnoida tuotteita, kuten lisätä ja poistaa niitä ja asettaa tuotteita Featured-tuotteiksi esittelyyn, 
Admin Dashboardilta ylläpitäjä näkee myös viimeiakaisen myyntidatan. 

---

## Toiminnot

- **Käyttäjä**
  - Rekisteröityminen
  - Sisään- ja uloskirjautuminen
  - Tuotteiden selailu kategorioittaim
  - Ostotapahtuman loppuunvieminen

- **Tuotteet**
  - Tuotelistaus kategorioittain
  - Featured-tuotteiden esittäminen etusivulla
  - Ostoskoriin lisääminen
- **Ostoskori**
  - Tuotteiden tarkastelu
  - Tuotteiden poistaminen
  - Siirtyminen kassalle

- **Maksaminen**
  - Stripe-integraatio maksamiseen

- **Admin**
  - Tuotteiden lisääminen ja poistaminen
  - Featured-tuoteet
  - Myyntianalytiikka

---

## Teknologiat

Backend

| Teknologia        | Käyttötarkoitus |
|-------------------|-----------------|
| **Express**       | HTTP-palvelimen ja REST API -reittien toteutus |
| **Mongoose**      | MongoDB-tietokannan käyttö ja skeemat |
| **JWT (jsonwebtoken)** | Käyttäjien autentikointi ja token-pohjainen kirjautuminen |
| **bcryptjs**      | Salasanojen salaus ja vertailu |
| **Cookie-parser** | Evästeiden käsittely Expressissä |
| **dotenv**        | Ympäristömuuttujien hallinta `.env`-tiedostosta |
| **Cloudinary**    | Kuvien tallennus ja hallinta pilvipalvelussa |
| **Stripe**        | Maksujen käsittely |
| **ioredis**       | Redis-tietokannan käyttö (välimuisti, sessiot, jonot) |
| **Axios**         | HTTP-kutsut muihin palveluihin tarvittaessa |
| **Nodemon** (dev) | Kehitystyökalu, joka käynnistää serverin automaattisesti uudelleen koodin muuttuessa |


Frontti

| Teknologia             | Käyttötarkoitus |
|------------------------|-----------------|
| **React**              | Käyttöliittymän rakentaminen |
| **React DOM**          | React-komponenttien renderöinti selaimeen |
| **React Router DOM**   | Sivunavigointi (reititys) |
| **Zustand**            | Sovelluksen tilanhallinta |
| **Framer Motion**      | Animaatioiden toteutus |
| **React Confetti**     | Konfetti-efektit (esim. onnistumisilmoituksissa) |
| **Lucide React**       | Ikonikirjasto |
| **Axios**              | API- ja HTTP-kutsujen tekeminen |
| **@stripe/stripe-js**  | Stripe-maksujen integrointi |
| **Recharts**           | Kaavioiden ja graafien visualisointi |
| **Tailwind CSS**       | Tyylittely (CSS-kehys) |
| **PostCSS + Autoprefixer** | CSS:n käsittely ja selainyhteensopivuus |
| **Vite**               | Kehitys- ja build-työkalu |
| **@vitejs/plugin-react** | React-tuki Viteen |
| **ESLint**             | Koodin laadun ja virheiden tarkistus |
| **eslint-plugin-react-hooks** | React hooks -käytön tarkistus |
| **eslint-plugin-react-refresh** | HMR (Hot Module Reload) -tuki Reactille |
| **@eslint/js, globals** | ESLintin lisäkonfiguraatiot |
| **@types/react, @types/react-dom** | TypeScript-tyypitykset Reactille (autocompletion/editorituki) |

## Yhteenveto 

- **Frontend:** React + Vite + Tailwind → Käyttöliittymä, reititys, animaatiot, kaaviot ja maksujen UI-integrointi  
- **Backend:** Node.js + Express + MongoDB → API, tietokanta, autentikointi, maksujen käsittely ja pilvipalvelu-integraatiot  
- **Maksut:** Stripe (frontend + backend)  
- **Kuvat:** Cloudinary  
- **Välimuisti / sessiot:** Redis 


---

## .env Ympäristömuuttujat

PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

## Backendin käynnnistys

npm run dev

## Fronendin käynnistys

cd frontend
npm run dev



