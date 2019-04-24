export class UsersCount {
  nothing = 0;
  recommend = 0;
  hide = 0;

  count(userType: number) {
    switch (userType) {
      case 0:
        this.hide++;
        break;

      case 1:
        this.recommend++;
        break;

      case 2:
        this.nothing++;
        break;

      default:
        console.error("UsersCount: Unknown user type " + userType);
    }
  }

  forChart(): {value: number, name: string }[] {
    return [
      { value: this.nothing, name: "Control" },
      { value: this.recommend, name: "Nudged" },
      { value: this.hide, name: "Forced" }
    ]
  }
}
