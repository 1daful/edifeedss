import { FirebaseAuth } from "./FirebaseAuth";
export const authGuard = async (to, from, next) => {
    //const auth = new Auth();
    const authService = new FirebaseAuth();
    const fn = () => {
        if (authService.isAuthenticated()) {
            next();
        }
        else
            (next('/login'));
    };
};
