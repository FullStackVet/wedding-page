# Custom Wedding Site
## NextJS, TS, Firebase, Shadcn, Vercel

![modal](https://github.com/user-attachments/assets/9006f3c7-46ed-46b1-960f-7a996c263463)
![hero3](https://github.com/user-attachments/assets/d98e48fc-bcae-4c51-95ac-3038c9739059)
![countdown](https://github.com/user-attachments/assets/fb72f803-b0a0-4920-b263-8878e93bdb17)


### Edits, Collabs and Usage
 + Original code. Can be copied, pulled, used, etc.
 + Always willing to accept edits, suggestions. 

### Firebase
 + Setup a project on FB
 + This project allows anonymous for guestbook signing. Ensure to add the permission
 + Create rules ex: name >=2 && <= 50
 + Allow acess via local, your url, etc

### Google Cloud
 + create rules, allowing same access (necessary for production)

### Design Considerations
 + flowers and names are hard coded. Was based on client's wants. Ensure to adjust as needed and/or allow for random pattern gen for flower pattern
 + sample images are provided in public/ => Allows you to run to test areas
 + globals.css is pretty messy. Was on time contraints and built over some elements instead of re-creating. Consider this while making changes.

### Development
 + Project won't compile, as-is, because it forces a call to the DB and I've removed the variables. Either skip that or implment your firebase credentials
 + ensure to store variables in a .env file and reference by name in the ts/tsx files

### Production Tests
 + Launched on Vercel => No issues, guestbook logs and displays writing.
 + Consider adding a Capctha if needed, to prevent GB spamming
