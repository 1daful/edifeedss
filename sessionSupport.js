app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({ 
    secret: 'keyboard cat', 
    resave: false, saveUninitialized: false, 
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' }) }));
