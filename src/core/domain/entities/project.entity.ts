export class Project {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public ownerId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
