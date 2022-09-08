class testClass {
  static num = "1212";
  public name: string;
  public constructor(nameStr: string) {
    this.name = `${nameStr}`;
    this.consoleName();
  }

  private consoleName() {
    console.log("++name+", this.name);
  }
  public zzName(val: string) {
    this.consoleName();
    console.log("++zzName+", val);
  }
}
export default testClass;
