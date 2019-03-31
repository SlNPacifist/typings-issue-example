// This style of declaration does not work in typeRoots folder
export = ask;

declare function ask(): number;


// This style of declaration works without symlinking
// declare module 'asker' {
//     export = ask;
//
//     function ask(): void;
// }
