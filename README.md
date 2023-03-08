
# AniCalendar

**NOTE:** This is only for users that are using AniList to track their anime and manga progress! 

Look at your anime and manga history through a calendar. Many users from AniList were asking for a calendar to view their anime watch history instead of the small activity history on their profile. So I decided to create a website that shows their calendar for both anime and manga.

Made with Nextjs.

## Deploy on Vercel with one click!
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKangieDanie%2FAniCalendar&env=GRAPHQL_ENDPOINT,CLIENT_ID,CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=Open%20the%20link%20to%20view%20what%20the%20environment%20variables%20are.&envLink=https%3A%2F%2Fgithub.com%2FKangieDanie%2FAniCalendar%23environment-variables&project-name=ani-calendar&repository-name=ani-calendar&demo-title=AniCalendar&demo-description=View%20your%20personal%20AniList%20calendar!&demo-url=https%3A%2F%2Fani-calendar.vercel.app%2F&demo-image=https%3A%2F%2Fani-calendar.vercel.app%2FAniCalendarLogo.png)

## Features

- View your watched anime history
- View your manga history
- Generate an image of your calendar
- Names of anime/manga and their Episode/Chapter are displayed on the calendar
- Look on the calendar to know on which day you completed an anime/manga


## Installation

Install this project with npm

```bash
  npm install
  npm run dev
```
    
## Roadmap

- [x] Responsive calendar
- [ ] Filters (only completed, only watched, ...) --_ Currently working on it
- [ ] Check the calendar of other users (maybe)
- [ ] Refactoring


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
CLIENT_ID=[CLIENT_ID_ANILIST]
CLIENT_SECRET=[CLIENT_SECRET_ANILIST]
GRAPHQL_ENDPOINT=https://graphql.anilist.co
NEXTAUTH_SECRET=[RANDOM_STRING]
```
### NEXTAUTH_SECRET
Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. [Read More](https://next-auth.js.org/configuration/options#nextauth_secret)

You can use the command below to generate a random string.

`$ openssl rand -base64 32`

## Contributing

Contributions are always welcome!


## License

[MIT](https://choosealicense.com/licenses/mit/)

