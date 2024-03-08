
export class User {
    constructor(public name: string, public bio: string) {}

    static Yusuf() {
        let name = "yusuf";
        let bio = "Building brands has been a part of my DNA since the age of 16 when I started my own snowboard apparel company. Now with a closet full of sample t-shirts, I’ve grown into a designer who prioritizes empathy and entrepreneurship in every creative opportunity I face.";
        return new User(name, bio);
    }
}
