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

  forChart(): { value: number; name: string }[] {
    return [
      { value: this.nothing, name: "Control" },
      { value: this.recommend, name: "Nudged" },
      { value: this.hide, name: "Forced" }
    ];
  }
}

export class UsersEngagement {
  data = {
    nothing: {
      healthy: 0,
      regular: 0
    },
    recommend: {
      healthy: 0,
      regular: 0
    },
    hide: {
      healthy: 0,
      regular: 0
    }
  };

  process(userType: number, clicks: { healthy: boolean }[]) {
    const healthyClicks = clicks.filter(c => c.healthy).length;
    const regularClicks = clicks.filter(c => !c.healthy).length;

    switch (userType) {
      case 0:
        this.data.hide.healthy += healthyClicks;
        this.data.hide.regular += regularClicks;
        break;

      case 1:
        this.data.recommend.healthy += healthyClicks;
        this.data.recommend.regular += regularClicks;
        break;

      case 2:
        this.data.nothing.healthy += healthyClicks;
        this.data.nothing.regular += regularClicks;
        break;

      default:
        console.error("UsersEngagement: Unknown user type " + userType);
    }
  }

  forChart() {
    return [
      {
        name: "Control",
        series: [
          { name: "Healthy", value: this.data.nothing.healthy },
          { name: "Regular", value: this.data.nothing.regular }
        ]
      },
      {
        name: "Nudged",
        series: [
          { name: "Healthy", value: this.data.recommend.healthy },
          { name: "Regular", value: this.data.recommend.regular }
        ]
      },
      {
        name: "Forced",
        series: [
          { name: "Healthy", value: this.data.hide.healthy },
          { name: "Regular", value: this.data.hide.regular }
        ]
      }
    ];
  }
}
