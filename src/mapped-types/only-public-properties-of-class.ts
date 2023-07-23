// https://stackoverflow.com/a/60390007

type PublicInterface<T> = Pick<T, keyof T>

class DefaultBuilding {
  constructor(
    private constructionYear: number,
    public name: string,
  ) {}

  public color() {
    return 'blue'
  }

  private security() {}
}

type Building = PublicInterface<DefaultBuilding>
