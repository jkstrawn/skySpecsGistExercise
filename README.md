# Sky Specs Gist Viewer

Application for viewing Gists!


## Installation

For running the client :

```bash
cd client
npm install
npm run start
```

For running the server:

Make sure dotnet core is installed
https://dotnet.microsoft.com/en-us/download/dotnet/3.1

```bash
cd server
dotnet build
dotnet run
```

## Notes
My eyes skipped over the section about the time requirement, so I ended up taking my time with it and spent about 5.5 hours total. The first 2.5 hours were spent scaffolding the project and testing a few different ways laying out the client and server. After trying out a handful of modern boilerplates, I ended up re-using the client and server layout for my hobby project, a react front-end with a dotnet core backend. In hindsight I would have avoided trying to use the most up-to-date libraries and layout and simply re-used what I already know works.

The next 1.5 hours was spent creating the client pages, user interactions, and having the server return mock gists from a file (to avoid hitting the api and reaching the rate limit). In hindsight I would have been more minimal with the styling I added, and avoided including the loaders or the material UI library at all.

The last 1.5 fours was spent wiring up favoriting on the server, and most of that time was spent on a bug while getting POST requests working for the webapi controller. I couldn't get the post body to come through on the server and I ran through half a dozen examples of how to format the Controller, before figuring out the problem was just with the request class: I didn't include the default getter/setter.
```
public string Id;
```
instead of
```
public string Id { get; set; }
```
<br />

Even ignoring the time spent experimenting with boilerplates, styling, and the POST bug, I'm not confident I would have finished in 2 hours, because of how carefully I work and my perfectionism. I tend to overthink things and I find it difficult to create something basic without thinking about the long-term effects from every choice. Overall I enjoyed experimenting with the project though.