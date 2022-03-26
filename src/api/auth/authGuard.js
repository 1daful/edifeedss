import auth from "./SupabaseAuth";
export const authGuard = async (to, from, next) => {
    //const auth = new Auth();
    //const auth = new SupabaseAuth()
    if (auth.isAuthenticated()) {
        next();
    }
    else
        (next({
            name: "SignIn",
            path: "signin",
            query: {
                myUrl: to.path
            }
        }));
};
