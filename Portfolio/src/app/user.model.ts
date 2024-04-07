
export class User {
    constructor(public name: string, public bio: string) {}

    static Yusuf() {
        let name = "yusuf";
        let bio = "Hey there! My name is Yusuf, and I am a seasoned software engineer with 3-4 years of experience. I am not just another coder - programming is my passion! I excel at crafting creative solutions and thrive on tackling complex challenges within the tech industry. My drive for growth and dedication to making an impact through technology sets me apart. I am committed to staying ahead of the curve and actively participating in personal projects to expand my skillset outside of work."
        return new User(name, bio);
    }
}
