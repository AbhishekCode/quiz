
// common functions
export function getHeight () {
    //Returns Browser inner height
    return window.innerHeight;
};

export function getWidth () {
    //Returns Browser innerWidth
    return window.innerWidth;
};

export const routepath = () => {
    switch(process.env.NODE_ENV) {
       case 'test': {
         return '/';
       }
       case 'production': {
         return '/quiz/';
       }
       case 'development': {
         return '/';
       
       }
    }
}